/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/Base.glb 
*/

import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function Base(props) {
  const { nodes, materials } = useGLTF('./models/Base.glb');
  return (
    <group
      {...props}
      dispose={null}
      position={[0, -10.1, 0]}
      onPointerOver={(event) => event.stopPropagation()}
    >
      <mesh geometry={nodes.Cube001.geometry} material={materials.Mud} />
      <mesh geometry={nodes.Cube001_1.geometry} material={materials.Grass} />
      <mesh geometry={nodes.Cube001_2.geometry} material={materials.Grass} />
    </group>
  );
}

useGLTF.preload('./models/Base.glb');
