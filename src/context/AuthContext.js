import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebase';

export const userAuthContext = createContext();

export function UserAuthProvider({ children }) {
  const [user, setUser] = useState('');

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    console.log('singin in');
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function gitHubSignIn() {
    const gitHubAuthProvider = new GithubAuthProvider();
    return signInWithPopup(auth, gitHubAuthProvider);
  }

  function passwordReset(email) {
    return sendPasswordResetEmail(auth, email);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log('custom hook');
      if (currentUser) localStorage.setItem('login', true);
      setUser(currentUser);
    });
    return () => unsubscribe(); //doing this to clean up the use effect to avoid memory leakage
  });

  return (
    <userAuthContext.Provider
      value={{
        logOut,
        googleSignIn,
        user,
        signup,
        login,
        gitHubSignIn,
        passwordReset,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(userAuthContext);
}

export default UserAuthProvider;
