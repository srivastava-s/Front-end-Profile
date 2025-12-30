document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!(target instanceof HTMLAnchorElement)) return;

      const id = target.getAttribute("href")?.slice(1);
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      event.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});


// --- Three.js Background Animation ---
// Smooth, organic 3D abstract sphere made of evenly spaced rounded dots.

const initThreeJS = () => {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  // SCENE SETUP
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 22; // Distance from center

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // LIGHTING
  // Soft studio lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x818cf8, 1.5); // Soft Purple/Blue
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  const pointLight2 = new THREE.PointLight(0x4f46e5, 1); // Accent Purple
  pointLight2.position.set(-10, -10, 10);
  scene.add(pointLight2);

  // OBJECT: Sphere of Dots (Fibonacci Sphere)
  const count = 1000; // Number of dots
  const geometry = new THREE.SphereGeometry(0.15, 12, 12); // Small rounded dots (spheres)
  // Using SphereGeometry instead of Capsule for better uniformity in "dots" look, 
  // but we can scale them to look like pills if desired.

  // Material: Glossy, soft purple
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x6366f1, // Indigo-500
    roughness: 0.2, // Glossy
    metalness: 0.1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1
  });

  const mesh = new THREE.InstancedMesh(geometry, material, count);

  // Create a dummy object to help set matrices
  const dummy = new THREE.Object3D();
  const positions = []; // Store base positions for animation

  // Fibonacci Sphere Algorithm
  const phi = Math.PI * (3.0 - Math.sqrt(5.0)); // Golden Angle

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radius = Math.sqrt(1 - y * y); // Radius at y

    const theta = phi * i; // Golden angle increment

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    // Scale up to sphere radius
    const scale = 12;
    const px = x * scale;
    const py = y * scale;
    const pz = z * scale;

    positions.push({ x: px, y: py, z: pz, originalX: px, originalY: py, originalZ: pz });

    dummy.position.set(px, py, pz);
    dummy.lookAt(0, 0, 0); // Point towards center? Or outwards? 
    // Actually, let's look outwards to orient the "capsule" if we scaled it.
    // But for spheres, rotation doesn't matter much unless we scale.

    // Let's stretch them slightly to make them "pills" aligned with surface normal
    // dummy.scale.set(1, 1, 1.5); // if want radical pills

    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }

  scene.add(mesh);

  // INTERACTION STATE
  const mouse = new THREE.Vector2();
  let targetRotationX = 0;
  let targetRotationY = 0;

  window.addEventListener("mousemove", (event) => {
    // Normalize mouse -1 to 1
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // ANIMATION LOOP
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // 1. Heartbeat / Pulsating effect
    // Scale the whole group slightly
    const beat = Math.sin(time * 1.5) * 0.05 + 1; // Base scale 1, +/- 0.05
    mesh.scale.set(beat, beat, beat);

    // 2. Organic Wave/Wobble on individual dots (Vertex Shader simulation via InstancedMesh positioning)
    // Updating 1000 matrices per frame is okay for desktop, might be heavy for low-end mobile.
    // Let's try a group rotation + scale first, it's cheaper.
    // For "organic deformation", modifying positions is best.

    let i = 0;
    for (let j = 0; j < count; j++) {
      const { originalX, originalY, originalZ } = positions[j];

      // Noise-like offset based on position and time
      const offset = Math.sin(time * 2 + originalX * 0.5) * 0.3 +
        Math.cos(time * 1.5 + originalY * 0.5) * 0.3;

      // Apply along the normal vector (which is just the position vector for a sphere centered at 0)
      // Normalize current position to get direction
      const dist = Math.sqrt(originalX ** 2 + originalY ** 2 + originalZ ** 2);
      const nx = originalX / dist;
      const ny = originalY / dist;
      const nz = originalZ / dist;

      dummy.position.set(
        originalX + nx * offset,
        originalY + ny * offset,
        originalZ + nz * offset
      );

      // Re-orient to look at center (or outward)
      dummy.lookAt(0, 0, 0);

      dummy.updateMatrix();
      mesh.setMatrixAt(i++, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    // 3. Mouse Interaction (Smooth Rotation)
    targetRotationY = mouse.x * 0.5; // Max rotation rads
    targetRotationX = mouse.y * 0.5;

    // Lerp current rotation to target
    mesh.rotation.y += 0.05 * (targetRotationY - mesh.rotation.y);
    mesh.rotation.x += 0.05 * (targetRotationX - mesh.rotation.x);

    // 4. Constant slow rotation
    mesh.rotation.z += 0.002;

    renderer.render(scene, camera);
  };

  animate();

  // RESIZE HANDLER
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
};

// Start Three.js when DOM is ready
initThreeJS();
