'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import Scene from './Scene';
import {
  Backdrop,
  Html,
  OrbitControls,
  Stage,
  useProgress,
} from '@react-three/drei';
import { DirectionalLight } from 'three';
import {
  ChartType,
  DrawableComponent,
  InheritedProps,
  TriggerType,
} from '@/lib/types';
import { Dispatch, SetStateAction, Suspense } from 'react';

export default function MainStage({
  trigger,
  lastHourRainAmount,
  openDrawer,
  percentageHumidityRef,
  windRPMRef,
  rainAmountRef,
  temperatureRef,
  pressureRef,
}: InheritedProps) {
  const light = new DirectionalLight();
  light.position.set(2, 10, 6); // This position is relative to the camera's position
  return (
    <div className='w-full h-screen'>
      <Canvas
        gl={{ localClippingEnabled: true }}
        onCreated={({ camera, scene }) => {
          camera.position.set(20, 5, 20);
          // camera.add(light);
          scene.add(camera);
        }}
      >
        <OrbitControls
          maxDistance={30}
          minDistance={12}
          maxPolarAngle={Math.PI / 1.8}
          enablePan={false}
        />
        <Suspense fallback={<Loader />}>
          <Scene
            trigger={trigger}
            lastHourRainAmount={lastHourRainAmount}
            openDrawer={openDrawer}
            percentageHumidityRef={percentageHumidityRef}
            windRPMRef={windRPMRef}
            rainAmountRef={rainAmountRef}
            temperatureRef={temperatureRef}
            pressureRef={pressureRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress.toFixed(0)} % loaded</Html>;
}
