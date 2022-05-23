import React, { useEffect, useState } from 'react';
import AppRauter from './Router';
import { authService } from "../fireB";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => { 
    authService.onAuthStateChanged(user => {
      if (user) {
        setLoggedIn(true);
        setUserObj(user);
      } else {
        setLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({...user});
  }

  return (
    <>
      {init ? <AppRauter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initaializing..."}
      <footer>&copy; {new Date().getFullYear()}MongMong</footer>
    </>
  );
}

export default App;
