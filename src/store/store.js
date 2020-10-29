import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  courseListReducer,
  courseDetailReducer,
  courseDeleteReducer,
  courseSaveReducer,
  courseUpdateReducer,
} from "./reducers/courseReducer";
import { homeworkReducer } from "./reducers/homeworkReducer";
import {
  studentsListReducer,
  studentSignInReducer,
  studentRegisterReducer,
  studentUpdateReducer,
  studentVerifyReducer,
} from "./reducers/studentReducer";
import {
  teacherSignInReducer,
  teacherRegisterReducer,
  teacherUpdateReducer,
  teacherVerifyReducer,
} from "./reducers/teacherReducer";

const homeworks = JSON.parse(localStorage.getItem("homeworksList")) || [];
const teacherInfo = JSON.parse(localStorage.getItem("teacherInfo")) || null;
const studentInfo = JSON.parse(localStorage.getItem("studentInfo")) || null;

const initialState = {
  homeworksList: { homeworks },
  studentSignIn: { studentInfo },
  studentRegister: { studentInfo },
  teacherSignIn: { teacherInfo },
  teacherRegister: { teacherInfo },
};

const rootReducer = combineReducers({
  studentsList: studentsListReducer,
  homeworksList: homeworkReducer,
  courseList: courseListReducer,
  courseDetail: courseDetailReducer,
  courseDelete: courseDeleteReducer,
  courseSave: courseSaveReducer,
  courseUpdate: courseUpdateReducer,
  studentSignIn: studentSignInReducer,
  studentRegister: studentRegisterReducer,
  studentUpdate: studentUpdateReducer,
  studentVerify: studentVerifyReducer,
  teacherSignIn: teacherSignInReducer,
  teacherRegister: teacherRegisterReducer,
  teacherUpdate: teacherUpdateReducer,
  teacherVerify: teacherVerifyReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOL_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
