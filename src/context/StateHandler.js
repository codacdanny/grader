import React, { createContext, useContext } from 'react';
import reducer from './Reducer';
import { getLocal } from './Reducer';

const stateContext = createContext();

const StateHandler = ({ children }) => {
  const init = [
    {
      semesterId: 1,
      semesterName: 'Semester 1',
      result: [{ courseId: 1, courseName: `Course 1`, grade: 5, unit: 0 }],
    },
  ];
  const newInit = getLocal();
  const initState = newInit === null ? init : newInit;
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
