import React from 'react';
import PropTypes from 'prop-types';

function buildStyle(color, wide) {
  const style = { backgroundColor: color };
  style.flexBasis = wide ? '50%' : '25%';
  return style;
}

function Button({ name, color, wide }) {
  return (
    <button
      className="calculator-button"
      type="button"
      style={buildStyle(color, wide)}
    >
      {name}
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
};

Button.defaultProps = {
  color: '#FCA800'
};

export default Button;
