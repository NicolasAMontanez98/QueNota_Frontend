import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import VerticalBar from "./VerticalBar";
import PieChart from "./PieChart";
import { motion } from "framer-motion";

export default function InfoSummaryStudent() {
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const [student, setStudent] = useState({});
  const [courses, setCourses] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [notes, setNotes] = useState([]);

  const dataDoughnut = {
    labels: ["Red", "Green", "Yellow"],
    datasets: [
      {
        data: [25, 50, 250],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#ED2642", "#2659ED", "#ED9526"],
      },
    ],
  };

  useEffect(() => {
    const fetchData = async (id) => {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "student/" + studentInfo._id)
        .then(({ data }) => {
          setStudent(data);
          setHomeworks(data.homeworks);
          console.log(data);
        })
        .catch((err) => console.log(err));
      axios
        .get(
          process.env.REACT_APP_SERVER_URL + "course/student/" + studentInfo._id
        )
        .then(({ data }) => {
          setCourses(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
      axios
        .get(
          process.env.REACT_APP_SERVER_URL + "note/student/" + studentInfo._id
        )
        .then(({ data }) => {
          setNotes(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);
  return (
    <div className="card ml-3 mr-0 my-3">
      <div className="card-header">
        <h1 className="card-title mb-0 font-weight-bold">
          Hola {studentInfo.names}
        </h1>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="card mt-1">
              <div className="card-header bg-white">
                <h3 className="card-title mb-0 font-weight-bold">Cursos</h3>
              </div>
              <div className="card-body">
                <VerticalBar info={courses} />
              </div>
            </div>
            <div className="card mt-1">
              <div className="card-header bg-white">
                <h3 className="card-title mb-0 font-weight-bold">Tareas</h3>
              </div>
              <div className="card-body">
                {/* <PieChart info={homeworks} /> */}
                <h1 className="card-title mb-0 font-weight-bold">
                  {homeworks.length} vigentes
                </h1>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-white">
                <h3 className="card-title mb-0 font-weight-bold">Notas</h3>
              </div>
              <div className="card-body">
                {/* <PieChart info={homeworks} /> */}
                <ul className="list-group list-group-flush my-1">
                  {notes.map((note, index) => {
                    return (
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                          textShadow: "0px 0px 8px rgb(255, 255, 255)",
                          fontWeight: "900",
                          color: "#343a40",
                        }}
                        whileTap={{ scale: 0.8 }}
                        dragConstraints={{ left: -100, right: 100 }}
                        className="card list-group-item text-decoration-none bg-white text-dark text-left"
                        key={index}
                      >
                        <div className="card-header bg-white">
                          {note.isQualified ? (
                            <h5 className="mb-0 font-weight-bold">
                              Calificado
                            </h5>
                          ) : (
                            <h5 className="mb-0 font-weight-bold">Pendiente</h5>
                          )}
                        </div>
                        <div className="card-body">
                          <strong>Calificación:</strong> {note.qualification}
                        </div>
                      </motion.div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer"></div>
    </div>
  );
}
