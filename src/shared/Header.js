import React, { useState } from "react";
import { AnimationWrapper } from "react-hover-animation";

export default function Header() {
  const [show, setShow] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark border-bottom">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0 mx-auto">
          <li className="nav-item mr-2">
            <AnimationWrapper>
              <button className="btn btn-light">
                <span style={{ color: "#EFA42D" }}>
                  <i className="fa fa-home fa-2x mt-1"></i>
                </span>
              </button>
            </AnimationWrapper>
          </li>
          <li className="nav-item mr-2">
            <AnimationWrapper>
              <button className="btn btn-light">
                <span style={{ color: "#C72E2C" }}>
                  <i className="fa fa-sticky-note fa-2x mt-1"></i>
                </span>
              </button>
            </AnimationWrapper>
          </li>
          <li className="nav-item mr-2">
            <AnimationWrapper>
              <button className="btn btn-light">
                <span style={{ color: "#88C03D" }}>
                  <i className="fa fa-users fa-2x mt-1"></i>
                </span>
              </button>
            </AnimationWrapper>
          </li>
          <li className="nav-item mr-2">
            <AnimationWrapper>
              <button className="btn btn-light">
                <span style={{ color: "#257995" }}>
                  <i className="fa fa-user-circle fa-2x mt-1"></i>
                </span>
              </button>
            </AnimationWrapper>
          </li>
          <li></li>
          <li className="nav-item mr-2">
            <AnimationWrapper>
              <button className="btn btn-light">
                <span style={{ color: "#C84657" }}>
                  <i className="fa fa-sign-out fa-2x mt-1"></i>
                </span>
              </button>
            </AnimationWrapper>
          </li>
        </ul>
      </div>
    </nav>
  );
}
