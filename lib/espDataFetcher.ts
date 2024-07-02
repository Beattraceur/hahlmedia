import { useEffect, useState } from "react";

type EspData = {
  _id: string;
  rainAmount: number;
  percentageHumidity: number;
  temperature: number;
  pressure: number;
  windRPM: number;
  timestamp: string;
  [key: string]: any;
};

export function useEspData() {
  const [data, setData] = useState<EspData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/espData");
        if (!response.ok) {
          throw new Error("Unable to fetch ESP data");
        }
        const espData = await response.json();
        setData(espData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return data;
}
