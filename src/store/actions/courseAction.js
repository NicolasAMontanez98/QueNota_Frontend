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
import axios from "axios";
import Swal from "sweetalert2";

const addCourse = (teacher, subject, title) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_SAVE_REQUEST });
    const { data } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "course/add",
      { teacher, subject, title }
    );
    dispatch({ type: COURSE_SAVE_SUCCESS, payload: data });
    Swal.fire({
      title: `${data.message}`,
      icon: "success",
    });
  } catch (error) {
    dispatch({ type: COURSE_SAVE_FAILURE, payload: error });
    Swal.fire({
      title: `${error.message}`,
      icon: "warning",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    });
  }
};

const listCourse = (teacher, subject, title) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST });
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_URL + "course/"
    );
    dispatch({ type: COURSE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: COURSE_LIST_FAILURE, payload: error });
  }
};

const deleteCourse = (courseId) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DELETE_REQUEST });
    const { data } = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "course/delete/" + courseId
    );
    dispatch({ type: COURSE_UPDATE_SUCCESS, payload: data });
    Swal.fire({
      title: `${data.message}`,
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  } catch (error) {
    dispatch({ type: COURSE_DELETE_FAILURE, payload: error });
    Swal.fire({
      title: `${error.message}`,
      icon: "warning",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    });
  }
};

export { addCourse, deleteCourse };
