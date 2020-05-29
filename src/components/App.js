import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';

function App() {
  const [total, setTotal] = React.useState(undefined);
  const [next, setNext] = React.useState(undefined);
  const [operation, setOperation] = React.useState(undefined);

  function clearListenerOperations() {
    document.querySelectorAll('.listener-operation').forEach(listener => {
      listener.classList.remove('listener-operation');
    });
  }

  function handleClick(buttonName, btnRef) {
    const newState = calculate({ total, next, operation }, buttonName);
    const binaryOperations = ['+', '-', 'X', '÷'];
    setTotal(newState.total);
    setNext(newState.next);
    setOperation(newState.operation);

    if (binaryOperations.includes(buttonName)) {
      clearListenerOperations();
      btnRef.current.classList.add('listener-operation');
    }

    if (buttonName === '=') {
      clearListenerOperations();
    }
  }

  React.useEffect(() => {
    if (!operation) {
      clearListenerOperations();
    }
  });

  return (
    <div id="calculator">
      <Display calculation={next || total} />
      <ButtonPanel clickHandler={handleClick} />
    </div>
  );
}

export default App;
