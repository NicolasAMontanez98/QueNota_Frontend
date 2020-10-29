import React, { useState } from "react";
import { useSelector } from "react-redux";
import firebase from "firebase";
import Swal from "sweetalert2";
import axios from "axios";

export default function UploadPDF({ info }) {
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const [uploadValue, setUploadValue] = useState(0);
  const [pdf, setPdf] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();
    const storageRef = firebase
      .storage()
      .ref(`/material_de_apoyo/${file.name}`);
    const task = storageRef.put(file);

    task.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadValue(percentage);
      },
      (err) => {
        Swal.fire(`${err}`);
      },
      () => {
        storageRef.getDownloadURL().then((url) => {
          if (teacherInfo) {
            axios
              .put(
                process.env.REACT_APP_SERVER_URL +
                  "homework/add-material/" +
                  info,
                {
                  title: title,
                  material: url,
                }
              )
              .then(({ data }) => {
                Swal.fire(`${data.message}`);
                window.location.reload();
              })
              .catch((err) => {
                Swal.fire(`${err}`);
              });
          } else if (studentInfo) {
            axios
              .post(process.env.REACT_APP_SERVER_URL + "note/addFile/" + info, {
                title: title,
                material: url,
              })
              .then(({ data }) => {
                Swal.fire(`${data.message}`);
                window.location.reload();
              })
              .catch((err) => {
                Swal.fire(`${err}`);
              });
          }
        });
      }
    );
  };

  return (
    <form className="py-1" onSubmit={handleUpload}>
      <div className="form-group my-2">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del archivo"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="invalid-feedback">
          Por favor escribe el nombre del archivo.
        </div>
      </div>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow={uploadValue}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div className="custom-file my-2 pl-5 pr-5">
        <input
          type="file"
          className="custom-file-input form-control-lg pb-5 pt-3 mx-5"
          aria-label="inputFile"
          aria-describedby="inputFile"
          id="customFileLang"
          lang="es"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {!file ? (
          <label
            className="custom-file-label"
            htmlFor="customFileLang"
            data-browse="Buscar"
          >
            Selecciona un archivo
          </label>
        ) : (
          <label
            className="custom-file-label"
            htmlFor="customFileLang"
            data-browse="Buscar"
          >
            {file.name}
          </label>
        )}
      </div>
      <div className="px-2">
        <button type="submit" className="btn btn-block btn-success">
          Subir
        </button>
      </div>
    </form>
  );
}
