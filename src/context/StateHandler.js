import React, { createContext, useContext, useState } from 'react';

export const stateContext = createContext();

const StateHandler = ({ children }) => {
  const [items, setItems] = useState([
    {
      id: 1,
      item: 'year1',
    },
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      course: 'Course101',
      grade: 'A',
      unit: 3,
    },
  ]);

  const addCourse = course => {
    const id = courses.length ? courses[courses.length - 1].id + 1 : 1;
    const myNewCourse = { id, course, grade: 'b', unit: 2 };

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

  // const [newItem, setNewItem] = useState('');

  const setAndSaveItems = newItems => {
    setItems(newItems);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  };
  const setAndSaveCourses = newCourses => {
    setCourses(newCourses);
    localStorage.setItem('school', JSON.stringify(newCourses));
  };

  // const handleCheck = id => {
  //   const listItems = items.map(item =>
  //     item.id === id ? { ...item, checked: !item.checked } : item
  //   );
  //   setAndSaveItems(listItems);
  // };

  const handleDelete = id => {
    const listItems = items.filter(item => item.id !== id);
    setAndSaveItems(listItems);
  };
  const handleDeleteCourse = id => {
    const listCourse = courses.filter(course => course.id !== id);
    setAndSaveCourses(listCourse);
  };

  // const handleSubmit = e => {
  //   if (!newItem) return;
  //   addItem(newItem);
  //   setNewItem('');
  // };

  return (
    <stateContext.Provider
      value={{
        // newItem,
        // setNewItem,
        addItem,
        // handleSubmit,
        handleDelete,
        handleDeleteCourse,
        items,
        setItems,
        setAndSaveItems,
        courses,
        addCourse,
        setAndSaveCourses,
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
