import React, { createContext, useContext, useState, useReducer } from 'react';

// const ACTIONS = {
//   ADD_ITEM: 'addItem',
//   DELETE_ITEM: 'handleDelete',
// };
// function reducer(state, action) {
//   switch (action.type) {
//     case ACTIONS.ADD_ITEM:
//       const id = items.length ? items[items.length - 1].id + 1 : 1;
//       const myNewItem = { id, item };
//       const listItems = [...items, myNewItem];
//       return setAndSaveItems(listItems);

//     default:
//       break;
//   }
// }

// const [state, dispatch] = useReducer(reducer, initialState);

const stateContext = createContext();

const StateHandler = ({ children }) => {
  // const ACTIONS = {
  //   ADD_ITEM: 'addItem',
  //   DELETE_ITEM: 'handleDelete',
  // };
  // function reducer(state, action) {
  //   switch (action.type) {
  //     case ACTIONS.ADD_ITEM:
  //       const setAndSaveItems = newItems => {
  //         setItems(newItems);
  //         localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  //       };
  //       const id = items.length ? items[items.length - 1].id + 1 : 1;
  //       const myNewItem = { id, item };
  //       const listItems = [...items, myNewItem];
  //       return setAndSaveItems(listItems);

  //     default:
  //       break;
  //   }
  // }

  const [items, setItems] = useState([
    {
      id: 1,
      item: 'year1',
    },
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      course: '',
      grade: '',
      unit: null,
    },
  ]);

  const addCourse = course => {
    const id = courses.length ? courses[courses.length - 1].id + 1 : 1;
    const myNewCourse = { id, course, grade: '', unit: null };

    const listCourse = [...courses, myNewCourse];
    setAndSaveCourses(listCourse);
    console.log(courses);
  };
  const addItem = item => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, item };
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
  };

  const setAndSaveItems = newItems => {
    setItems(newItems);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  };
  const setAndSaveCourses = newCourses => {
    setCourses(newCourses);
    localStorage.setItem('school', JSON.stringify(newCourses));
  };

  const handleDelete = id => {
    const listItems = items.filter(item => item.id !== id);
    setAndSaveItems(listItems);
  };
  const handleDeleteCourse = id => {
    const listCourse = courses.filter(course => course.id !== id);
    setAndSaveCourses(listCourse);
  };

  return (
    <stateContext.Provider
      value={{
        addItem,

        handleDelete,
        handleDeleteCourse,
        items,
        setItems,
        setAndSaveItems,
        courses,
        addCourse,
        setAndSaveCourses,
        setCourses,
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
