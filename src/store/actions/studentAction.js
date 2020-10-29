import axios from "axios";
import Swal from "sweetalert2";
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
} from "../constants/studentConstants";

const listStudents = () => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_LIST_REQUEST });
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_URL + "student/getAll"
    );
    dispatch({ type: STUDENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: STUDENT_LIST_FAILURE, payload: error });
    Swal.fire({
      title: `${error.message}`,
      icon: "warning",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    });
  }
};

const registerStudent = (
  names,
  lastNames,
  idNumberStudent,
  birthDateStudent,
  namesTutor,
  lastNamesTutor,
  idTypeTutor,
  idNumberTutor,
  birthDateTutor,
  emailStudent,
  emailTutor,
  school,
  pictureProfile,
  password
) => async (dispatch) => {
  dispatch({
    type: STUDENT_REGISTER_REQUEST,
    payload: {
      names,
      lastNames,
      idNumberStudent,
      birthDateStudent,
      namesTutor,
      lastNamesTutor,
      idTypeTutor,
      idNumberTutor,
      birthDateTutor,
      emailStudent,
      emailTutor,
      school,
      pictureProfile,
      password,
    },
  });
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "student/register",
      {
        names,
        lastNames,
        idNumberStudent,
        birthDateStudent,
        namesTutor,
        lastNamesTutor,
        idTypeTutor,
        idNumberTutor,
        birthDateTutor,
        emailStudent,
        emailTutor,
        school,
        pictureProfile,
        password,
      }
    );
    dispatch({ type: STUDENT_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("studentInfo", JSON.stringify(data));
    Swal.fire({
      title: "Hola!!!",
      icon: "success",
      text: "Ingreso exitoso!!!",
    });
  } catch (error) {
    dispatch({ type: STUDENT_REGISTER_FAILURE, payload: error });
    Swal.fire({
      title: `${error.message}`,
      icon: "warning",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    });
  }
};

const signInStudent = (email, password) => async (dispatch) => {
  dispatch({ type: STUDENT_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "student/login",
      { email, password }
    );
    dispatch({ type: STUDENT_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("studentInfo", JSON.stringify(data));
    Swal.fire({
      title: "Hola!!!",
      icon: "success",
      text: "Ingreso exitoso!!!",
    });
  } catch (error) {
    dispatch({ type: STUDENT_SIGNIN_FAILURE, payload: error });
    Swal.fire({
      title: `${error.message}`,
      icon: "warning",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    });
  }
};

const logOutStudent = () => (dispatch) => {
  localStorage.removeItem("studentInfo");
  dispatch({ type: STUDENT_LOGOUT });
};

export { registerStudent, logOutStudent, signInStudent, listStudents };
