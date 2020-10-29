import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import Swal from "sweetalert2";
import ModalHomework from "../components/ModalHomework";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { removeHomework } from "../store/actions/homeworkAction";

export default function Homeworks() {
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const [homeworks, sethomeworks] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = (user, id) => {
      if (user === "teacher") {
        axios
          .get(process.env.REACT_APP_SERVER_URL + "homework/" + user + "/" + id)
          .then(({ data }) => {
            sethomeworks(data);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .get(process.env.REACT_APP_SERVER_URL + "student/homeworks/" + id)
          .then(({ data: { homeworks } }) => {
            sethomeworks(homeworks);
          })
          .catch((err) => console.log(err));
      }
    };
    if (teacherInfo) {
      fetchData("teacher", teacherInfo._id);
    }
    if (studentInfo) {
      fetchData("student", studentInfo._id);
    }
  }, []);

  const goHome = (e) => {
    e.preventDefault();
    history.push("/");
  };

  return (
    <div className="card ml-3 mr-3">
      <div className="card-header bg-dark text-left">
        <h1 className="font-weight-bold mb-0 text-white">
          <FontAwesomeIcon icon={faBook} className="mr-3" />
          Tareas
        </h1>
      </div>
      <div className="card-body overflow-auto">
        {homeworks.length === 0 ? (
          <div className="mx-3 mt-4 align-middle">
            <h4 className="font-weight-bold">Genial!! Aún no hay tareas</h4>
            <div className="row">
              <div className="col text-center">
                <img
                  src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603226324/open-peeps_lcb76l.png"
                  width="110"
                  height="144"
                />
                <img
                  src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603227442/open-peeps_1_dvhsbn.png"
                  width="120"
                  height="144"
                />
              </div>
            </div>
            <button className="btn btn-danger mt-3 btn-lg" onClick={goHome}>
              Volver a inicio
            </button>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 mx-3 my-3">
            {homeworks.map((homework, index) => {
              const fechaDeEntrega = new Date(homework.deliveryDate);
              const fechaActual = new Date();
              const id = "homework" + index;
              const target = "#" + "homework" + index;
              const ariaLabelly = "homework" + index + "Label";
              const handleDeleteHomework = (e) => {
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
                    dispatch(removeHomework(homework._id));
                  }
                });
              };
              return (
                <div className="col-md-6" key={index}>
                  <div className="card my-2">
                    <div className="card-header bg-dark">
                      <div className="row">
                        <div className="col-md-10">
                          <h4 className="card-title text-white text-left">
                            <FontAwesomeIcon
                              icon={faBookmark}
                              className="mr-3"
                            />
                            {homework.title}
                          </h4>
                          <h6 className="text-muted text-white text-left">
                            id: {homework._id}
                          </h6>
                        </div>
                        {teacherInfo && (
                          <div className="col-md-2">
                            <motion.button
                              whileHover={{ scale: 1.3 }}
                              whileTap={{ scale: 0.7 }}
                              dragConstraints={{ left: -100, right: 100 }}
                              className="btn btn-danger mr-2 mt-2"
                              onClick={handleDeleteHomework}
                            >
                              <FontAwesomeIcon icon={faTrash} size="2x" />
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <div className="list-group-item bg-white">
                            <h5 className="mb-0">
                              <strong>{homework.subject}</strong>
                            </h5>
                          </div>
                        </div>
                        <div className="col">
                          <div
                            className="list-group-item bg-info text-white"
                            title={homework.course._id}
                          >
                            <h5 className="mb-0">
                              <strong>{homework.course.title}</strong>
                            </h5>
                          </div>
                        </div>
                      </div>
                      <ul className="list-group list-group-flush mt-2">
                        {fechaDeEntrega < fechaActual ? (
                          <li className="list-group-item bg-danger text-white">
                            <strong>{homework.deliveryDate}</strong>
                            <h4>
                              <strong className="font-italic">
                                Tarea vencida
                              </strong>
                            </h4>
                          </li>
                        ) : (
                          <li className="list-group-item bg-success text-white">
                            {/* <Moment className="font-weight-bold" fromNow>
                          {homework.deliveryDate}
                        </Moment> */}
                            <strong>{homework.deliveryDate}</strong>
                            <h4>
                              <strong className="font-italic">
                                Tarea vigente
                              </strong>
                            </h4>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="card-footer">
                      <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.8 }}
                        dragConstraints={{ left: -100, right: 100 }}
                        type="button"
                        className="btn btn-primary btn-lg mt-2 btn-block"
                        data-toggle="modal"
                        data-target={target}
                      >
                        Ver detalle
                      </motion.button>
                    </div>
                  </div>
                  <div
                    className="modal fade"
                    id={id}
                    data-keyboard="true"
                    tabIndex="-1"
                    aria-labelledby={ariaLabelly}
                    aria-hidden="true"
                  >
                    <ModalHomework info={homework} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
