import React from 'react';
import { Planet, Cat } from 'react-kawaii';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Lunchy</h1>
      <Planet size={200} mood="blissful" color="#FDA7DC" />
      <Cat size={200} mood="blissful" color="#FDA7DC" />
    </div>
  );
}

export default App;
