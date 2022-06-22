import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useHandler } from '../context/StateHandler';
import { TYPES } from '../context/Reducer';

const Year = ({ semesterId, semesterName }) => {
  const { dispatch } = useHandler();

  function editSemesterName(e) {
    dispatch({
      type: TYPES.EDIT_SEMESTER,
      value: {
        semesterId,
        semesterName: e.target.value,
      },
    });
  }

  function deleteSemester() {
    dispatch({
      type: TYPES.DELETE_SEMESTER,
      value: {
        semesterId,
      },
    });
  }
  return (
    <Box
      bgColor="#6c63ff"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w={{
        base: '97%',
        sm: '85%',
        lg: '70%',
      }}
      p={{
        base: '1rem',
        lg: '1.5rem',
      }}
      mb="3rem"
      borderRadius="1rem"
    >
      <Input
        type="text"
        placeholder={semesterName}
        variant="flushed"
        p={{
          base: '1.2rem',
          lg: '2rem',
        }}
        fontSize={{
          base: '1.2rem',
          lg: '1.9rem',
        }}
        borderRadius="1rem"
        textColor="white"
        width="30%"
        required
        value={semesterName}
        onChange={editSemesterName}
        _placeholder={{
          opacity: '0.6',
          color: 'white',
          fontWeight: '300',
        }}
      />

      <Flex columnGap=".7rem" alignItems="center">
        <Link to={`/semester/${semesterId}`}>
          <Button
            className="btn"
            p={{
              base: '1.2rem',
              lg: '2rem',
            }}
            fontSize={{
              base: '1.2rem',
              lg: '1.9rem',
            }}
            borderRadius="1rem"
            textColor="black"
          >
            Open
          </Button>
        </Link>
        <Button
          fontSize={{
            base: '1.9rem',
            lg: '2.5rem',
          }}
          py="2rem"
          color="black"
          aria-label="delete item"
          borderRadius="1rem"
          onClick={deleteSemester}
          _hover={{
            color: 'red.400',
          }}
          _active={{
            color: 'red.400',
          }}
        >
          <RiDeleteBin2Fill role="button" />
        </Button>
      </Flex>
    </Box>
  );
};

export default Year;
