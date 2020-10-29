import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faBookReader,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotLogin() {
  return (
    <div className="card mx-3 my-3 d-flex justify-content-center">
      <div className="card-header bg-white">
        <h1 className="font-weight-bold">Escoge una opción: </h1>
      </div>
      <div className="row">
        <div className="col ml-3 my-3">
          <motion.div
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.7 }}
            dragConstraints={{ left: -100, right: 100 }}
          >
            <Link to="/login-profesor" className="text-decoration-none">
              <button
                className="btn btn-info btn-block px-5 py-5"
                type="button"
                data-toggle="collapse"
                data-target="collapseTeacher"
                aria-controls="collapseTeacher"
              >
                <span style={{ fontSize: "70px" }}>Profesor</span>
                <br />
                {/* <FontAwesomeIcon icon={faChalkboardTeacher} size="10x" /> */}
                <div className="col text-center">
                  <img
                    src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603262076/open-peeps_5_xlamrg.png"
                    width="110"
                    height="149"
                  />
                  <img
                    src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603262069/open-peeps_4_c6xlia.png"
                    width="120"
                    height="149"
                  />
                </div>
              </button>
            </Link>
          </motion.div>
        </div>
        <div className="col mr-3 my-3">
          <motion.div
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 0.7 }}
            dragConstraints={{ left: -100, right: 100 }}
          >
            <Link to="/login-estudiante" className="text-decoration-none">
              <button
                className="btn btn-success btn-block px-5 py-5"
                type="button"
                data-toggle="collapse"
                data-target="collapseStudent"
                aria-controls=""
              >
                <span style={{ fontSize: "70px" }}>Estudiante</span>
                <br />
                {/* <FontAwesomeIcon icon={faBookReader} size="10x" /> */}
                <div className="col text-center">
                  <img
                    src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603262056/open-peeps_3_txgpb7.png"
                    width="110"
                    height="149"
                  />
                  <img
                    src="https://res.cloudinary.com/dkrcosw87/image/upload/v1603262050/open-peeps_2_xokhhu.png"
                    width="120"
                    height="149"
                  />
                </div>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
