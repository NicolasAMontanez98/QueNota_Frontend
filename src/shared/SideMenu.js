import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "../styles/burguerStyles.css";
import { logoutTeacher } from "../store/actions/teacherAction";
import { logOutStudent } from "../store/actions/studentAction";
import { motion } from "framer-motion";

export default function SideMenu() {
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const dispatch = useDispatch();
  const history = useHistory();

  const showSettings = (e) => {
    e.preventDefault();
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    if (studentInfo) {
      dispatch(logOutStudent());
      history.push("/");
    } else if (teacherInfo) {
      dispatch(logoutTeacher());
      history.push("/");
    }
  };

  const goHome = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const goHomeworks = (e) => {
    e.preventDefault();
    history.push("/tareas");
  };

  const goProfile = (e) => {
    e.preventDefault();
    if (studentInfo) {
      history.push("/perfil-estudiante");
    } else if (teacherInfo) {
      history.push("/perfil-profesor");
    }
  };

  const goCourses = (e) => {
    e.preventDefault();
    history.push("/cursos");
  };

  return (
    <Menu>
      <motion.button
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.7 }}
        dragConstraints={{ left: -100, right: 100 }}
        id="home"
        className="bm-item btn btn-dark text-decoration-none text-center"
        onClick={goHome}
        title="Inicio"
      >
        <img
          src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603615964/About_mcswrd.svg"
          width="52"
          height="45"
        />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.7 }}
        dragConstraints={{ left: -100, right: 100 }}
        id="about"
        className="bm-item btn btn-dark text-decoration-none text-center"
        title="Tareas"
        onClick={goHomeworks}
      >
        <img
          src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603616181/Test_efihwp.svg"
          width="52"
          height="45"
        />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.7 }}
        dragConstraints={{ left: -100, right: 100 }}
        id="contact"
        className="bm-item btn btn-dark btn-lg text-decoration-none pl-3"
        title="Cursos"
        onClick={goCourses}
      >
        <img
          src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603616277/Discussion_Class_sx6yun.png"
          width="52"
          height="45"
        />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.7 }}
        dragConstraints={{ left: -100, right: 100 }}
        className="bm-item btn btn-dark btn-lg text-decoration-none pl-3"
        onClick={goProfile}
        title="Perfil"
      >
        <img
          src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603616632/Data_User_cm0xzb.png"
          width="52"
          height="45"
        />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.7 }}
        dragConstraints={{ left: -100, right: 100 }}
        className="bm-item btn btn-dark btn-lg text-decoration-none pl-3"
        onClick={handleLogOut}
        title="Salir"
      >
        <img
          src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603615989/Log_Out_lmesnu.svg"
          width="52"
          height="45"
        />
      </motion.button>
    </Menu>
  );
}
