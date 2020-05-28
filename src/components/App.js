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

  return (
    <div id="calculator">
      <Display />
      <ButtonPanel />
    </div>
  );
}

export default App;
