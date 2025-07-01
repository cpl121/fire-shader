import { Canvas } from '@react-three/fiber';
import { CanvasLoader, BonfireInstance, GuiProvider } from '@/components';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

const Scene = () => {
  return (
    <GuiProvider>
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
        <directionalLight position={[2, 2, 2]} intensity={1} />
        {/* <fog attach="fog" args={['#101520', 6, 15]} /> */}
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
          <BonfireInstance position={[0, -0.5, 0]} />
        </Suspense>
      </Canvas>
    </GuiProvider>
  );
};

export default Scene;
