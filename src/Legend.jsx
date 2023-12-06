import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { h, pb, pl } from './datos';
import PropTypes from 'prop-types';

function Legend({colors, colorScale, minT, maxT }) {
  const legendRef = useRef(null);
  const colorLegendRef = useRef(null);
  const legendWidth = 440;
  const legendHeight = 25;
 
  const legendX = d3
    .scaleLinear()
    .domain([minT, maxT])
    .range([pl, pl + legendWidth]);

  useEffect(() => {
    d3.select(legendRef.current).call(
      d3.axisBottom(legendX).tickValues(colorScale.domain()).tickFormat(d3.format('.1f'))
    );
  }, [legendX, colorScale]);

  useEffect(() => {
    d3.select(colorLegendRef.current)
      .selectAll('rect')
      .data(colors)
      .enter()
      .append('rect')
      .attr('width', legendWidth / colors.length)
      .attr('height', legendHeight)
      .attr('x', (d, i) => pl + (legendWidth * i) / colors.length)
      .attr('y', h - pb / 2)
      .attr('fill', (d) => d);
  }, [colors, legendX, colorScale]);

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
  colors: PropTypes.array,
  colorScale:PropTypes.func,
  minT: PropTypes.number,
  maxT: PropTypes.number,
};

export default Legend;
