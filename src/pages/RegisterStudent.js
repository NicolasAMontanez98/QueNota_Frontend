import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Animated } from "react-animated-css";
import { Link, useHistory } from "react-router-dom";
import { registerStudent } from "../store/actions/studentAction";
import axios from "axios";

export default function RegisterStudent() {
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [idNumberStudent, setIdNumberStudent] = useState(0);
  const [namesTutor, setNamesTutor] = useState("");
  const [lastNamesTutor, setLastNamesTutor] = useState("");
  const [idTypeTutor, setIdTypeTutor] = useState("");
  const [idNumberTutor, setIdNumberTutor] = useState(0);
  const [emailStudent, setEmailStudent] = useState("");
  const [emailTutor, setEmailTutor] = useState("");
  const [phone, setPhone] = useState(0);
  const [birthDateStudent, setBirthDateStudent] = useState("");
  const [birthDateTutor, setBirthDateTutor] = useState("");
  const [school, setSchool] = useState("");
  let pictureProfile = "";
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (studentInfo) {
        history.push("/");
      }
    }
    return () => (mounted = false);
  }, [studentInfo]);

  function readFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => setImage(e.target.result);
  }

  function handleImage(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      readFile(e.target.files[0]);
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    const dataImage = new FormData();
    dataImage.append("file", file, file.name);

    const { data } = await axios({
      method: "POST",
      baseURL: process.env.REACT_APP_SERVER_URL,
      url: "image",
      data: dataImage,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    pictureProfile = data;

    dispatch(
      registerStudent(
        names,
        lastNames,
        idNumberStudent,
        birthDateStudent,
        namesTutor,
        lastNamesTutor,
        idTypeTutor,
        idNumberTutor,
        birthDateTutor,
        emailStudent,
        emailTutor,
        school,
        pictureProfile,
        password
      )
    );
    history.push("/");
  };

  return (
    <div className="card bg-white my-4 mx-4 border-dark">
      <div
        className="card-header border border-bottom-0"
        style={{ background: "#000000" }}
        align="left"
      >
        <Animated
          animationIn="tada"
          animationOut="zoomOutDown"
          animationInDuration={1000}
          animationOutDuration={1000}
          isVisible={true}
        >
          <img
            src="https://res.cloudinary.com/dkrcosw87/image/upload/v1602191855/images/Logo_inline_QueNota_Blanco_vt9uxl.png"
            className="my-0"
            width="250"
            height="130"
            alt="mercashop"
          />
        </Animated>
      </div>
      <div className="card-body">
        <form onSubmit={handleRegister} align="left">
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="inputNames" className="font-weight-bold">
                Nombres
              </label>
              <input
                type="text"
                className="form-control"
                id="inputNames"
                placeholder="Nombres del tutor"
                onChange={(e) => setNames(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputLastNames" className="font-weight-bold">
                Apellidos
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLastNames"
                placeholder="Apellidos del tutor"
                onChange={(e) => setLastNames(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputNameTutor" className="font-weight-bold">
                Nombre del tutor
              </label>
              <input
                type="text"
                className="form-control"
                id="inputNameTutor"
                placeholder="Nombres del tutor"
                onChange={(e) => setNamesTutor(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="inputLastNamesTutor" className="font-weight-bold">
                Apellidos del tutor
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLastNamesTutor"
                placeholder="Apellidos"
                onChange={(e) => setLastNamesTutor(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-2">
              <label
                htmlFor="inputBirthDateStudent"
                className="font-weight-bold"
              >
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="inputBirthDateStudent"
                onChange={(e) => setBirthDateStudent(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-3">
              <label
                htmlFor="inputIdNumberStudent"
                className="font-weight-bold"
              >
                Identificación
              </label>
              <input
                type="number"
                className="form-control"
                id="inputIdNumberStudent"
                placeholder="Número de Identificación"
                onChange={(e) => setIdNumberStudent(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputBirthdateTutor" className="font-weight-bold">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                id="inputBirthdateTutor"
                onChange={(e) => setBirthDateTutor(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-5">
              <div className="row">
                <div className="col">
                  <label
                    htmlFor="inputIdTypeTutor"
                    className="font-weight-bold"
                  >
                    Tipo de Identificación
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    id="inputIdTypeTutor"
                    defaultValue={"predeterminado"}
                    onChange={(e) => setIdTypeTutor(e.target.value)}
                    required
                  >
                    <option value="predeterminado" disabled>
                      Seleccione una opción
                    </option>
                    <option value="Cedula de ciudadanía">
                      Cedula de ciudadanía
                    </option>
                    <option value="Cedula de extranjería">
                      Cedula de extranjería
                    </option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="col">
                  <label
                    htmlFor="inputIdNumberTutor"
                    className="font-weight-bold"
                  >
                    Número de Identificación
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputIdNumberTutor"
                    placeholder="Número de Id"
                    onChange={(e) => setIdNumberTutor(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmailStudent" className="font-weight-bold">
                Correo Electrónico Estudiante
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmailStudent"
                placeholder="Correo Electrónico Estudiante"
                onChange={(e) => setEmailStudent(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmailTeacher" className="font-weight-bold">
                Correo Electrónico Tutor
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmailTeacher"
                placeholder="Correo Electrónico Tutor"
                onChange={(e) => setEmailTutor(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputSchool" className="font-weight-bold">
                Institución educativo
              </label>
              <input
                type="text"
                className="form-control"
                id="inputSchool"
                placeholder="Institución educativa"
                onChange={(e) => setSchool(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPhone" className="font-weight-bold">
                Teléfono
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPhone"
                placeholder="000 000 0000"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputPassword" className="font-weight-bold">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Contraseña"
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="inputProductImage" className="font-weight-bolder">
              Foto de perfil
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                name="file"
                id="inputProductImage"
                aria-describedby="inputProductImageA"
                accept="image/*"
                onChange={handleImage}
                required
              />
              <label className="custom-file-label" htmlFor="inputProductImage">
                Escoja una imagen
              </label>
            </div>
            {image && (
              <img
                src={image}
                className="img-thumbnail mx-1 my-1"
                alt="imagen a subir"
                width="250"
                height="250"
              />
            )}
          </div>
          <div className="row">
            <div className="col">
              <button
                type="submit"
                className="btn btn-info mt-2 btn-lg btn-block"
              >
                Registrarse
              </button>
            </div>
            <div className="col">
              <Link to="/" className="text-decoration-none">
                <button className="btn btn-danger mt-2 btn-lg btn-block">
                  Cancelar
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
