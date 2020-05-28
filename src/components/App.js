import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';

function App() {
  const [total, setTotal] = React.useState(undefined);
  const [next, setNext] = React.useState(undefined);
  const [operation, setOperation] = React.useState(undefined);

  return (
    <div id="calculator">
      <Display />
      <ButtonPanel />
    </div>
  );
}

export default App;
