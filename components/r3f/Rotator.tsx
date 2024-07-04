import { Box, RoundedBox, SpotLight } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';

interface WindProps {
  windRPM: number | undefined;
}

export default function Rotator({ windRPM = 0, ...props }: WindProps) {
  const [speed, setSpeed] = useState(0);
  const [targetPosition, setTargetPosition] = useState(new Vector3());

  useEffect(() => {
    if (windRPM !== undefined && windRPM !== 0) {
      setSpeed((windRPM / 60) * 2 * Math.PI);
    }
  }, [windRPM]);

  const ref = useRef();

  useFrame((state, delta) => {
    if (speed !== undefined) {
      ref.current.rotation.y += speed * delta;

      // Calculate the angle to the spotlight's target position
      const angle = Math.atan2(targetPosition.x, targetPosition.z);
      ref.current.rotation.y = angle;
    }
  });

  return (
    <>
      <MovingSpot
        color='#ffffff'
        position={[0, 8.5, 0]}
        speed={speed}
        setTargetPosition={setTargetPosition}
      />
      <group ref={ref} {...props} dispose={null}>
        <RoundedBox
          args={[0.7, 0.7, 0.7]}
          smoothness={8}
          position={[0, 7.6, 0]}
          rotation={[-Math.PI / 1, 1, 0]}
          scale={[0.5, 0.5, 0.5]}
        >
          <meshPhysicalMaterial />
        </RoundedBox>
        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 7.6, 5]}>
          <coneGeometry args={[1.5, 10, 32]} />
          <meshBasicMaterial transparent opacity={0.5} />
        </mesh> */}
      </group>
    </>
  );
}

function MovingSpot({
  vec = new Vector3(),
  speed,
  setTargetPosition,
  ...props
}) {
  const light = useRef();
  const elapsedTimeRef = useRef(0);

  useFrame((state, delta) => {
    elapsedTimeRef.current += delta;
    const elapsedTime = elapsedTimeRef.current;
    const x = Math.sin(elapsedTime * speed) * 2;
    const z = Math.cos(elapsedTime * speed) * 2;
    const newTargetPosition = vec.set(x, 8.4, z);

    light.current.target.position.lerp(newTargetPosition, 0.5);
    light.current.target.updateMatrixWorld();

    setTargetPosition(newTargetPosition.clone());
  });

  return (
    <>
      <SpotLight
        castShadow
        ref={light}
        penumbra={1}
        distance={15}
        angle={0.5}
        attenuation={10}
        anglePower={8}
        intensity={10}
        {...props}
      />
    </>
  );
}
