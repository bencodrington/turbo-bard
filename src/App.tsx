import React, { useState } from 'react';
import './App.scss';
import SoundscapeList from './components/SoundscapeList';
import { Soundscape } from './models/Soundscape';
import AppHeader from './widgets/AppHeader';

function App() {
  const [soundscapes, setSoundscapes] = useState<Soundscape[]>([]);

  function addSoundscape(newSoundscape: Soundscape) {
    setSoundscapes([
      ...soundscapes,
      newSoundscape
    ]);
  }

  return (
    <div className="App">
      <AppHeader />
      <SoundscapeList
        soundscapes={soundscapes}
        addSoundscape={addSoundscape}
      />
    </div>
  );
}

export default App;
