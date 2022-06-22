import React, { useContext, createContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { TYPES } from './Reducer';
import { useHandler } from './StateHandler';

export const loaderContext = createContext();
const LoaderContextProvider = ({ children }) => {
  const { user } = useAuth();
  const { dispatch } = useHandler();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getDetails = async () => {
      try {
        const docRef = doc(db, 'details', user.uid);
        const docSnap = await getDoc(docRef);
        setError('');
        setLoader(false);
        if (docSnap.exists()) {
          dispatch({
            type: TYPES.GET_DATA_FROM_FIREBASE,
            value: { data: docSnap.data().items },
          });
        }
        if (user) {
          const unsub = onSnapshot(doc(db, 'details', user.uid), docSnap => {
            if (docSnap.data())
              dispatch({
                type: TYPES.GET_DATA_FROM_FIREBASE,
                value: { data: docSnap.data().items },
              });
          });

          return () => unsub();
        }
      } catch (error) {
        setLoader(false);
        setError(error.message);
      }
    };

    getDetails();
  }, [dispatch, user]);

  return (
    <loaderContext.Provider
      value={{
        loader,
        setLoader,
        error,
        setError,
      }}
    >
      {children}
    </loaderContext.Provider>
  );
};

export const useLoader = () => {
  return useContext(loaderContext);
};

export default LoaderContextProvider;
