"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { BornProjection } from "@/lib/bornProjection";
import { loveFrequency } from "@/lib/resonantConstants";

const tau = Math.PI * 2;

export default function QuantumCanvas({
  projection,
}: {
  projection: BornProjection;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050113");

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 2, 6);

    const ambient = new THREE.AmbientLight("#ffffff", 0.6);
    const directional = new THREE.DirectionalLight("#9fffe5", 1.1);
    directional.position.set(6, 8, 4);
    scene.add(ambient, directional);

    const geometry = new THREE.IcosahedronGeometry(0.35, 1);
    const material = new THREE.MeshStandardMaterial({
      metalness: 0.2,
      roughness: 0.15,
      toneMapped: true,
      emissive: new THREE.Color("#6b5bff"),
      emissiveIntensity: 0.6,
    });

    const count = projection.petals.length;
    const instanced = new THREE.InstancedMesh(geometry, material, count);
    const palette = projection.petals.map((petal) =>
      new THREE.Color().setHSL(petal.chromaHue / 360, 0.6, 0.5)
    );

    scene.add(instanced);
    const dummy = new THREE.Object3D();

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const time = performance.now() * 0.001;
      const resonantPhase = Math.sin(tau * loveFrequency * time * 0.001);

      projection.petals.forEach((petal, index) => {
        const radius = 1.2 + petal.geometryPetal;
        const angle = (index / count) * tau + resonantPhase;
        dummy.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 0.5) * petal.motionGrace * 1.4,
          Math.sin(angle) * radius
        );
        dummy.scale.setScalar(0.2 + petal.motionGrace * 0.4);
        dummy.updateMatrix();
        instanced.setMatrixAt(index, dummy.matrix);
        instanced.setColorAt(index, palette[index]);
      });

      instanced.instanceMatrix.needsUpdate = true;
      if (instanced.instanceColor) instanced.instanceColor.needsUpdate = true;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationRef.current ?? 0);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      scene.remove(instanced);
    };
  }, [projection]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "70vh",
        borderRadius: "1.5rem",
      }}
      aria-label="Quantum amplitude visualization vibrating at 528 hertz"
    />
  );
}
