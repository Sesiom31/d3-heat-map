import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { w, h, pt, pr, pb, pl } from './datos';
import Ejes from './Ejes';
import Legend from './Legend';
import Tooltip from './Tooltip';

function Svg({ data, baseTemperatura }) {  
  const [tooltipIsActive, setTooltipIsActive] = useState(false);
  const [datosTooltip, setDatosTooltip] = useState({
    x: 0,
    y: 0,
    year: null,
    month: 'enero',
    temperatura: 0,
    variance: 0,
  });
  const svgRef = useRef(null);

  

  const colors = d3.schemeRdBu[11].reverse(); // array de colores para la leyenda
  const variance = data.map((d) => d.variance); // array de variaciones en Temperatura
  const [minT = 0, maxT = 0] = d3.extent(variance, (d) => baseTemperatura + d);

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.year))
    .range([pl, w - pr])
    .padding(0);

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.month))
    .range([pt, h - pb])
    .padding(0);

  const colorScale = d3
    .scaleThreshold()
    .domain(
      ((min, max, count) => {
        let dom = [];
        let step = (max - min) / count;
        let base = min;
        for (let i = 1; i < count; i++) {
          dom.push(base + i * step);
        }
        return dom;
      })(minT, maxT, colors.length)
    )
    .range(colors);

  useEffect(() => {
    d3.select(svgRef.current)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('data-month', (d) => d.month - 1)
      .attr('data-year', (d) => d.year)
      .attr('data-temp', (d) => baseTemperatura + d.variance)
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('x', (d) => xScale(d.year))
      .attr('y', (d) => yScale(d.month))
      .attr('fill', (d) => colorScale(baseTemperatura + d.variance))
      .style('cursor', 'pointer')
      .on('mouseenter', (e, d) => {
        setTooltipIsActive(true);
        setDatosTooltip({
          x: e.pageX - 50 -24,
          y: e.pageY - 175,
          year: d.year,
          month: d.month,
          temperatura: baseTemperatura + d.variance,
          variance: d.variance,
        });
      })
      .on('mouseleave', () => {
        setTooltipIsActive(false);
      });
  }, [data, xScale, yScale, baseTemperatura, colorScale]);

  return (
    <main>
      <svg width={w} height={h} ref={svgRef}>
        <Ejes data={data} xScale={xScale} yScale={yScale} />
        <Legend
          data={data}
          baseTemperatura={baseTemperatura}
          colors={colors}
          colorScale={colorScale}
          minT={minT}
          maxT={maxT}
        />
      </svg>
      {tooltipIsActive && <Tooltip datosTooltip={datosTooltip} tooltipIsActive={tooltipIsActive} />}
    </main>
  );
}

Svg.propTypes = {
  data: PropTypes.array.isRequired,
  baseTemperatura: PropTypes.number.isRequired,
};

export default Svg;
