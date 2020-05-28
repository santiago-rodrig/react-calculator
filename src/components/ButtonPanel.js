import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

function ButtonPanel({ clickHandler }) {
  const buttonsProps = [
    { key: 1, name: 'AC' },
    { key: 2, name: '+/-' },
    { key: 3, name: '%' },
    { key: 4, name: '÷' },
    { key: 5, name: '7' },
    { key: 6, name: '8' },
    { key: 7, name: '9' },
    { key: 8, name: 'X' },
    { key: 9, name: '4' },
    { key: 10, name: '5' },
    { key: 11, name: '6' },
    { key: 12, name: '-' },
    { key: 13, name: '1' },
    { key: 14, name: '2' },
    { key: 15, name: '3' },
    { key: 16, name: '+' },
    { key: 17, name: '0' },
    { key: 18, name: '.' },
    { key: 19, name: '=' },
  ];

  const buttonsColor = '#E3E1DE';

  const buttonsElements = buttonsProps.map((prop, i) => {
    const data = { ...prop, wide: false, color: buttonsColor };

    if ((i + 1) % 4 === 0 || prop.key === 19) {
      delete data.color;
    } else if (prop.name === '0') {
      data.wide = true;
    }

    return (
      <Button
        clickHandler={clickHandler}
        key={data.key}
        name={data.name}
        wide={data.wide}
        color={data.color}
      />
    );
  });

  const buttonGroupsProps = [
    { key: 1 },
    { key: 2 },
    { key: 3 },
    { key: 4 },
    { key: 5 },
  ];

  const buttonGroupsElements = buttonGroupsProps.map((prop, i) => (
    <div className="buttons-group" key={prop.key}>
      {buttonsElements.slice((i * 4), ((i * 4) + 4))}
    </div>
  ));

  return (
    <>
      {buttonGroupsElements}
    </>
  );
}

ButtonPanel.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};

export default ButtonPanel;
