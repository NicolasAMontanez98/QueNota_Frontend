import axios from "axios";
import Swal from "sweetalert2";
import { HOMEWORK_ADD, HOMEWORK_REMOVE } from "../constants/homeworkConstants";

const addHomework = (
  teacher,
  course,
  title,
  subject,
  deliveryDate,
  description,
  students
) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(
      process.env.REACT_APP_SERVER_URL + "homework/add",
      { teacher, course, title, subject, deliveryDate, description }
    );
    if (students.length > 0) {
      students.map((student) => {
        axios.post(process.env.REACT_APP_SERVER_URL + "note/add", {
          course,
          homework: data.data._id,
          student: student._id,
        });
      });
    }
    dispatch({ type: HOMEWORK_ADD, payload: { data } });
    Swal.fire({
      title: "Tarea agregada!!!",
      icon: "success",
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Genial!',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  } catch (error) {
    Swal.fire({
      title: `${error.message}`,
      icon: "warning",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    });
  }
};

const removeHomework = (homeworkId) => async (dispatch, getState) => {
  try {
    dispatch({ type: HOMEWORK_REMOVE });
    const { data } = await axios.delete(
      process.env.REACT_APP_SERVER_URL + "homework/delete/" + homeworkId
    );
    Swal.fire({
      title: `${data.message}`,
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  } catch (error) {
    Swal.fire({
      title: `${error.message}`,
      icon: "warning",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    });
  }
};

export { addHomework, removeHomework };
