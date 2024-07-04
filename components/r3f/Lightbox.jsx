import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three'; // Import all exported members from 'three'

export default function Model(props) {
  const { nodes, materials } = useGLTF('./models/Lightbox.glb');

  // Ensure materials.LightBox exists before accessing it
  if (materials.LightBox) {
    materials.LightBox.side = THREE.BackSide; // Set to FrontSide for single-sided rendering
    // You can also use THREE.BackSide or THREE.DoubleSide as needed
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder002.geometry}
        material={materials.LightBox}
        position={[0, 8.791, 0]}
        scale={0.62}
      />
    </group>
  );
}

useGLTF.preload('./models/Lightbox.glb');
