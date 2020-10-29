import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import UploadImage from "./UploadImage";
import UploadPDF from "./UploadPDF";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function Calificar({ info }) {
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const [qualification, setQualification] = useState(0);
  const [note, setNote] = useState(0);
  const [observations, setObservations] = useState("");
  const [files, setFiles] = useState([]);
  const [idNote, setIdNote] = useState("");

  const aCMSTarget = "#addChooseMaterialSupport" + info._id;
  const aCMSControls = "addChooseMaterialSupport" + info._id;
  const aMSPTarget = "#addMaterialSupportPDF" + info._id;
  const aMSPControls = "addMaterialSupportPDF" + info._id;
  const aMSITarget = "#addMaterialSupportImage" + info._id;
  const aMSIControls = "addMaterialSupportImage" + info._id;
  const aMSTId = "addMaterialSupport" + info._id;
  const aMSTParent = "#addMaterialSupport" + info._id;

  //  course > info.course
  // homework > info.homework
  // student > info.student
  // qualification >
  // observations >
  // isQualified <>
  useEffect(() => {
    const fetchData = async (student, homework) => {
      axios
        .post(process.env.REACT_APP_SERVER_URL + "note/homework/student", {
          homework,
          student,
        })
        .then(({ data }) => {
          if (data[0]) {
            setIdNote(data[0]._id);
            setQualification(data[0].qualification);
            setObservations(data[0].observations);
            setFiles(data[0].files);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchData(info.student, info.homework);
  }, []);

  const handleQualification = (e) => {
    e.preventDefault();
    if (idNote) {
      axios
        .put(process.env.REACT_APP_SERVER_URL + "note/update/" + idNote, {
          qualification: qualification,
          observations: observations,
          isQualified: true,
        })
        .then(({ data }) => {
          Swal.fire(`${data.message}`);
          window.location.reload();
        })
        .catch((err) => {
          Swal.fire(`${err}`);
        });
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          {teacherInfo ? (
            <>
              <label htmlFor="inputNote" className="font-weight-bold text-dark">
                Calificación
              </label>
              <input
                id="inputNote"
                className="form-control"
                type="number"
                placeholder={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
              <button
                className="btn btn-success mt-2 btn-block"
                onClick={handleQualification}
              >
                Subir nota
              </button>
            </>
          ) : (
            <div className="card">
              <div className="card-header bg-white">
                <h5
                  htmlFor="inputNote"
                  className="font-weight-bold text-dark mb-0"
                >
                  Calificación
                </h5>
              </div>
              <div className="card-body text-center">
                <h1 className="font-weight-bold text-dark">{qualification}</h1>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-9">
          {teacherInfo ? (
            <>
              <label
                htmlFor="inputObservations"
                className="font-weight-bold text-dark"
              >
                Observaciones
              </label>
              <textarea
                id="inputObservations"
                className="form-control"
                type="text"
                placeholder={observations}
                onChange={(e) => setObservations(e.target.value)}
              />
            </>
          ) : (
            <div className="card mr-3">
              <div className="card-header bg-white">
                <h5
                  htmlFor="inputObservations"
                  className="card-title font-weight-bold text-dark mb-0"
                >
                  Observaciones
                </h5>
              </div>
              <div className="card-body">
                <p className="card-text text-dark">{observations}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {teacherInfo && (
        <>
          {files.length === 0 ? (
            <div className="card my-1">
              <div className="card-body">
                <h6 className="card-title text-dark mb-0">
                  No hay material de apoyo disponible.
                </h6>
              </div>
            </div>
          ) : (
            <ul className="list-group list-group-flush my-1">
              {files.map((material, index) => {
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
                    className="list-group-item text-decoration-none bg-dark text-white"
                    key={index}
                    href={material.file}
                    target="_blank"
                  >
                    {material.title}
                  </motion.a>
                );
              })}
            </ul>
          )}
        </>
      )}
      {studentInfo && (
        <div className="card bg-white text-white text-left mt-3">
          <div className="card-header bg-white text-dark">
            <h5 className="mb-0 font-weight-bold">Archivos adjuntos:</h5>
          </div>
          <div className="card-body">
            {files.length === 0 ? (
              <>
                <h6 className="card-text text-dark">
                  No hay material de apoyo disponible.
                </h6>
              </>
            ) : (
              <ul className="list-group list-group-flush">
                {files.map((material, index) => {
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
                      className="list-group-item text-decoration-none bg-dark text-white"
                      key={index}
                      href={material.file}
                      target="_blank"
                    >
                      {material.title}
                    </motion.a>
                  );
                })}
              </ul>
            )}
            <div className="row">
              <div className="col">
                <>
                  <motion.button
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 0.8 }}
                    dragConstraints={{ left: -100, right: 100 }}
                    type="button"
                    className="btn btn-block btn-secondary font-weight-bold mt-2"
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
                          <UploadPDF info={idNote} />
                        </div>
                        <div
                          className="card collapse mx-2 my-2 border-0"
                          id={aMSIControls}
                          aria-labelledby="headingThree"
                          data-parent={aMSTParent}
                        >
                          <UploadImage info={idNote} />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
