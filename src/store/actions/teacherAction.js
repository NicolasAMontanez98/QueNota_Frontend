import axios from "axios";
import Swal from "sweetalert2";
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

const registerTeacher = (
  names,
  lastNames,
  idType,
  idNumber,
  birthDate,
  phone,
  email,
  pictureProfile,
  password
) => async (dispatch) => {
  dispatch({
    type: TEACHER_REGISTER_REQUEST,
    payload: {
      names,
      lastNames,
      idType,
      idNumber,
      birthDate,
      phone,
      email,
      pictureProfile,
      password,
    },
  });
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "teacher/register",
      {
        names,
        lastNames,
        idType,
        idNumber,
        birthDate,
        phone,
        email,
        pictureProfile,
        password,
      }
    );
    dispatch({ type: TEACHER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("teacherInfo", JSON.stringify(data));
    Swal.fire({
      title: "Hola!!!",
      icon: "success",
      text: "Ingreso exitoso!!!",
    });
  } catch (error) {
    dispatch({ type: TEACHER_REGISTER_FAILURE, payload: error });
    Swal.fire({
      title: `${error.message}`,
      icon: "warning",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    });
  }
};

const signInTeacher = (email, password) => async (dispatch) => {
  dispatch({ type: TEACHER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "teacher/login",
      { email, password }
    );
    dispatch({ type: TEACHER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("teacherInfo", JSON.stringify(data));
    Swal.fire({
      title: "Hola!!!",
      icon: "success",
      text: "Ingreso exitoso!!!",
    });
  } catch (error) {
    dispatch({ type: TEACHER_SIGNIN_FAILURE, payload: error });
    Swal.fire({
      title: `${error.message}`,
      icon: "warning",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    });
  }
};

const logoutTeacher = () => (dispatch) => {
  localStorage.removeItem("teacherInfo");
  dispatch({ type: TEACHER_LOGOUT });
};

export { registerTeacher, signInTeacher, logoutTeacher };
