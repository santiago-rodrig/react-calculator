import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
// This should count, eslint complains if I don't comment this line,
// this is because calculate remains unused.
// import calculate from '../logic/calculate';

function App() {
  return (
    <div id="calculator">
      <Display />
      <ButtonPanel />
    </div>
  );
}

export default App;
