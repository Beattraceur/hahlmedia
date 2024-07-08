import { Backdrop, RoundedBox, Stats } from '@react-three/drei'; // Assuming you're not using Tetrahedron
import Rotator from './Rotator';
import WaterLevel from './WaterLevel';
import { useTheme } from 'next-themes';
import { useEspData } from '@/lib/espDataFetcher';
import RainEffect from './RainEffect';
import Base from './Base';
import Lighthouse from './Lighthouse';
import Lightbox from './Lightbox';
import Barrels from './Barrels';
import ThermoHouse from './ThermoHouse';
import Balloon from './Balloon';
export default function Scene({ trigger, lastHourRainAmount }) {
  const espData = useEspData();
  const windRPM = espData.at(-1)?.windRPM;
  const soilMoisture = espData.at(-1)?.percentageHumidity;
  const pressure = espData.at(-1)?.pressure;
  const temperature = espData.at(-1)?.temperature;
  const { resolvedTheme } = useTheme();
  const ambientLightIntnsity = resolvedTheme === 'dark' ? 0 : 0.8;
  const directLightIntnsity = resolvedTheme === 'dark' ? 1 : 1.2;
  const rainColor = resolvedTheme === 'dark' ? 0x4a6876 : 0x212e34;
  const sunMoonColor = resolvedTheme === 'dark' ? 0xcef4ff : 0xfff2ce;
  return (
    <group>
      <ambientLight intensity={ambientLightIntnsity} />
      <directionalLight
        intensity={directLightIntnsity}
        position={(20, 40, 40)}
        color={sunMoonColor}
      />
      {lastHourRainAmount > 0 && (
        <RainEffect windRPM={windRPM} rainColor={rainColor} />
      )}
      <Rotator position={[0, 1, 0]} windRPM={windRPM} />

      <WaterLevel soilMoisture={soilMoisture} />
      {/* <Base
        windRPM={windRPM}
        trigger={trigger}
        lastHourRainAmount={lastHourRainAmount}
      /> */}
      <Lightbox />
      <Lighthouse windRPM={windRPM} trigger={trigger} />
      <ThermoHouse temperature={temperature} trigger={trigger} />
      <Barrels lastHourRainAmount={lastHourRainAmount} trigger={trigger} />
      {/* <Barometer pressure={pressure} trigger={trigger} /> */}
      <Balloon pressure={pressure} trigger={trigger} />
      <Base />
      {/* <Stats /> */}
    </group>
  );
}
