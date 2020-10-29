import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { addCourse } from "../store/actions/courseAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { motion } from "framer-motion";

export default function ShowHomeworks({ id }) {
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    const fetchData = async (id) => {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "homework/by-course/" + id)
        .then(({ data }) => {
          setHomeworks(data);
        })
        .catch((err) => console.log(err));
    };
    if (homeworks.length === 0) {
      fetchData(id);
    }
  }, []);

  const showHomework = (e, homework) => {
    e.preventDefault();
    Swal.fire({
      title: `<strong>${homework.title}</strong>`,
      html: `
      <div style="text-align:left;">
      <p><strong>Id: </strong>${homework._id}</p>
      <p><strong>Materia: </strong>${homework.subject}</p>
      <p><strong>Descripción: </strong>${homework.description}</p>
      </div>
      `,
      imageUrl:
        "https://res.cloudinary.com/dkrcosw87/image/upload/v1603344453/Book_pen_ookxo9.svg",
      imageWidth: 64,
      imageHeight: 64,
      imageAlt: `${homework.title}`,
    });
  };

  return (
    <div className="card border-success h-100">
      <div className="card-header bg-success text-left font-weight-bold text-white">
        <h4 className="mb-2 mt-3">Tareas</h4>
      </div>
      <div className="card-body">
        {homeworks.length > 0 ? (
          homeworks.map((homework, index) => {
            return (
              <motion.button
                whileHover={{
                  scale: 1.1,
                  textShadow: "0px 0px 8px rgb(255, 255, 255)",
                  fontWeight: "900",
                  color: "#343a40",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                whileTap={{ scale: 0.8 }}
                dragConstraints={{ left: -100, right: 100 }}
                className="list-group-item list-group-item-action text-decoration-none text-dark text-left"
                key={index}
                onClick={(e) => showHomework(e, homework)}
              >
                <FontAwesomeIcon icon={faBookmark} className="mr-2" />
                {homework.title}
              </motion.button>
            );
          })
        ) : (
          <div className="mx-3 mt-4 align-middle">
            <h4 className="font-weight-bold">Genial!! Aún no hay tareas</h4>
            <div className="row">
              <div className="col text-center">
                <img
                  src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603226324/open-peeps_lcb76l.png"
                  width="110"
                  height="144"
                />
                <img
                  src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603227442/open-peeps_1_dvhsbn.png"
                  width="120"
                  height="144"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
