import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';

function App() {
  const [total, setTotal] = React.useState(undefined);
  const [next, setNext] = React.useState(undefined);
  const [operation, setOperation] = React.useState(undefined);

  function handleClick(buttonName) {
    const newState = calculate({ total, next, operation }, buttonName);
    setTotal(newState.total);
    setNext(newState.next);
    setOperation(newState.operation);
  }

  let displayComponent;

  if (next) {
    displayComponent = <Display calculation={next} />;
  } else {
    displayComponent = <Display calculation={total} />;
  }

  return (
    <div id="calculator">
      {displayComponent}
      <ButtonPanel clickHandler={() => handleClick} />
    </div>
  );
}

export default App;
