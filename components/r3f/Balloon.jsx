import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Model(
  { pressure = 965, openDrawer, pressureRef, trigger },
  props
) {
  const { nodes, materials } = useGLTF('./models/Balloon.glb');

  const pressureLevel = pressure - 961;
  // const pressureLevel = 9;
  // Define clipping plane aligned with the z-axis
  const planes = useMemo(
    () => [
      // new THREE.Plane(new THREE.Vector3(0, 1, 0), 2.9), // 9
      new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.2 * pressureLevel + 2.9), // 5
      //new THREE.Plane(new THREE.Vector3(0, 1, 0), 4.7), // 0
    ],
    [pressureLevel]
  );

  // const planeHelper = useMemo(
  //   () => new THREE.PlaneHelper(planes[0], 10, 0xff0000), // Create a PlaneHelper for visualization
  //   [planes]
  // );

  return (
    <>
      <group
        {...props}
        dispose={null}
        position={[0, -10.1, 0]}
        onPointerOver={(event) => (
          event.stopPropagation(), trigger('pressure')
        )}
        onPointerOut={(event) => trigger('')}
        onClick={(event) => openDrawer(pressureRef)}
      >
        <mesh
          geometry={nodes.Sphere_Sphere002.geometry}
          material={materials.Default}
          position={[-6.879, 16.64 - pressureLevel / 5, 6.411]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={1.623}
        />
        <mesh
          geometry={nodes.Torus.geometry}
          material={materials.Rope}
          position={[-6.879, 14.735 - pressureLevel / 5, 6.411]}
          scale={0.705}
        />
        <mesh
          geometry={nodes.Cylinder004.geometry}
          material={materials.Rope}
          position={[-6.879, 9.917, 6.345]}
          scale={[0.816, 1, 0.816]}
        />
        <mesh
          geometry={nodes.Cylinder006.geometry}
          material={materials.Silver}
          position={[-6.879, 4.992, 6.273]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          geometry={nodes.Cylinder007.geometry}
          material={materials.Silver}
          position={[-6.879, 7.552, 3.934]}
          rotation={[0, 0, -Math.PI / 2]}
        />
        <mesh
          geometry={nodes.Cube.geometry}
          material={materials.Wood}
          position={[-6.879, 4.817, 6.273]}
          scale={0.083}
        />
        <mesh
          geometry={nodes.Cube001.geometry}
          material={materials.Wood}
          position={[-6.874, 7.38, 4]}
          rotation={[-0.362, 0.023, 0.025]}
          scale={0.083}
        />
        <mesh
          geometry={nodes.WeightRope.geometry}
          material={materials.ClippingRope}
          position={[-6.879, 9.917, 6.345]}
          scale={[0.816, 1, 0.816]}
          material-clippingPlanes={planes}
          material-clipShadows={true}
        />
        <mesh
          geometry={nodes.Weight.geometry}
          material={materials.Silver}
          position={[-6.879, 5.421 + 1.8 - pressureLevel / 5, 3.861]}
        />
        <mesh
          geometry={nodes.BalloonBase.geometry}
          material={materials.StoneFloor}
          position={[-6.876, 4.79, 4.972]}
        />
      </group>
      {/* <primitive object={planeHelper} /> */}
      {/* Add the PlaneHelper to the scene */}
    </>
  );
}

useGLTF.preload('./models/Balloon.glb');
