'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useTexture } from '@react-three/drei';
import fireVert from '@/shaders/fire/fire.vert';
import fireFrag from '@/shaders/fire/fire.frag';
import smokeVert from '@/shaders/smoke/smoke.vert';
import smokeFrag from '@/shaders/smoke/smoke.frag';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

function Campfire() {
  const { scene } = useGLTF('/assets/campfire.glb');
  const modelRef = useRef<THREE.Object3D>(null);

  const cloned = useRef<THREE.Object3D>(null);

  if (!cloned.current) {
    cloned.current = clone(scene);
  }

  return <primitive object={cloned.current} ref={modelRef} scale={[0.005, 0.005, 0.005]} />;
}

function FireShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const perlinTexture = useTexture('/assets/textures/firePerlinNoise.png');
  perlinTexture.wrapS = THREE.RepeatWrapping;
  perlinTexture.wrapT = THREE.RepeatWrapping;

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0.03, 0.375, 0.1]} rotation={[0, 0, 0]}>
      <planeGeometry args={[0.55, 0.7, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={fireVert}
        fragmentShader={fireFrag}
        uniforms={{
          uTime: { value: 0 },
          uNoiseTex: { value: perlinTexture },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        //  wireframe
      />
    </mesh>
  );
}

function SmokeShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  const perlinTexture = useTexture('/assets/textures/perlin.png');
  perlinTexture.wrapS = THREE.RepeatWrapping;
  perlinTexture.wrapT = THREE.RepeatWrapping;

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0.85, 0]} rotation={[0, 0, 0]}>
      <planeGeometry args={[0.5, 0.5, 32, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={smokeVert}
        fragmentShader={smokeFrag}
        uniforms={{
          uTime: { value: 0 },
          uNoiseTex: { value: perlinTexture },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        //  wireframe
      />
    </mesh>
  );
}

const BonfireInstance = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      <Campfire />
      <FireShaderPlane />
      <SmokeShaderPlane />
    </group>
  );
};

export default BonfireInstance;
