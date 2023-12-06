import * as d3 from 'd3';
import { useEffect, useState } from 'react';
import Tema from './Tema';
import Svg from './Svg';

function Graphic() {
  const [data, setData] = useState([]);
  const [baseTemperatura, setBaseTemperatura] = useState(0);

  /* 0: {year: 1753, month: 1, variance: -1.3 */
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        let res = await fetch(
          'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
        );

        let data = await res.json();
        setBaseTemperatura(data.baseTemperature);
        setData(data.monthlyVariance);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDatos();
  }, []);

  const [minYear, maxYear] = [d3.min(data, (d) => d.year), d3.max(data, (d) => d.year)];

  setTimeout(() => {
    const rect = document.querySelectorAll('.cell')

    console.log(rect.length)
  }, 3000);

  return (
    <>
      <Tema minYear={minYear} maxYear={maxYear} baseTemperatura={baseTemperatura} />
      <Svg data={data} baseTemperatura={baseTemperatura} />
    </>
  );
}

export default Graphic;
