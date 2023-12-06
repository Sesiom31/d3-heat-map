import PropTypes from 'prop-types';

function Tema({ minYear, maxYear, baseTemperatura }) {
  return (
    <header>
      <h1 id="title">Temperatura global mensual de la superficie terrestre</h1>
      <span id="description">
        {minYear} - {maxYear}: Base temperatura = {baseTemperatura}°C
      </span>
    </header>
  );
}

Tema.propTypes = {
  minYear: PropTypes.number,
  maxYear: PropTypes.number,
  baseTemperatura: PropTypes.number.isRequired,
};

export default Tema;
