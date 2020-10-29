import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";
import { listStudents } from "../store/actions/studentAction";
import { motion } from "framer-motion";

export default function ShowStudents({ info }) {
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const [students, setStudents] = useState(info.students);
  const studentsList = useSelector((state) => state.studentsList);
  const { allStudents, loading, error } = studentsList;
  const dispatch = useDispatch();
  const courseId = info.id;
  const studentId = "5f8be308ac4dd74e185f55b9";
  const fuckingStudents = allStudents.map((student) => {
    return JSON.parse(
      "{" +
        '"' +
        student._id +
        '"' +
        ":" +
        '"' +
        student.names +
        " " +
        student.lastNames +
        '"' +
        "}"
    );
  });

  useEffect(() => {
    dispatch(listStudents());
  }, []);

  const addStudent = async (e) => {
    e.preventDefault();
    const { value: id } = await Swal.fire({
      title: "Seleccione un estudiante:",
      input: "select",
      inputOptions: fuckingStudents,
      showClass: {
        popup: "animated rubberBand",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
    if (id) {
      axios
        .post(process.env.REACT_APP_SERVER_URL + "course/add-student", {
          id,
          courseId,
        })
        .then(({ data }) => {
          Swal.fire(`${data.message}`);
          window.location.reload();
        })
        .catch((err) => Swal.fire(`${err}`));
    }
  };

  return (
    <>
      <div className="card d-flex border-danger mt-4" style={{ height: 180 }}>
        <div className="card-header bg-danger text-left font-weight-bold text-white">
          <h4 className="mb-0">Estudiantes</h4>
        </div>
        <div className="card-body overflow-auto">
          {students.length > 0 ? (
            students.map((student, index) => {
              return (
                <motion.a
                  whileHover={{
                    scale: 1.1,
                    fontWeight: "900",
                    color: "#ffffff",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  dragConstraints={{ left: -100, right: 100 }}
                  className="list-group-item list-group-item-action text-decoration-none text-dark text-left"
                  key={index}
                  title={student._id}
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  {student.names}
                </motion.a>
              );
            })
          ) : (
            <div className="mx-3 my-3 pt-3">
              <h5 className="font-weight-bold">Aún no hay estudiantes</h5>
            </div>
          )}
        </div>
      </div>
      {teacherInfo && (
        <div className="text-center mt-2">
          <motion.button
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.7 }}
            dragConstraints={{ left: -100, right: 100 }}
            type="button"
            className="btn btn-danger btn-lg btn-block"
            onClick={(e) => addStudent(e)}
          >
            Agregar estudiante
          </motion.button>
        </div>
      )}
    </>
  );
}
