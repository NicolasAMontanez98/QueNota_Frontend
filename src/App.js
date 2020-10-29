import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import Header from "./shared/Header";
import SideMenu from "./shared/SideMenu";
import Home from "./pages/Home";
import LoginStudent from "./pages/LoginStudent";
import LoginTeacher from "./pages/LoginTeacher";
import AddHomework from "./components/AddHomework";
import RegisterStudent from "./pages/RegisterStudent";
import RegisterTeacher from "./pages/RegisterTeacher";
import ProfileTeacher from "./pages/ProfileTeacher";
import ProfileStudent from "./pages/ProfileStudent";
import Courses from "./pages/Courses";
import Homeworks from "./pages/Homeworks";

function App() {
  let location = useLocation();
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  const currentPath = (path) => {
    if (
      path === "/login-estudiante" ||
      path === "/login-profesor" ||
      path === "/registro-estudiante" ||
      path === "/registro-profesor"
    ) {
      return false;
    }
    return true;
  };

  return (
    <div id="App" styles={{ fontFamily: "sans-serif", height: "100vh" }}>
      {currentPath(path) ? (
        <>
          <SideMenu pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap" style={{ textAlign: "center", overflow: "auto" }}>
            <img
              src="https://res.cloudinary.com/dkrcosw87/image/upload/v1602191843/images/Logo_inline_QueNota_Negro_ukgsoa.png"
              width="200"
              height="100"
              alt="Que Nota!"
              title="Que Nota!"
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/agregar-tarea" component={AddHomework} />
              <Route exact path="/perfil-profesor" component={ProfileTeacher} />
              <Route
                exact
                path="/perfil-estudiante"
                component={ProfileStudent}
              />
              <Route exact path="/cursos" component={Courses} />
              <Route exact path="/tareas" component={Homeworks} />
            </Switch>
          </div>
        </>
      ) : (
        <div id="page-wrap" style={{ textAlign: "center", overflow: "auto" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login-estudiante" component={LoginStudent} />
            <Route exact path="/login-profesor" component={LoginTeacher} />
            <Route exact path="/agregar-tarea" component={AddHomework} />
            <Route
              exact
              path="/registro-estudiante"
              component={RegisterStudent}
            />
            <Route
              exact
              path="/registro-profesor"
              component={RegisterTeacher}
            />
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
