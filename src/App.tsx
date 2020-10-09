import React from 'react';
import './App.css';
import SoundscapeList from './components/SoundscapeList';
import AppHeader from './widgets/AppHeader';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <SoundscapeList />
    </div>
  );
}

export default App;
