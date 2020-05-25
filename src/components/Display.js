import React from 'react';
import PropTypes from 'prop-types';

function Display({ calculation }) {
  return (
    <div>{calculation}</div>
  );
}

Display.propTypes = {
  calculation: PropTypes.string,
};

Display.defaultProps = {
  calculation: '0',
};

export default Display;
