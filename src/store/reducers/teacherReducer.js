import {
  TEACHER_SIGNIN_REQUEST,
  TEACHER_SIGNIN_SUCCESS,
  TEACHER_SIGNIN_FAILURE,
  TEACHER_REGISTER_REQUEST,
  TEACHER_REGISTER_SUCCESS,
  TEACHER_REGISTER_FAILURE,
  TEACHER_UPDATE_REQUEST,
  TEACHER_UPDATE_SUCCESS,
  TEACHER_UPDATE_FAILURE,
  TEACHER_ISVERIFIED_REQUEST,
  TEACHER_ISVERIFIED_SUCCESS,
  TEACHER_ISVERIFIED_FAILURE,
  TEACHER_LOGOUT,
} from "../constants/teacherConstants";

function teacherSignInReducer(state = {}, action) {
  switch (action.type) {
    case TEACHER_SIGNIN_REQUEST:
      return { loading: true };
    case TEACHER_SIGNIN_SUCCESS:
      return { loading: false, teacherInfo: action.payload };
    case TEACHER_SIGNIN_FAILURE:
      return { loading: false, error: action.payload };
    case TEACHER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function teacherRegisterReducer(state = {}, action) {
  switch (action.type) {
    case TEACHER_REGISTER_REQUEST:
      return { loading: true };
    case TEACHER_REGISTER_SUCCESS:
      return { loading: false, teacherInfo: action.payload };
    case TEACHER_REGISTER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function teacherUpdateReducer(state = {}, action) {
  switch (action.type) {
    case TEACHER_UPDATE_REQUEST:
      return { loading: true };
    case TEACHER_UPDATE_SUCCESS:
      return { loading: false, teacherInfo: action.payload };
    case TEACHER_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function teacherVerifyReducer(state = {}, action) {
  switch (action.type) {
    case TEACHER_ISVERIFIED_REQUEST:
      return { loading: true };
    case TEACHER_ISVERIFIED_SUCCESS:
      return { loading: false, teacherInfo: action.payload };
    case TEACHER_ISVERIFIED_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  teacherSignInReducer,
  teacherRegisterReducer,
  teacherUpdateReducer,
  teacherVerifyReducer,
};
