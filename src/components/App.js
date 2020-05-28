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

  let displayComponent;

  if (next) {
    displayComponent = <Display calculation={next} />;
  } else if (total) {
    displayComponent = <Display calculation={total} />;
  } else {
    displayComponent = <Display />;
  }

  return (
    <div id="calculator">
      {displayComponent}
      <ButtonPanel clickHandler={handleClick} />
    </div>
  );
}

export default App;
