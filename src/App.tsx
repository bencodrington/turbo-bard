import React from 'react';
import './App.css';
import AppHeader from './widgets/AppHeader';
import AddSoundscapeButton from './widgets/buttons/AddSoundscapeButton';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <AddSoundscapeButton />
    </div>
  );
}

export default App;
