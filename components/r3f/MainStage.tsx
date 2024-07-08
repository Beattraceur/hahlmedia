'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import Scene from './Scene';
import { Backdrop, OrbitControls, Stage } from '@react-three/drei';
import { DirectionalLight } from 'three';
import { TriggerType } from '@/lib/types';

export default function MainStage({
  trigger,
  lastHourRainAmount,
  openDrawer,
  percentageHumidityRef,
  windRPMRef,
  rainAmountRef,
  temperatureRef,
  pressureRef,
}: {
  trigger: TriggerType;
  lastHourRainAmount: number;
}) {
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
        <OrbitControls />
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
      </Canvas>
    </div>
  );
}
