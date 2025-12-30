import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const DPR = Math.min(window.devicePixelRatio ?? 1, 1.8)

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x020617)

    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(DPR)
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const geometry = new THREE.IcosahedronGeometry(2, 1)
    const material = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      wireframe: true,
      metalness: 0.4,
      roughness: 0.2,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 180
    const posArray = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 12
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.8,
    })
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    const keyLight = new THREE.PointLight(0x6366f1, 18, 40)
    keyLight.position.set(6, 6, 4)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0x22c55e, 6, 40)
    fillLight.position.set(-6, -4, 6)
    scene.add(fillLight)

    const rimLight = new THREE.PointLight(0x0ea5e9, 10, 40)
    rimLight.position.set(-2, 6, -4)
    scene.add(rimLight)

    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let animationFrameId = 0
    let lastFrameTime = 0

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      mouseX = x * 2
      mouseY = y * 2
    }

    mount.addEventListener('pointermove', onPointerMove)

    const animate = (time: number) => {
      animationFrameId = window.requestAnimationFrame(animate)

      const deltaMs = time - lastFrameTime
      if (deltaMs < 1000 / 60) return
      lastFrameTime = time

      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      mesh.rotation.x += 0.002 + targetY * 0.01
      mesh.rotation.y += 0.004 + targetX * 0.01

      particlesMesh.rotation.y += 0.0008

      camera.position.x = targetX * 0.6
      camera.position.y = -targetY * 0.4
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animationFrameId = window.requestAnimationFrame(animate)

    const onResize = () => {
      if (!mount) return
      const { clientWidth, clientHeight } = mount
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(mount)

    const onVisibilityChange = () => {
      if (document.hidden) {
        lastFrameTime = performance.now()
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      mount.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      resizeObserver.disconnect()
      cancelAnimationFrame(animationFrameId)
      geometry.dispose()
      particlesGeometry.dispose()
      material.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" />
}


