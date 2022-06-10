import { Box, Button, Input, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useHandler } from '../context/StateHandler';

const Courses = ({ course }) => {
  const { handleDeleteCourse } = useHandler();
  const [grade, setGrade] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [unitPoint, setUnitPoint] = useState('');
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
        value={courseTitle}
        onChange={e => setCourseTitle(e.target.value)}
        _placeholder={{
          opacity: '0.5',
          color: 'white',
          fontWeight: '300',
        }}
      />
      <Select
        placeholder="a"
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
        onChange={e => setGrade(e.target.value)}
      >
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
        <option value="F">F</option>
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
        value={unitPoint}
        onChange={e => setUnitPoint(e.target.value)}
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
        onClick={() => handleDeleteCourse(course.id)}
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
