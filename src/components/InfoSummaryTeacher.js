import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import VerticalBar from "./VerticalBar";
import PieChart from "./PieChart";

export default function InfoSummaryTeacher() {
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  const [teacher, setTeacher] = useState({});
  const [courses, setCourses] = useState([]);
  const [homeworks, setHomeworks] = useState([]);

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
        .get(process.env.REACT_APP_SERVER_URL + "teacher/" + teacherInfo._id)
        .then(({ data }) => {
          setTeacher(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
      axios
        .get(
          process.env.REACT_APP_SERVER_URL + "course/teacher/" + teacherInfo._id
        )
        .then(({ data }) => {
          setCourses(data);
          console.log(data);
        })
        .catch((err) => console.log(err));
      axios
        .get(
          process.env.REACT_APP_SERVER_URL +
            "homework/teacher/" +
            teacherInfo._id
        )
        .then(({ data }) => {
          setHomeworks(data);
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
          Hola {teacherInfo.names}
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
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-white">
                <h3 className="card-title mb-0 font-weight-bold">Tareas</h3>
              </div>
              <div className="card-body">
                <PieChart info={homeworks} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12"></div>
        </div>
      </div>
      <div className="card-footer"></div>
    </div>
  );
}
