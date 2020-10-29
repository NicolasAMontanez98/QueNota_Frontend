import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBook,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import ShowCourses from "../components/ShowCourses";

export default function ProfileStudent() {
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const [student, setStudent] = useState({});

  useEffect(() => {
    const fetchData = async (id) => {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "student/" + studentInfo._id)
        .then(({ data }) => {
          setStudent(data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  return (
    <div className="row px-5 py-5">
      <div className="col-md-3">
        <ShowCourses />
      </div>
      <div className="col-md-9">
        <div className="card mr-3">
          <div className="card-header bg-dark text-white">
            <div className="row">
              <div className="col-md-3">
                <img
                  src={student.pictureProfile}
                  className="rounded-circle border border-white float-left"
                  alt={studentInfo.names}
                  title={studentInfo.names}
                  width="150"
                  height="150"
                />
              </div>
              <div className="col-md-9 text-left">
                <div className="mt-4">
                  <h3 className="font-weight-bold">
                    {studentInfo.names + " " + studentInfo.lastNames}
                  </h3>
                  <h5 className="font-weight-bold">{studentInfo.email}</h5>
                  <h6 className="text-muted">id: {studentInfo._id}</h6>
                  <h6 className="text-muted">Estudiante</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="card border-bottom-0 rounded-0">
              <div className="card-header bg-white text-left">
                <h4 className="mb-0 font-weight-bold">Información General</h4>
              </div>
              <div className="card-body">
                <div className="row text-left">
                  <div className="col-md-5">
                    <h6>
                      <strong>Institución académica:</strong>
                    </h6>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={student.school}
                      disabled
                    />
                  </div>
                  <div className="col-md-4">
                    <h6>
                      <strong>Número de documento:</strong>
                    </h6>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={student.idNumberStudent}
                      disabled
                    />
                  </div>
                  <div className="col-md-3">
                    <h6>
                      <strong>Fecha de nacimiento:</strong>
                    </h6>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={student.birthDateStudent}
                      disabled
                    />
                  </div>
                </div>
                <div className="card mt-3 px-2 py-2 text-left">
                  <div className="card-header bg-white">
                    <h4 className="card-title mb-0 font-weight-bold">
                      Información del tutor
                    </h4>
                  </div>
                  <div className="card-body">
                    <div className="row text-left mt-2">
                      <div className="col-md-4">
                        <h6>
                          <strong>Nombres:</strong>
                        </h6>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={student.namesTutor}
                          disabled
                        />
                      </div>
                      <div className="col-md-4">
                        <h6>
                          <strong>Apellidos:</strong>
                        </h6>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={student.lastNamesTutor}
                          disabled
                        />
                      </div>
                      <div className="col-md-4">
                        <h6>
                          <strong>Fecha de nacimiento:</strong>
                        </h6>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={student.birthDateTutor}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row text-left mt-2">
                      <div className="col-md-4">
                        <h6>
                          <strong>Tipo de identificación:</strong>
                        </h6>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={student.idTypeTutor}
                          disabled
                        />
                      </div>
                      <div className="col-md-4">
                        <h6>
                          <strong>Número de identificación:</strong>
                        </h6>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={student.idNumberTutor}
                          disabled
                        />
                      </div>
                      <div className="col-md-4">
                        <h6>
                          <strong>Correo del tutor:</strong>
                        </h6>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={student.emailTutor}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
