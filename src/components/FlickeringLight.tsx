import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpotLight } from 'three';

const FlickeringLight = () => {
  const lightRef = useRef<SpotLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lightRef.current) {
      lightRef.current.intensity = 10 + Math.sin(t * 1.5) * 1.5;
    }
  });

  return (
    <spotLight
      ref={lightRef}
      position={[0, 3, 0]}
      angle={Math.PI / 6}
      penumbra={0.5}
      intensity={8}
      castShadow
    />
  );
};

export default FlickeringLight;
