import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAILURE,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAILURE,
  COURSE_SAVE_REQUEST,
  COURSE_SAVE_SUCCESS,
  COURSE_SAVE_FAILURE,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAILURE,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAILURE,
} from "../constants/courseConstants";

function courseListReducer(state = { courses: [] }, action) {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return { loading: true, courses: [] };
    case COURSE_LIST_SUCCESS:
      return { loading: false, courses: action.payload };
    case COURSE_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function courseDetailReducer(state = { course: {} }, action) {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return { loading: true };
    case COURSE_DETAILS_SUCCESS:
      return { loading: false, homework: action.payload };
    case COURSE_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function courseDeleteReducer(state = { course: {} }, action) {
  switch (action.type) {
    case COURSE_DELETE_REQUEST:
      return { loading: true };
    case COURSE_DELETE_SUCCESS:
      return { loading: false, success: true, homework: action.payload };
    case COURSE_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function courseSaveReducer(state = { course: {} }, action) {
  switch (action.type) {
    case COURSE_SAVE_REQUEST:
      return { loading: true };
    case COURSE_SAVE_SUCCESS:
      return { loading: false, homework: action.payload, success: true };
    case COURSE_SAVE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function courseUpdateReducer(state = { course: {} }, action) {
  switch (action.type) {
    case COURSE_UPDATE_REQUEST:
      return { loading: true };
    case COURSE_UPDATE_SUCCESS:
      return { loading: false, homework: action.payload, success: true };
    case COURSE_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  courseListReducer,
  courseDetailReducer,
  courseDeleteReducer,
  courseSaveReducer,
  courseUpdateReducer,
};
