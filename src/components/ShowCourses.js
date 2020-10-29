import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCourse } from "../store/actions/courseAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBook,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function ShowCourses() {
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const dispatch = useDispatch();
  let subject = "";
  let title = "";
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchDataT = async (id) => {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "course/teacher/" + id)
        .then(({ data }) => {
          setCourses(data);
        })
        .catch((err) => console.log(err));
    };
    const fetchDataS = async (id) => {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "course/student/" + id)
        .then(({ data }) => {
          setCourses(data);
        })
        .catch((err) => console.log(err));
    };
    if (teacherInfo) {
      fetchDataT(teacherInfo._id);
    } else {
      fetchDataS(studentInfo._id);
    }
  }, []);

  const handleAddCourse = (e) => {
    Swal.mixin({
      input: "text",
      confirmButtonText: "Next &rarr;",
      showCancelButton: true,
      progressSteps: ["1", "2"],
    })
      .queue([
        {
          title: "Nombre",
          text: "Escriba el Nombre correspondiente al curso:",
        },
        {
          title: "Materia",
          text: "Escriba la materia correspondiente a al curso:",
        },
      ])
      .then((result) => {
        if (result.value) {
          const answers = result.value;
          Swal.fire({
            title: "¡Todo listo!",
            html: `
        Tu curso:
        <br/>
        <strong>Nombre:</strong><pre>${answers[0]}</pre>
        <strong>Materia:</strong><pre>${answers[1]}</pre>
      `,
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(addCourse(teacherInfo._id, answers[1], answers[0]));
              window.location.reload();
            }
          });
        }
      });
  };

  return (
    <div className="card ml-3">
      <div className="card-header bg-dark text-left">
        <h3 className="font-weight-bold mb-0 text-white">
          <FontAwesomeIcon icon={faUsers} className="mr-3" />
          Cursos
        </h3>
      </div>
      <div className="card-body">
        <div className="list-group">
          {courses.map((course, index) => {
            return (
              <Link
                to="/cursos"
                className="list-group-item list-group-item-action text-decoration-none text-dark text-left font-weight-bold"
                key={index}
              >
                <FontAwesomeIcon icon={faBook} className="mr-2" />
                {course.title}
              </Link>
            );
          })}
        </div>
        {teacherInfo && (
          <div className="mt-1">
            <button
              type="button"
              className="btn btn-success rounded-pill btn-block mt-3"
              onClick={handleAddCourse}
            >
              <FontAwesomeIcon icon={faPlusCircle} size="2x" className="mt-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
