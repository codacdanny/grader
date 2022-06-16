export const TYPES = {
  ADD_SEMESTER: 'addsemester',
  EDIT_SEMESTER: 'editsemester',
  DELETE_SEMESTER: 'deletesemester',
  ADD_COURSE: 'addcourse',
  EDIT_COURSE: 'editcourse',
  DELETE_COURSE: 'deletecourse',
};

function getNewSemesterId(data) {
  let semesterIds = [];
  if (data.length === 0) return 1;
  data.forEach(item => {
    semesterIds.push(item.semesterId);
  });

  return Math.max(...semesterIds) + 1;
}

function getNewCourseId(data, semesterId) {
  let courseIds = [];

  let semester = data.find(item => item.semesterId === semesterId);
  if (semester.result.length === 0) return 1;
  semester.result.forEach(course => {
    courseIds.push(course.courseId);
  });

  return Math.max(...courseIds) + 1;
}

function reducer(state, action) {
  let newSemesterId;
  let newSemesterName;
  let newState;
  let semester;
  let course;
  // let newResult;
  let newCourseId;
  //let newCourseName;
  //let newCourse;

  switch (action.type) {
    case TYPES.ADD_SEMESTER:
      newSemesterId = getNewSemesterId(state);
      newState = [...state];
      newSemesterName = {
        semesterId: newSemesterId,
        semesterName: 'semester' + newSemesterId,
        result: [{ courseId: 1, courseName: 'Course', grade: 5, unit: 0 }],
      };

      newState = [...state, newSemesterName];

      return saveLocal(newState);

    case TYPES.EDIT_SEMESTER:
      newState = [...state];
      semester = newState.find(
        item => item.semesterId === action.value.semesterId
      );
      semester.semesterName = action.value.semesterName;
      return newState;

    case TYPES.DELETE_SEMESTER:
      newState = [...state];
      semester = newState.filter(
        item => item.semesterId !== action.value.semesterId
      );
      return saveLocal(semester);
    case TYPES.ADD_COURSE:
      newCourseId = getNewCourseId(state, action.value.semesterId);
      newState = [...state];
      semester = state.find(
        item => item.semesterId === action.value.semesterId
      );

      semester.result.push({
        courseId: newCourseId,
        courseName: `Course ${newCourseId}`,
        grade: 5,
        unit: 1,
      });
      return saveLocal(newState);
    case TYPES.EDIT_COURSE:
      newState = [...state];
      semester = newState.find(
        item => item.semesterId === action.value.semesterId
      );
      course = semester.result.find(
        item => item.courseId === action.value.courseId
      );
      course.courseName = action.value.courseName;
      course.grade = action.value.grade;
      course.unit = action.value.unit;
      return saveLocal(newState);

    case TYPES.DELETE_COURSE:
      newState = [...state];

      semester = newState.find(
        item => item.semesterId === action.value.semesterId
      );
      semester.result = semester.result.filter(
        item => item.courseId !== action.value.courseId
      );

      return saveLocal(newState);
    default:
      return state;
  }
}
export function getLocal() {
  return JSON.parse(localStorage.getItem('result'));
}
function saveLocal(data) {
  localStorage.setItem('result', JSON.stringify(data));
  return getLocal();
}
export default reducer;
