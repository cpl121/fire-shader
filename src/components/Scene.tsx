import { Canvas } from '@react-three/fiber';
import { CanvasLoader, BonfireInstance, FlickeringLight } from '@/components';
import { OrbitControls, Stars, Stats } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

const Scene = () => {
  return (
    // <GuiProvider>
    <Canvas
      camera={{ position: [0, 1, 3], fov: 50 }}
      shadows
      gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
        shadowMapEnabled: true,
        shadowMapType: THREE.PCFSoftShadowMap,
      }}
    >
      <ambientLight intensity={0.5} />
      <FlickeringLight />
      <Stars radius={100} depth={50} count={50_000} factor={2} saturation={0} fade speed={2} />
      <OrbitControls
        enableDamping={false}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 8}
      />

      <Suspense fallback={<CanvasLoader />} name={'Loader'}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.501, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#3b2f23" roughness={1} />
        </mesh>
        <BonfireInstance position={[0, -0.5, 0]} />
        <Stats />
      </Suspense>
    </Canvas>
    // </GuiProvider>
  );
};

export default Scene;
