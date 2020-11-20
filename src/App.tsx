import React from 'react';
import './App.scss';
import SoundscapeList from './components/SoundscapeList/SoundscapeList';
import TrackList from './components/TrackList/TrackList';
import AppHeader from './widgets/AppHeader';

function App() {

  return (
    <div className="App">
      <AppHeader />
      <SoundscapeList />
      <TrackList />
    </div>
  );
}

export default App;
