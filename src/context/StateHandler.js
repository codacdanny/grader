import React, { createContext, useContext } from 'react';
import reducer from './Reducer';
import { getLocal } from './Reducer';

const stateContext = createContext();

const StateHandler = ({ children }) => {
  const init = [
    {
      semesterId: 1,
      semesterName: 'Semester 1',
      result: [{ courseId: 1, courseName: 'math101', grade: 'A' }],
    },
  ];
  const newInit = getLocal(); // we have to change this i think!!
  const initState = newInit === null ? init : newInit; // I thimk we should rewrite this too since we have the getLocal fn
  const [items, dispatch] = React.useReducer(reducer, initState);

  return (
    <stateContext.Provider
      value={{
        dispatch,
        items,
      }}
    >
      {children}
    </stateContext.Provider>
  );
};

export function useHandler() {
  return useContext(stateContext);
}

export default StateHandler;
