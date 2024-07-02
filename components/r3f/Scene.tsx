import { RoundedBox } from '@react-three/drei'; // Assuming you're not using Tetrahedron
import Rotator from './Rotator';
import WaterLevel from './WaterLevel';
import { useTheme } from 'next-themes';
import { useEspData } from '@/lib/espDataFetcher';
import RainEffect from './RainEffect';
import Base from './Base';
import Lighthouse from './Lighthouse';
import Barrels from './Barrels';
export default function Scene({ trigger, lastHourRainAmount }) {
  const espData = useEspData();
  const windRPM = espData.at(-1)?.windRPM;
  const soilMoisture = espData.at(-1)?.percentageHumidity;

  const { resolvedTheme } = useTheme();
  const ambientLightIntnsity = resolvedTheme === 'dark' ? 0 : 1.5;
  const directLightIntnsity = resolvedTheme === 'dark' ? 1 : 0.8;

  return (
    <group>
      <ambientLight intensity={ambientLightIntnsity} />
      <directionalLight
        intensity={directLightIntnsity}
        position={(20, 40, 40)}
      />
      <RainEffect windRPM={windRPM} />
      <Rotator position={[0, 1, 0]} windRPM={windRPM} />

      <WaterLevel soilMoisture={soilMoisture} />
      {/* <Base
        windRPM={windRPM}
        trigger={trigger}
        lastHourRainAmount={lastHourRainAmount}
      /> */}
      <Lighthouse windRPM={windRPM} trigger={trigger} />
      <Barrels lastHourRainAmount={lastHourRainAmount} trigger={trigger} />
      <Base />
    </group>
  );
}
