import React, {useState} from 'react';
import { Planet, Cat } from 'react-kawaii';
import './App.css';
import Dialog from '@material-ui/core/Dialog';

function App() {
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }
  function handleOpen() {
    setOpen(true);
  }
  return (
    <div className="App">
      <h1>Lunchy</h1>
      <div>ideas for project give the user an opportunity to vote opportunity
        on what we want for lunch. 2. someone can say agree to order lunch 3. submit list of what
        is ordered and what you are getting/ price/ time its going to take. 
      </div>
      <Planet size={200} mood="blissful" color="#FDA7DC" />
      <Cat size={200} mood="blissful" color="#FDA7DC" />
      <button onClick={handleOpen}>Hello</button>
      <Dialog open={open} onClose={handleClose}>
        <div>sup</div>
      </Dialog>
    </div>
  );
}

export default App;
