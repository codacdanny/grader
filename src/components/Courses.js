import { Box, Button, Input, Select } from '@chakra-ui/react';
import React from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { TYPES } from '../context/Reducer';
import { useHandler } from '../context/StateHandler';

const Courses = ({ courseId, grade, semesterId, unit, courseName }) => {
  const { dispatch } = useHandler();

  function deleteCourse() {
    dispatch({
      type: TYPES.DELETE_COURSE,
      value: {
        semesterId,
        courseId,
      },
    });
  }

  function editCourseName(e) {
    dispatch({
      type: TYPES.EDIT_COURSE,
      value: {
        semesterId,
        courseId,
        courseName: e.target.value,
        grade,
        unit,
      },
    });
  }

  function editCourseGrade(e) {
    dispatch({
      type: TYPES.EDIT_COURSE,
      value: {
        semesterId,
        courseId,
        courseName,
        grade: e.target.value,
        unit,
      },
    });
  }

  function editCourseUnit(e) {
    dispatch({
      type: TYPES.EDIT_COURSE,
      value: {
        semesterId,
        courseId,
        courseName,
        grade,
        unit: e.target.value,
      },
    });
  }

  return (
    <Box
      bgColor="#6c63ff"
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      w="70%"
      p="1.5rem"
      mb="3rem"
      borderRadius="1rem"
    >
      <Input
        type="text"
        placeholder="Course"
        variant="flushed"
        p="2rem"
        fontSize="1.9rem"
        borderRadius="1rem"
        textColor="white"
        width="35%"
        value={courseName}
        onChange={editCourseName}
        _placeholder={{
          opacity: '0.5',
          color: 'white',
          fontWeight: '300',
        }}
      />
      <Select
        placeholder=""
        borderRadius="1rem"
        textColor="black"
        fontWeight="medium"
        textAlign="center"
        width="20%"
        mt="1.7rem"
        p="1rem"
        fontSize="1.9rem"
        variant="flushed"
        value={grade}
        onChange={editCourseGrade}
      >
        <option value={5}>A</option>
        <option value={4}>B</option>
        <option value={3}>C</option>
        <option value={2}>D</option>
        <option value={1}>E</option>
        <option value={0}>F</option>
      </Select>

      <Input
        type="number"
        placeholder="unit points"
        variant="flushed"
        p="2rem"
        fontSize="1.9rem"
        borderRadius="1rem"
        textColor="white"
        width="25%"
        value={unit}
        onChange={editCourseUnit}
        _placeholder={{
          opacity: '0.6',
          color: 'white',
          fontWeight: '300',
        }}
      />
      <Button
        fontSize="2.5rem"
        py="2rem"
        color="black"
        borderRadius="1rem"
        aria-label="delete item"
        onClick={deleteCourse}
        _hover={{
          color: 'red.400',
        }}
        _active={{
          color: 'red.400',
        }}
      >
        <RiDeleteBin2Fill />
      </Button>
    </Box>
  );
};

export default Courses;
