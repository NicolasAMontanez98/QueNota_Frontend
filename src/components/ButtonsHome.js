import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

export default function ButtonsHome() {
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const history = useHistory();

  const goHomeworks = (e) => {
    e.preventDefault();
    history.push("/tareas");
  };
  const goCourses = (e) => {
    e.preventDefault();
    history.push("/cursos");
  };
  const goPerfil = (e) => {
    e.preventDefault();
    if (teacherInfo) {
      history.push("/perfil-profesor");
    } else if (studentInfo) {
      history.push("/perfil-estudiante");
    }
  };

  return (
    <div>
      <div className="btn-group-vertical" role="group">
        <motion.button
          whileHover={{ scale: 0.9 }}
          whileTap={{ scale: 0.7 }}
          dragConstraints={{ left: -100, right: 100 }}
          type="button"
          className="btn btn-light bg-dark btn-lg"
          title="Tareas"
          onClick={goHomeworks}
        >
          <img
            className="mx-2 my-2"
            src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603616181/Test_efihwp.svg"
            width="192"
            height="185"
          />
          <br />
          <span className="text-white">Tareas</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 0.9 }}
          whileTap={{ scale: 0.7 }}
          dragConstraints={{ left: -100, right: 100 }}
          type="button"
          className="btn btn-light bg-dark btn-lg"
          title="Cursos"
          onClick={goCourses}
        >
          <img
            className="mx-2 my-2"
            src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603616277/Discussion_Class_sx6yun.png"
            width="192"
            height="185"
          />
          <br />
          <span className="text-white">Cursos</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 0.9 }}
          whileTap={{ scale: 0.7 }}
          dragConstraints={{ left: -100, right: 100 }}
          type="button"
          className="btn btn-light bg-dark btn-lg"
          title="Perfil"
          onClick={goPerfil}
        >
          <img
            src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603616632/Data_User_cm0xzb.png"
            width="192"
            height="185"
          />
          <br />
          <span className="text-white">Perfil</span>
        </motion.button>
      </div>
    </div>
  );
}
