import {
  STUDENT_SIGNIN_REQUEST,
  STUDENT_SIGNIN_SUCCESS,
  STUDENT_SIGNIN_FAILURE,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_REGISTER_FAILURE,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAILURE,
  STUDENT_ISVERIFIED_REQUEST,
  STUDENT_ISVERIFIED_SUCCESS,
  STUDENT_ISVERIFIED_FAILURE,
  STUDENT_LOGOUT,
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_FAILURE,
} from "../constants/studentConstants.js";

function studentsListReducer(state = { allStudents: [] }, action) {
  switch (action.type) {
    case "STUDENT_LIST_REQUEST":
      return { loading: true, allStudents: [] };
    case "STUDENT_LIST_SUCCESS":
      return { loading: false, allStudents: action.payload };
    case "STUDENT_LIST_FAILURE":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function studentSignInReducer(state = {}, action) {
  switch (action.type) {
    case STUDENT_SIGNIN_REQUEST:
      return { loading: true };
    case STUDENT_SIGNIN_SUCCESS:
      return { loading: false, studentInfo: action.payload };
    case STUDENT_SIGNIN_FAILURE:
      return { loading: false, error: action.payload };
    case STUDENT_LOGOUT:
      return {};
    default:
      return state;
  }
}

function studentRegisterReducer(state = {}, action) {
  switch (action.type) {
    case STUDENT_REGISTER_REQUEST:
      return { loading: true };
    case STUDENT_REGISTER_SUCCESS:
      return { loading: false, studentInfo: action.payload };
    case STUDENT_REGISTER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function studentUpdateReducer(state = {}, action) {
  switch (action.type) {
    case STUDENT_UPDATE_REQUEST:
      return { loading: true };
    case STUDENT_UPDATE_SUCCESS:
      return { loading: false, studentInfo: action.payload };
    case STUDENT_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function studentVerifyReducer(state = {}, action) {
  switch (action.type) {
    case STUDENT_ISVERIFIED_REQUEST:
      return { loading: true };
    case STUDENT_ISVERIFIED_SUCCESS:
      return { loading: false, studentInfo: action.payload };
    case STUDENT_ISVERIFIED_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  studentsListReducer,
  studentSignInReducer,
  studentRegisterReducer,
  studentUpdateReducer,
  studentVerifyReducer,
};
