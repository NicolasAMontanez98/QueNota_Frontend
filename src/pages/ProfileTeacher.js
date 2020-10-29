import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBook,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { addCourse } from "../store/actions/courseAction";
import ShowCourses from "../components/ShowCourses";

export default function ProfileTeacher() {
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const [teacher, setTeacher] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async (id) => {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "teacher/" + teacherInfo._id)
        .then(({ data }) => {
          setTeacher(data);
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
                  src={teacher.pictureProfile}
                  className="rounded-circle border border-white float-left"
                  alt={teacherInfo.names}
                  title={teacherInfo.names}
                  width="150"
                  height="150"
                />
              </div>
              <div className="col-md-9 text-left">
                <div className="mt-4">
                  <h3 className="font-weight-bold">
                    {teacherInfo.names + " " + teacherInfo.lastNames}
                  </h3>
                  <h5 className="font-weight-bold">{teacherInfo.email}</h5>
                  <h6 className="text-muted">id: {teacherInfo._id}</h6>
                  <h6 className="text-muted">Profesor</h6>
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
                      <strong>Tipo de documento:</strong>
                    </h6>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={teacher.idType}
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
                      placeholder={teacher.idNumber}
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
                      placeholder={teacher.birthDate}
                      disabled
                    />
                  </div>
                </div>
                <div className="row text-left mt-2">
                  <div className="col-md-5">
                    <h6>
                      <strong>Teléfono:</strong>
                    </h6>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={teacher.phone}
                      disabled
                    />
                  </div>
                  <div className="col-md-4">
                    <h6>
                      <strong>Correo verificado:</strong>
                    </h6>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={teacher.isVerified ? "Sí" : "No"}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="card border rounded-0">
              <div className="card-header bg-white text-left">
                <h4 className="mb-0 font-weight-bold">Notas</h4>
              </div>
              <div className="card-body"></div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
