import React from 'react';
import './App.scss';
import AboutPage from './components/AboutPage';
import TrackList from './components/TrackList/TrackList';
import useBoolean from './hooks/useBoolean';
import AppHeader from './widgets/AppHeader';

function App() {
  const [isAboutOpen, setIsAboutOpen] = useBoolean(false);

  return (
    <div className="App">
      <AppHeader
        isAboutOpen={isAboutOpen}
        setIsAboutOpen={setIsAboutOpen}
      />
      {isAboutOpen && <AboutPage />}
      <TrackList />
    </div>
  );
}

export default App;
