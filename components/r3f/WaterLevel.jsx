import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';

export default function WaterLevel({ soilMoisture = 50 }) {
  const scaleFaktor = 16.35;
  return (
    <RoundedBox
      args={[19.99, soilMoisture / scaleFaktor, 19.99]}
      smoothness={4}
      radius={0.5}
      position={[0, -9.15 + soilMoisture / (2 * scaleFaktor), 0]}
    >
      <MeshTransmissionMaterial
        transmission={0.8}
        distortion={1}
        thickness={0.01}
        color={'#3D97A0'}
        temporalDistortion={0.2}
      />
    </RoundedBox>
  );
}
