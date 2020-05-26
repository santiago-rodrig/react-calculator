import React from 'react';
import PropTypes from 'prop-types';

function Button({ name }) {
  return <button className="calculator-button" type="button">{name}</button>;
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Button;
