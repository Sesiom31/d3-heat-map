import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { h, pb, pl } from './datos';
import { months } from './datos';

function Ejes({ data, xScale, yScale }) {
  const gxRef = useRef(null);
  const gyRef = useRef(null);

  useEffect(() => {
    d3.select(gxRef.current).call(
      d3.axisBottom(xScale).tickValues(xScale.domain().filter((year) => year % 10 === 0))
    );
  }, [xScale, data]);

  useEffect(() => {
    d3.select(gyRef.current).call(d3.axisLeft(yScale).tickFormat((d) => months[d - 1]));
  }, [yScale]);

  // .tickFormat((d) => months[d - 1])

  return (
    <>
      <g
        id="x-axis"
        ref={gxRef}
        transform={`translate(0, ${h - pb})`}
        style={{ fontSize: '0.7rem' }}
      ></g>
      <g
        id="y-axis"
        ref={gyRef}
        transform={`translate(${pl}, 0)`}
        style={{ fontSize: '0.7rem' }}
      ></g>
    </>
  );
}

Ejes.propTypes = {
  data: PropTypes.array,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
};

export default Ejes;
