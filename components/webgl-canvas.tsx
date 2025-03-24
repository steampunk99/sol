"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useMotion } from "./motion-provider"
import { useMousePosition } from "./mouse-provider"

// Inline shader code instead of importing from files
const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uSection;

varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;
  
  // Calculate distortion
  vec3 pos = position;
  
  // Mouse distortion
  float dist = distance(uv, uMouse);
  float strength = 0.15 / (dist + 0.05);
  
  // Add wave effect based on section
  float wave = sin(uv.x * 10.0 + uTime) * 0.05 * (1.0 - uSection * 0.2);
  
  // Apply distortion
  pos.z += wave;
  pos.z += strength * 0.1 * sin(uTime * 0.5);
  
  // Calculate elevation for fragment shader
  vElevation = pos.z;
  
  // Final position
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform float uSection;
uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec2 vUv;
varying float vElevation;

void main() {
  // Calculate gradient based on uv and time
  vec3 color1 = uColor1;
  vec3 color2 = uColor2;
  
  // Mix colors based on section
  float mixFactor = sin(uTime * 0.2) * 0.5 + 0.5;
  mixFactor = mix(mixFactor, vUv.y, uSection * 0.2);
  
  vec3 color = mix(color1, color2, mixFactor);
  
  // Add noise
  float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233)) * (uTime * 0.1)) * 43758.5453);
  color = mix(color, vec3(noise), 0.03);
  
  // Add vignette
  float vignette = smoothstep(0.5, 0.0, length(vUv - 0.5));
  color = mix(color * 0.5, color, vignette);
  
  // Add elevation effect
  color = mix(color, color2, vElevation * 2.0);
  
  // Final color with alpha
  float alpha = 0.7 + vElevation * 0.3;
  
  gl_FragColor = vec4(color, alpha);
}
`

export default function WebGLCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { currentSection } = useMotion()
  const { mouseX, mouseY } = useMousePosition()

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create geometry
    const geometry = new THREE.PlaneGeometry(10, 10, 32, 32)

    // Create shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uSection: { value: 0 },
        uColor1: { value: new THREE.Color("#000000") },
        uColor2: { value: new THREE.Color("#FF5500") },
      },
      transparent: true,
    })

    // Create mesh
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Update uniforms
      material.uniforms.uTime.value = elapsedTime
      material.uniforms.uMouse.value.set((mouseX / window.innerWidth) * 2 - 1, -(mouseY / window.innerHeight) * 2 + 1)
      material.uniforms.uSection.value = currentSection

      // Render
      renderer.render(scene, camera)

      // Call animate again on the next frame
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [mouseX, mouseY, currentSection])

  return <canvas ref={canvasRef} className="webgl" />
}

