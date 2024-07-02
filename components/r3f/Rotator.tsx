import { Box, RoundedBox, SpotLight } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';

interface windProps {
  windRPM: number | undefined;
}

export default function Rotator({ windRPM = 0, ...props }) {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    if (windRPM !== undefined && windRPM !== 0) {
      setSpeed((windRPM / 60) * 2 * Math.PI);
    }
  }, [windRPM]);

  const ref = useRef();

  useFrame((state, delta) => {
    if (speed !== undefined) {
      ref.current.rotation.y += speed * delta;
    }
  });

  return (
    <>
      <MovingSpot color='#ffffff' position={[0, 8.5, 0]} />;
      <group ref={ref} {...props} dispose={null}>
        <RoundedBox
          args={[0.7, 0.7, 0.7]}
          smoothness={8}
          position={[0, 7.6, 0]}
        >
          <meshPhysicalMaterial />
        </RoundedBox>
      </group>
    </>
  );
}

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef();
  const cone = useRef();
  const { clock } = useThree();

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    const x = Math.sin(elapsedTime) * 2;
    const z = Math.cos(elapsedTime) * 2;
    light.current.target.position.lerp(vec.set(x, 8.5, z), 0.1);
    light.current.target.updateMatrixWorld();
  });

  return (
    <>
      <SpotLight
        castShadow
        ref={light}
        penumbra={1}
        distance={10}
        angle={0.35}
        attenuation={5}
        anglePower={5}
        intensity={7}
        {...props}
      />
      <mesh ref={cone} rotation={[-Math.PI / 2, 0, 0]} position={[0, 8.5, 5]}>
        <coneGeometry args={[0.5, 10, 32]} />
        <meshBasicMaterial color={props.color} transparent opacity={0.5} />
      </mesh>
    </>
  );
}
