import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';

function App() {
  return (
    <div id="calculator">
      <Display />
      <ButtonPanel />
    </div>
  );
}

export default App;
