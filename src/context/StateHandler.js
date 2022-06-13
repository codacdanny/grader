import React, { createContext, useContext, useState, useReducer } from 'react';

/// IMPORT USEREDUCER FIRST

const stateContext = createContext();
const setAndSaveItems = newItems => {
  // setItems(newItems);
  localStorage.setItem('shoppinglist', JSON.stringify(newItems));
};
export const ACTIONS = {
  ADD_SEMESTER: 'addSemester',
  DELETE_ITEM: 'handleDelete',
  ADD_COURSE: 'addCourse',
  SAVE_COURSE: 'saveCourse',
};
function reducer(items, action) {
  let local = getLocal();
  switch (action.type) {
    case ACTIONS.ADD_SEMESTER:
      const id = items.length ? items[items.length - 1].id + 1 : 1;

      const myNewItem = { id, course_and_score: {} };
      const listItems = [...items, myNewItem];
      setAndSaveItems(listItems);
      return listItems;
    case ACTIONS.SAVE_COURSE:
      let data = action.value;
     let courseEdit =  local.find(item => item.id === data.semesterId).course_and_score.find(item=>item.id===data.key)
      courseEdit =  {
          courseTitle: data.courseTitle,
          grade: data.grade,
          id:data.key
        };

      setAndSaveItems(local);
      return local;
    case ACTIONS.ADD_COURSE:
      let semesterId = action.value.semesterId;
      let semester = local.find(x => x.id === semesterId).course_and_score;

      let semesterArray = Object.keys(semester); 
      if (semesterArray.length === 0) {
        semester={
          1:
        }
      }

    default:
      break;
  }
}
function getLocal() {
  return JSON.parse(localStorage.getItem('shoppinglist'));
}
const StateHandler = ({ children }) => {
  const init = [
    {
      id: 1,
      result: [
        {id:1,
          courseTtle: 'math101',
          grade: 'A',
        },

         { id: 2,
          courseTtle: 'bio101',
          grade: 'A',
        },
      ],
    },
  ];
  const newInit = getLocal(); // we have to change this i think!!
  const initState = newInit === null ? init : newInit; // I thimk we should rewrite this too since we have the getLocal fn
  const [items, dispatch] = React.useReducer(reducer, initState);

  const [courses, setCourses] = useState([
    {
      id: 1,
      course: '',
      grade: '',
      unit: null,
    },
  ]);

  // const addCourse = course => {
  //   const id = courses.length ? courses[courses.length - 1].id + 1 : 1;
  //   const myNewCourse = { id, course, grade: '', unit: null };

  //   const listCourse = [...courses, myNewCourse];
  //   setAndSaveCourses(listCourse);
  //   console.log(courses);
  // };
  // const addItem = item => {
  //   const id = items.length ? items[items.length - 1].id + 1 : 1;
  //   const myNewItem = { id, item };
  //   const listItems = [...items, myNewItem];
  //   setAndSaveItems(listItems);
  // };

  const setAndSaveCourses = newCourses => {
    setCourses(newCourses);
    localStorage.setItem('school', JSON.stringify(newCourses));
  };

  const handleDelete = id => {
    const listItems = items.filter(item => item.id !== id);
    // setAndSaveItems(listItems);
  };
  const handleDeleteCourse = id => {
    const listCourse = courses.filter(course => course.id !== id);
    setAndSaveCourses(listCourse);
  };

  return (
    <stateContext.Provider
      value={{
        // addItem,
        dispatch,
        handleDelete,
        handleDeleteCourse,
        items,
        // setItems,
        // setAndSaveItems,
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
