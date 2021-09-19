import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import AboutPage from './components/AboutPage';
import TrackList from './components/TrackList/TrackList';
import useBoolean from './hooks/useBoolean';
import { loadGroupsFromStorage } from './slices/groups';
import AppHeader from './widgets/AppHeader';

function App() {
  const [isAboutOpen, setIsAboutOpen] = useBoolean(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Once, when the app first renders, load saved state
    //  from the last time the user used this site.
    dispatch(loadGroupsFromStorage());
  }, [dispatch]);

  useEffect(() => {
    // Close about page when Escape is pressed.
    const keyPressHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isAboutOpen) {
        setIsAboutOpen(false);
      }
    };
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    }
  });

  return (
    <div className="App">
      <AppHeader
        isAboutOpen={isAboutOpen}
        setIsAboutOpen={setIsAboutOpen}
      />
      {isAboutOpen && <AboutPage closeAboutPage={() => { setIsAboutOpen(false); }} />}
      <TrackList />
    </div>
  );
}

export default App;
