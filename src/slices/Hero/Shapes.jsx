"use client";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import React from "react";
import { color } from "three/examples/jsm/nodes/Nodes.js";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 30 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.3,
      geometry: new THREE.IcosahedronGeometry(2.5, 0),
    },
    {
      position: [-0.9, 1.2, 1],
      r: 0.3,
      geometry: new THREE.TorusGeometry(0.6, 0.3, 16, 100),
    },
    {
      position: [0.8, 1.3, -0.5],
      r: 0.3,
      geometry: new THREE.CylinderGeometry(0.1, 1, 2, 20, 1),
    },
    {
      position: [1.2, -1, 1],
      r: 0.3,
      geometry: new THREE.DodecahedronGeometry(1, 0),
    },
    {
      position: [-0.9, -1.1, 1],
      r: 0.3,
      geometry: new THREE.CylinderGeometry(1, 1, 1, 20, 1),
    },
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({ color: 0x474787, roughness: 0.5 }),
    new THREE.MeshStandardMaterial({ color: 0xffb142 }),
    new THREE.MeshStandardMaterial({ color: 0x34ace0 }),
    new THREE.MeshStandardMaterial({ color: 0xc44569, roughness: 0.7 }),
    new THREE.MeshStandardMaterial({ color: 0xe15f41, roughness: 0.6 }),
    new THREE.MeshStandardMaterial({ color: 0x2c3a47, roughness: 0.9 }),
    new THREE.MeshStandardMaterial({
      color: 0xff5252,
      roughness: 0.2,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xf7f1e3,
      roughness: 0.2,
      metalness: 0.6,
    }),
  ];

  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)}
      position={position.map((p) => p * 2)}
      geometry={geometry}
      materials={materials}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, materials }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const getRandomMaterial = () => {
    return gsap.utils.random(materials);
  };

  const startingMaterial = getRandomMaterial();

  const handleClick = (e) => {
    const mesh = e.object;

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 1)}`,
      y: `+=${gsap.utils.random(0, 1)}`,
      z: `+=${gsap.utils.random(0, 1)}`,
      duration: 1.3,
      ease: "back.out(2.5)",
      yoyo: true,
    });
    mesh.material = getRandomMaterial();
  };

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "back.out(2.5)",
        delay: 0.2,
      });
    });

    return () => ctx.revert(); //cleanup
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={25 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          material={startingMaterial}
          visible={visible}
        />
      </Float>
    </group>
  );
}
