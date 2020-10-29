import React from "react";
import { useSelector } from "react-redux";
import NotLogin from "./NotLogin";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import ButtonsHome from "../components/ButtonsHome";
import InfoSummaryTeacher from "../components/InfoSummaryTeacher";
import InfoSummaryStudent from "../components/InfoSummaryStudent";

export default function Home() {
  const studentSignIn = useSelector((state) => state.studentSignIn);
  const { studentInfo } = studentSignIn;
  const teacherSignIn = useSelector((state) => state.teacherSignIn);
  const { teacherInfo } = teacherSignIn;
  let location = useLocation();
  let history = useHistory();
  return (
    <>
      {studentInfo || teacherInfo ? (
        <div className="row ">
          <div className="col-md-9">
            {studentInfo ? (
              <InfoSummaryStudent />
            ) : teacherInfo ? (
              <InfoSummaryTeacher />
            ) : (
              <h1>...</h1>
            )}
          </div>
          <div className="col-md-3 pt-3 pr-5">
            <ButtonsHome />
          </div>
        </div>
      ) : (
        <NotLogin />
      )}
    </>
  );
}
