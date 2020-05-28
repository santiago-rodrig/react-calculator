import React from 'react';
import PropTypes from 'prop-types';

function buildStyle(color, wide) {
  const style = { backgroundColor: color };
  style.flexBasis = wide ? '50%' : '25%';
  return style;
}

function Button({
  name, color, wide, clickHandler,
}) {
  function handleClick() {
    clickHandler(name);
  }

  return (
    <button
      className="calculator-button"
      type="button"
      style={buildStyle(color, wide)}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  wide: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

Button.defaultProps = {
  color: '#FCA800',
};

export default Button;
