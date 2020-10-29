import React from "react";
import { Pie } from "react-chartjs-2";
import randomcolor from "randomcolor";

export default function PieChart({ info }) {
  let labels = info.map((homework) => {
    return homework.title;
  });
  let courses = info.map((homework) => {
    return homework.course.students.length;
  });
  // let data = info.map((course) => {
  //   return course.students.length;
  // });
  const backgroundColorsTransparent = (numColors) => {
    let colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(
        randomcolor({
          luminosity: "light",
          format: "rgba",
          hue: "red",
          alpha: 0.7,
        })
      );
    }
    return colors;
  };
  const backgroundColorsSolid = (numColors) => {
    let colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(
        randomcolor({
          luminosity: "light",
          format: "rgb",
          hue: "red",
        })
      );
    }
    return colors;
  };
  let colorsTransparent = backgroundColorsTransparent(labels.length);
  let colorsSolid = backgroundColorsSolid(labels.length);
  const dataPieChart = {
    labels: labels,
    datasets: [
      {
        label: "Número de tareas",
        data: courses,
        backgroundColor: colorsTransparent,
        hoverBackgroundColor: colorsSolid,
        borderColor: colorsSolid,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Pie data={dataPieChart} />
      <h2 className="font-weight-bold">{labels.length} tareas vigentes</h2>
    </>
  );
}
