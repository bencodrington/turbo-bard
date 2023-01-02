import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import AboutPage from './components/AboutPage';
import GroupList from './components/GroupList/GroupList';
import useBoolean from './hooks/useBoolean';
import { loadGroupsFromStorage } from './slices/groups';

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
      {isAboutOpen && <AboutPage closeAboutPage={() => { setIsAboutOpen(false); }} />}
      <GroupList openAboutPage={() => { setIsAboutOpen(true) }} />
    </div>
  );
}

export default App;
