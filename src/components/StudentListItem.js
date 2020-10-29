import React, { useEffect, useState } from "react";
import axios from "axios";
import Calificar from "./Calificar";

export default function StudentListItem({ info }) {
  const [student, setStudent] = useState({});
  useEffect(() => {
    const fetchData = async (id) => {
      axios
        .get(process.env.REACT_APP_SERVER_URL + "student/detail/" + id)
        .then(({ data }) => {
          setStudent(data);
        })
        .catch((err) => console.log(err));
    };
    fetchData(info.student);
  }, []);

  return (
    <div className="card my-1">
      <div className="card-header">
        <h6 className="text-dark font-weight-bold mb-0">
          {student.names + " " + student.lastNames}
        </h6>
      </div>
      <div className="card-body">
        <div className="row"></div>
        <Calificar
          info={{
            student: info.student,
            homework: info.idHomework,
            course: info.course,
          }}
        />
      </div>
    </div>
  );
}
