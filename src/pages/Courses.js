import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse } from "../store/actions/courseAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBook,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { addHomework, removeHomework } from "../store/actions/homeworkAction";
import ShowHomeworks from "../components/ShowHomeworks";
import ShowStudents from "../components/ShowStudents";
import { motion } from "framer-motion";

export default function Courses() {
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const dispatch = useDispatch();
  let subject = "";
  let title = "";
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async (user, id) => {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "course/" + user + "/" + id)
        .then(({ data }) => {
          setCourses(data);
        })
        .catch((err) => console.log(err));
    };
    if (teacherInfo) {
      fetchData("teacher", teacherInfo._id);
    } else {
      fetchData("student", studentInfo._id);
    }
  }, []);

  return (
    <div className="card ml-3 mr-3">
      <div className="card-header bg-dark text-left">
        <h1 className="font-weight-bold mb-0 text-white">
          <FontAwesomeIcon icon={faUsers} className="mr-3" />
          Cursos
        </h1>
      </div>
      <div className="card-body">
        <div className="list-group">
          {courses.map((course, index) => {
            const showCourse = "showCourse" + index;
            const showC = "#showCourse" + index;
            const createdAt = course.createdAt.slice(0, 10);
            const addNewHomework = (e) => {
              e.preventDefault();
              Swal.mixin({
                input: "text",
                confirmButtonText: "Next &rarr;",
                showCancelButton: true,
                progressSteps: ["1", "2", "3", "4", "5", "6"],
              })
                .queue([
                  {
                    title: "Título",
                    text: "Escriba el título de la tarea:",
                  },
                  {
                    title: "Materia",
                    text: "Escriba la materia de la tarea:",
                  },
                  {
                    input: "textarea",
                    title: "Descripción",
                    text: "Escriba la descripción de la tarea:",
                  },
                  {
                    title: "Día",
                    text: "Escriba el día de entrega la tarea:",
                    input: "select",
                    inputOptions: {
                      Dias: {
                        1: "1",
                        2: "2",
                        3: "3",
                        4: "4",
                        5: "5",
                        6: "6",
                        7: "7",
                        8: "8",
                        9: "9",
                        10: "10",
                        11: "11",
                        12: "12",
                        13: "13",
                        14: "14",
                        15: "15",
                        16: "16",
                        17: "17",
                        18: "18",
                        19: "19",
                        20: "20",
                        21: "21",
                        22: "22",
                        23: "23",
                        24: "24",
                        25: "25",
                        26: "26",
                        27: "27",
                        28: "28",
                        29: "29",
                        30: "30",
                        31: "31",
                      },
                    },
                  },
                  {
                    title: "Mes",
                    text: "Escriba el mes de entrega de la tarea:",
                    input: "select",
                    inputOptions: {
                      "01": "enero",
                      "02": "febrero",
                      "03": "marzo",
                      "04": "abril",
                      "05": "mayo",
                      "06": "junio",
                      "07": "julio",
                      "08": "agosto",
                      "09": "septiembre",
                      10: "octubre",
                      11: "noviembre",
                      12: "diciembre",
                    },
                  },
                ])
                .then((result) => {
                  if (result.value) {
                    const answers = result.value;
                    const year = new Date().getFullYear();
                    let date = year + "-" + answers[4] + "-" + answers[3];
                    Swal.fire({
                      title: "¡Todo listo!",
                      html: `
                            <h5><strong>Tu tarea:</strong></h5>
                            <strong>Nombre:</strong><pre>${answers[0]}</pre>
                            <strong>Materia:</strong><pre>${answers[1]}</pre>
                            <strong>Descripción:</strong><pre>${answers[2]}</pre>
                            <strong>Fecha de entrega:</strong><pre>${date}</pre>
                        `,
                      confirmButtonText: "Aceptar",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(
                          addHomework(
                            teacherInfo._id,
                            course._id,
                            answers[0],
                            answers[1],
                            date,
                            answers[2],
                            course.students
                          )
                        );
                      }
                    });
                  }
                });
            };
            const handleDeleteCourse = (e) => {
              Swal.fire({
                title: "¿Quieres borrar este curso?",
                imageUrl:
                  "https://res.cloudinary.com/dkrcosw87/image/upload/v1603428831/gif_de_batman_gviawx.webp",
                imageWidth: 200,
                imageHeight: 150,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Sí",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteCourse(course._id));
                }
              });
            };
            return (
              <div key={index}>
                <h3
                  className="list-group-item list-group-item-action text-decoration-none text-dark text-left font-weight-bold"
                  key={index}
                  type="button"
                  data-toggle="collapse"
                  data-target={showC}
                  aria-expanded="true"
                  aria-controls={showCourse}
                >
                  <FontAwesomeIcon icon={faBook} className="mr-2" size="lg" />
                  {course.title}
                </h3>
                <div
                  className="card my-2 mx-2 border collapse show"
                  id={showCourse}
                  aria-labelledby="headingOne"
                  data-parent={showC}
                >
                  <div className="card-header bg-white">
                    <div className="row">
                      <div className="col-md-8 text-left">
                        <h4 className="font-weight-bold">{course.title}</h4>
                        <p className="text-black-50 mb-0">id: {course._id}</p>
                        <p className="text-muted mb-0">creado el {createdAt}</p>
                      </div>
                      <div className="col-md-4 text-right pr-5">
                        <div className="row">
                          <div className="col-md-10">
                            {/* <div
                              className="alert alert-success text-center font-weight-bold"
                              role="alert"
                            >
                              {course.subject}
                            </div> */}
                          </div>
                          {teacherInfo && (
                            <div className="col-md-2">
                              <motion.button
                                whileHover={{ scale: 1.3 }}
                                whileTap={{ scale: 0.7 }}
                                dragConstraints={{ left: -100, right: 100 }}
                                className="btn btn-danger mr-2"
                                onClick={handleDeleteCourse}
                              >
                                <FontAwesomeIcon icon={faTrash} size="2x" />
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body overflow-auto">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="card d-flex border-info">
                              <div className="card-header bg-info text-left font-weight-bold text-white">
                                <h4 className="mb-0">Información profesor</h4>
                                <p className="text-black-50 mb-0">
                                  id: {course.teacher._id}
                                </p>
                              </div>
                              <div className="card-body">
                                <div className="row text-left">
                                  <div className="col">
                                    <strong>Nombre: </strong>
                                    {course.teacher.names +
                                      " " +
                                      course.teacher.lastNames}
                                  </div>
                                </div>
                                <div className="row text-left">
                                  <div className="col">
                                    <strong>Correo: </strong>
                                    {course.teacher.email}
                                  </div>
                                </div>
                                <div className="row text-left">
                                  <div className="col">
                                    <strong>Telefono: </strong>
                                    {course.teacher.phone}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <ShowStudents
                              info={{
                                id: course._id,
                                students: course.students,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <ShowHomeworks id={course._id} />
                        {teacherInfo && (
                          <div className="text-center my-2">
                            <motion.button
                              whileHover={{ scale: 0.9 }}
                              whileTap={{ scale: 0.7 }}
                              dragConstraints={{ left: -100, right: 100 }}
                              type="button"
                              className="btn btn-success btn-lg btn-block"
                              onClick={(e) => addNewHomework(e)}
                            >
                              Agregar tarea
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
