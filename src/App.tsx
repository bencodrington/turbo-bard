import React from 'react';
import './App.scss';
import TrackList from './components/TrackList/TrackList';
import AppHeader from './widgets/AppHeader';

function App() {

  return (
    <div className="App">
      <AppHeader />
      <TrackList />
    </div>
  );
}

export default App;
