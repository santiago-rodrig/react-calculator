import React from 'react';
import PropTypes from 'prop-types';

function Display(props) {
    return (
        <div>{props.calculation}</div>
    );
}

Display.propTypes = {
    calculation: PropTypes.string.isRequired,
};

Display.defaultProps = {
    calculation: '0',
};

export default Display;