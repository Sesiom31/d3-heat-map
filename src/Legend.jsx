import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { h, pb, pl } from './datos';
import PropTypes from 'prop-types';

function Legend({ data, baseTemperatura, legendColors }) {
  const legendRef = useRef(null);
  const colorLegendRef = useRef(null);
  const legendWidth = 440;
  const legendHeight = 25;

  const variance = data.map((d) => d.variance); // array de variaciones en Temperatura
  const [minT = 0, maxT = 0] = d3.extent(variance, (d) => baseTemperatura + d);
  // calcula el minimo y maximo de las variaciones en Temperatura + baseTemperatura

  const legendScale = d3
    .scaleThreshold()
    .domain(
      ((min, max, count) => {
        let array = [];
        let step = (max - min) / count;
        let base = min;
        for (let i = 1; i < count; i++) {
          array.push(base + i * step);
        }
        return array;
      })(minT, maxT, legendColors.length)
    )
    .range(legendColors);

  const legendX = d3
    .scaleLinear()
    .domain([minT, maxT])
    .range([pl, pl + legendWidth]);

  useEffect(() => {
    d3.select(legendRef.current).call(
      d3.axisBottom(legendX).tickValues(legendScale.domain()).tickFormat(d3.format('.1f'))
    );
  }, [legendX, legendScale]);

  useEffect(() => {
    d3.select(colorLegendRef.current)
      .selectAll('rect')
      .data(legendColors)
      .enter()
      .append('rect')
      .attr('width', legendWidth / legendColors.length)
      .attr('height', legendHeight)
      .attr('x', (d, i) => pl + (legendWidth * i) / legendColors.length)
      .attr('y', h - pb / 2)
      .attr('fill', (d) => d);
  }, [legendColors, legendX, legendScale]);

  return (
    <>
      <g id="legend" ref={colorLegendRef} transform={`translate(0, 15)`}></g>
      <g ref={legendRef} transform={`translate(0, ${h - pb / 4})`} style={{fontSize:'0.71rem'}}></g>
    </>
  );
}

Legend.propTypes = {
  data: PropTypes.array,
  baseTemperatura: PropTypes.number.isRequired,
  legendColors: PropTypes.array,
};

export default Legend;
