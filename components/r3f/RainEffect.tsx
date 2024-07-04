import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

interface RainEffectProps {
  windRPM?: number;
  rainColor?: number;
}

const RainEffect: React.FC<RainEffectProps> = ({
  windRPM = 0,
  rainColor = 0x212e34,
}) => {
  const rainRef = useRef<THREE.Points>(null);
  const boxSize = 10; // Size of the box
  const windSpeed = (windRPM / 100) * 0.2; // Convert windRPM to wind speed between 0 and 0.2
  const windDirection = new THREE.Vector2(1, 0); // Wind direction vector

  useEffect(() => {
    const rainGeo = new THREE.BufferGeometry();
    const rainCount = 30000;
    const positions = [];

    // Generate rain particles within an extended plane to cover the entire cube
    for (let i = 0; i < rainCount; i++) {
      positions.push(
        // X position within the extended plane
        Math.random() * (boxSize * 2) - boxSize,
        // Y position within the cube
        Math.random() * boxSize * 2 - boxSize,
        // Z position within the extended plane
        Math.random() * (boxSize * 2) - boxSize
      );
    }

    rainGeo.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const rainMaterial = new THREE.PointsMaterial({
      color: rainColor,
      size: 0.03,
      transparent: true,
    });

    if (rainRef.current) {
      rainRef.current.geometry = rainGeo;
      rainRef.current.material = rainMaterial;
    }
  }, [rainColor]);

  useFrame(() => {
    if (rainRef.current) {
      const positionAttribute = rainRef.current.geometry.attributes.position;
      if (positionAttribute) {
        const positions = positionAttribute.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] -= 0.17; // Move rain downwards
          // Calculate the horizontal wind effect
          const windFactor = new THREE.Vector2(
            windDirection.x * windSpeed,
            windDirection.y * windSpeed
          );
          // Apply the wind effect to rain particles
          positions[i] -= windFactor.x;
          positions[i + 2] -= windFactor.y;
          // Check if the rain particles are within the extended plane, reset if not
          if (
            Math.abs(positions[i]) > boxSize ||
            Math.abs(positions[i + 1]) > boxSize ||
            Math.abs(positions[i + 2]) > boxSize
          ) {
            positions[i + 1] = boxSize; // Reset rain above the box
            positions[i] = Math.random() * (boxSize * 2) - boxSize; // Randomize X position within the extended plane
            positions[i + 1] = Math.random() * boxSize * 2 - boxSize; // Randomize Y position within the cube
            positions[i + 2] = Math.random() * (boxSize * 2) - boxSize; // Randomize Z position within the extended plane
          }
        }
        positionAttribute.needsUpdate = true;
      }
    }
  });

  return (
    <>
      <Box args={[boxSize * 2, boxSize * 2, boxSize * 2]} visible={false} />
      <points ref={rainRef} />
    </>
  );
};

export default RainEffect;
