import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';

export default function WaterLevel({ soilMoisture = 50 }) {
  return (
    <RoundedBox
      args={[19.99, soilMoisture / 20, 19.99]}
      smoothness={4}
      radius={0.32}
      position={[0, -9 + soilMoisture / 40, 0]}
    >
      <MeshTransmissionMaterial
        transmission={0.8}
        distortion={0.8}
        thickness={0.01}
        color={'#3D97A0'}
        temporalDistortion={0.1}
      />
    </RoundedBox>
  );
}
