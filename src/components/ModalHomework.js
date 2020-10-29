import React from "react";
import { useSelector } from "react-redux";
import StudentListItem from "../components/StudentListItem";
import UploadPDF from "../components/UploadPDF";
import UploadImage from "../components/UploadImage";
import { motion } from "framer-motion";
import Calificar from "./Calificar";

export default function ModalHomework({ info }) {
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const aCMSTarget = "#addChooseMaterialSupport" + info._id;
  const aCMSControls = "addChooseMaterialSupport" + info._id;
  const aMSPTarget = "#addMaterialSupportPDF" + info._id;
  const aMSPControls = "addMaterialSupportPDF" + info._id;
  const aMSITarget = "#addMaterialSupportImage" + info._id;
  const aMSIControls = "addMaterialSupportImage" + info._id;
  const aMSTId = "addMaterialSupport" + info._id;
  const aMSTParent = "#addMaterialSupport" + info._id;

  return (
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header bg-info">
          <h5 className="modal-title text-white mb-0" id="staticBackdropLabel">
            <strong>{info.title}</strong>
          </h5>
          <br />
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true" className="text-white">
              &times;
            </span>
          </button>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-6">
              <div className="card text-white bg-dark">
                <div className="card-header text-left">
                  <h5 className="mb-0">Profesor:</h5>
                </div>
                <div className="card-body text-left">
                  <span className="card-text text-muted">
                    <strong>Id: </strong>
                    {info.teacher._id}
                  </span>
                  <br />
                  <span className="card-text">
                    <strong>Nombre: </strong>
                    {info.teacher.names + " " + info.teacher.lastNames}
                  </span>
                  <br />
                  <span className="card-text">
                    <strong>Email: </strong>
                    {info.teacher.email}
                  </span>
                  <br />
                  <span className="card-text">
                    <strong>Teléfono: </strong>
                    {info.teacher.phone}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card text-white bg-dark">
                <div className="card-header text-left">
                  <h5 className="mb-0">Curso:</h5>
                </div>
                <div className="card-body text-left">
                  <span className="card-text text-muted">
                    <strong>Id: </strong>
                    {info.course._id}
                  </span>
                  <br />
                  <span className="card-text">
                    <strong>Nombre: </strong>
                    {info.course.title}
                  </span>
                  <br />
                  <span className="card-text">
                    <strong>Total de estudiantes: </strong>
                    {info.course.students.length}
                  </span>
                  <br />
                  <span className="card-text">
                    <strong>Materia: </strong>
                    {info.course.subject}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card bg-secondary text-white text-left mt-3">
                <div className="card-header">
                  <h5 className="mb-0">Descripción:</h5>
                </div>
                <div className="card-body text-left">
                  <p className="card-text">{info.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card bg-secondary text-white text-left mt-3">
                <div className="card-header">
                  <h5 className="mb-0">Material de apoyo:</h5>
                </div>
                <div className="card-body text-left">
                  {info.supportMaterial.length === 0 ? (
                    <>
                      <h6 className="card-text">
                        No hay material de apoyo disponible.
                      </h6>
                    </>
                  ) : (
                    <>
                      <ul className="list-group list-group-flush">
                        {info.supportMaterial.map((material, index) => {
                          return (
                            <motion.a
                              whileHover={{
                                scale: 1.1,
                                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                                fontWeight: "900",
                                color: "#343a40",
                              }}
                              whileTap={{ scale: 0.8 }}
                              dragConstraints={{ left: -100, right: 100 }}
                              className="list-group-item text-decoration-none text-dark"
                              key={index}
                              href={material.file}
                              target="_blank"
                            >
                              {material.title}
                            </motion.a>
                          );
                        })}
                      </ul>
                    </>
                  )}
                  {teacherInfo && (
                    <>
                      <motion.button
                        whileHover={{ scale: 0.9 }}
                        whileTap={{ scale: 0.8 }}
                        dragConstraints={{ left: -100, right: 100 }}
                        type="button"
                        className="btn btn-block btn-dark font-weight-bold mt-2"
                        data-toggle="collapse"
                        data-target={aCMSTarget}
                        aria-expanded="false"
                        aria-controls={aCMSControls}
                      >
                        Agregar
                      </motion.button>
                      <div
                        className="card my-2 collapse"
                        id={aCMSControls}
                        aria-labelledby="headingOne"
                        data-parent={aCMSTarget}
                      >
                        <div className="card-body">
                          <div className="row">
                            <div className="col">
                              <motion.button
                                className="btn btn-block btn-info"
                                whileHover={{ scale: 0.9 }}
                                whileTap={{ scale: 0.8 }}
                                dragConstraints={{ left: -100, right: 100 }}
                                data-toggle="collapse"
                                data-target={aMSPTarget}
                                aria-expanded="false"
                                aria-controls={aMSPControls}
                              >
                                Archivo
                              </motion.button>
                            </div>
                            <div className="col">
                              <motion.button
                                className="btn btn-block btn-info"
                                whileHover={{ scale: 0.9 }}
                                whileTap={{ scale: 0.8 }}
                                dragConstraints={{ left: -100, right: 100 }}
                                data-toggle="collapse"
                                data-target={aMSITarget}
                                aria-expanded="false"
                                aria-controls={aMSIControls}
                              >
                                Imagen
                              </motion.button>
                            </div>
                          </div>
                          <div
                            className="row accordion justify-content-center"
                            id={aMSTId}
                          >
                            <div
                              className="card collapse mx-2 my-2 border-0"
                              id={aMSPControls}
                              aria-labelledby="headingTwo"
                              data-parent={aMSTParent}
                            >
                              <UploadPDF info={info._id} />
                            </div>
                            <div
                              className="card collapse mx-2 my-2 border-0"
                              id={aMSIControls}
                              aria-labelledby="headingThree"
                              data-parent={aMSTParent}
                            >
                              <UploadImage info={info._id} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div
                className="card bg-dark text-white text-left mt-3"
                style={{ height: 380 }}
              >
                <div className="card-header">
                  <h5 className="mb-0">Estudiantes:</h5>
                </div>
                <div className="card-body text-left overflow-auto">
                  {info.course.students.length === 0 ? (
                    <h6 className="card-text">No hay estudiantes.</h6>
                  ) : (
                    <div>
                      {teacherInfo ? (
                        <div>
                          {info.course.students.map((student, index) => {
                            return (
                              <StudentListItem
                                info={{
                                  student: student._id,
                                  idHomework: info._id,
                                  course: info.course._id,
                                }}
                                key={index}
                              />
                            );
                          })}
                        </div>
                      ) : (
                        <div>
                          <Calificar
                            info={{
                              student: studentInfo._id,
                              homework: info._id,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
