import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

export default function UploadImage({ info }) {
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [idNote, setIdNote] = useState("");

  const readFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => setImage(e.target.result);
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      readFile(e.target.files[0]);
    }
  };

  const handleSaveImage = async (e) => {
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

    if (teacherInfo) {
      axios
        .put(
          process.env.REACT_APP_SERVER_URL + "homework/add-material/" + info,
          {
            title: title,
            material: data,
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
          material: data,
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
    <form onSubmit={handleSaveImage}>
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
      <div className="input-group input-group-lg my-2 pl-5 pr-5">
        <input
          type="file"
          name="file"
          accept="image/*"
          className="custom-file-input form-control-lg pb-5 pt-3 mx-5"
          aria-label="inputFile"
          aria-describedby="inputFile"
          id="customFileLang"
          lang="es"
          onChange={handleImage}
        />
        <label
          className="custom-file-label"
          htmlFor="customFileLang"
          data-browse="Buscar"
        >
          Selecciona un archivo
        </label>
      </div>
      {image && (
        <img
          src={image}
          className="img-thumbnail mx-1 my-1"
          alt="imagen a subir"
          width="200"
          height="200"
        />
      )}
      <div className="px-2 py-1">
        <button type="submit" className="btn btn-block btn-success">
          Subir
        </button>
      </div>
    </form>
  );
}
