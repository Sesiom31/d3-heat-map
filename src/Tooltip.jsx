import { months } from './datos';
import PropTypes from 'prop-types';

function Tooltip({ datosTooltip: { x, y, year, month, temperatura, variance }, tooltipIsActive }) {
  

  return (
    <div
      id="tooltip"
      data-year={year}
      style={{ transform: `translate(${x}px, ${y}px)`, display: !tooltipIsActive && 'none' }}
    >
      <div className="h">
        <span>{year}</span> - <span>{months[month - 1]}</span>
      </div>

      <div className="b">
        <span>{temperatura.toFixed(1)}°C</span>
        <span>{variance.toFixed(1)}°C</span>
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  datosTooltip: PropTypes.object,
  tooltipIsActive: PropTypes.bool
};

export default Tooltip;
