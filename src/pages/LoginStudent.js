import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faKey,
  faCog,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Animated } from "react-animated-css";
import { signInStudent } from "../store/actions/studentAction";

export default function LoginStudent() {
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let loading = false;
  let error = false;
  let history = useHistory();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (studentInfo) {
        history.push("/");
      }
    }
    return () => (mounted = false);
  }, [studentInfo]);

  const handleBack = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(signInStudent(email, password));
  };

  return (
    <div className=" d-flex justify-content-center">
      {loading ? (
        <div className="d-flex justify-content-center px-5 py-5 my-5">
          <FontAwesomeIcon className="mt-5 pt-4" icon={faCog} size="7x" spin />
        </div>
      ) : error ? (
        <div className="card d-flex justify-content-center px-5 py-5 mt-5">
          <div className="row">
            <div className="col">
              <FontAwesomeIcon
                className="mt-5 mb-5 pt-4"
                icon={faExclamationTriangle}
                size="10x"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h1>Upps algo salió mal...</h1>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="card bg-white my-5 border-dark"
          style={{ width: "30rem" }}
        >
          <div
            className="card-header border-bottom-0 text-center"
            style={{ background: "#000000" }}
          >
            <Animated
              animationIn="tada"
              animationOut="zoomOutDown"
              animationInDuration={1000}
              animationOutDuration={1000}
              isVisible={true}
            >
              <img
                src="https://res.cloudinary.com/dkrcosw87/image/upload/v1602191828/images/Logo_QueNota_Blanca_fanrkd.png"
                className="mb-2"
                width="200"
                height="110"
                alt="mercashop"
              />
            </Animated>
            <h1 className="h3 mt-3 font-weight-normal text-white">
              Estudiante
            </h1>
          </div>
          <div className="card-body">
            <form
              className="form-signin"
              width="500"
              onSubmit={handleRegister}
              align="left"
            >
              <label htmlFor="inputemail">Correo Electrónico</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-white" id="basic-addon1">
                    <FontAwesomeIcon icon={faUserCircle} />
                  </span>
                </div>
                <input
                  type="email"
                  id="inputEmail"
                  name="email"
                  className="form-control"
                  placeholder="Correo Electrónico"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>
              <label htmlFor="inputemail">Contraseña</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-white" id="basic-addon1">
                    <FontAwesomeIcon icon={faKey} />
                  </span>
                </div>
                <input
                  type="password"
                  id="inputPassword"
                  name="password"
                  className="form-control"
                  placeholder="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="on"
                  required
                ></input>
              </div>
              <div className="row">
                <div className="col">
                  <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit"
                  >
                    Ingresar
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn btn-lg btn-danger btn-block text-decoration-none"
                    onClick={handleBack}
                  >
                    Regresar
                  </button>
                </div>
              </div>
              <Link to="/registro-estudiante" className="text-decoration-none">
                <button className="btn btn-info btn-lg mt-2 btn-block">
                  Registrarse
                </button>
              </Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
