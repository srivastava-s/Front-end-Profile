import React, { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';

function BackgroundSphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ─── Scene Setup ───
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ─── Lighting ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x818cf8, 1.5);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x4f46e5, 1);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // ─── Fibonacci Sphere of Dots ───
    const count = 1000;
    const geometry = new THREE.SphereGeometry(0.15, 12, 12);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      roughness: 0.2,
      metalness: 0.1,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
    });

    const mesh = new THREE.InstancedMesh(geometry, material, count);
    const dummy = new THREE.Object3D();
    const positions = [];

    const phi = Math.PI * (3.0 - Math.sqrt(5.0));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      const scale = 12;
      const px = x * scale;
      const py = y * scale;
      const pz = z * scale;

      positions.push({ x: px, y: py, z: pz, originalX: px, originalY: py, originalZ: pz });

      dummy.position.set(px, py, pz);
      dummy.lookAt(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    scene.add(mesh);

    // ─── Mouse Interaction ───
    const mouse = new THREE.Vector2();
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ─── Animation Loop ───
    const clock = new THREE.Clock();
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Pulsating heartbeat
      const beat = Math.sin(time * 1.5) * 0.05 + 1;
      mesh.scale.set(beat, beat, beat);

      // Organic wave deformation
      for (let j = 0; j < count; j++) {
        const { originalX, originalY, originalZ } = positions[j];
        const offset =
          Math.sin(time * 2 + originalX * 0.5) * 0.3 +
          Math.cos(time * 1.5 + originalY * 0.5) * 0.3;

        const dist = Math.sqrt(originalX ** 2 + originalY ** 2 + originalZ ** 2);
        const nx = originalX / dist;
        const ny = originalY / dist;
        const nz = originalZ / dist;

        dummy.position.set(
          originalX + nx * offset,
          originalY + ny * offset,
          originalZ + nz * offset
        );
        dummy.lookAt(0, 0, 0);
        dummy.updateMatrix();
        mesh.setMatrixAt(j, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;

      // Mouse-driven rotation
      targetRotationY = mouse.x * 0.5;
      targetRotationX = mouse.y * 0.5;
      mesh.rotation.y += 0.05 * (targetRotationY - mesh.rotation.y);
      mesh.rotation.x += 0.05 * (targetRotationX - mesh.rotation.x);

      // Slow constant spin
      mesh.rotation.z += 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // ─── Resize ───
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);

    // ─── Cleanup ───
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    />
  );
}

export default memo(BackgroundSphere);
