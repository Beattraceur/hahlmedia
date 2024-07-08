import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import FakeGlowMaterial from './FakeGlowMaterial';
import { Circle } from '@react-three/drei';

interface WindProps {
  windRPM: number | undefined;
}

export default function Rotator({ windRPM = 0, ...props }: WindProps) {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    if (windRPM !== undefined && windRPM !== 0) {
      setSpeed((windRPM / 60) * 2 * Math.PI);
    } else {
      setSpeed(0);
    }
  }, [windRPM]);

  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (speed !== 0 && ref.current) {
      // Rotate the cone mesh
      ref.current.rotation.y += speed * delta;
    }
  });

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 7.6, 40]}>
        <coneGeometry args={[8, 80, 64, 10, true]} />
        <FakeGlowMaterial
          falloff={0.2}
          glowInternalRadius={1.5}
          glowColor={'#ffffff'}
          glowSharpness={10}
          side={THREE.FrontSide}
          opacity={1}
          depthTest={true}
        />
      </mesh>
      <Circle args={[0.2, 64]} position={[0, 7.6, 0.6]} />
    </group>
  );
}
