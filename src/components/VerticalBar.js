import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import randomcolor from "randomcolor";

export default function VerticalBar({ info }) {
  let labels = info.map((course) => {
    return course.title;
  });
  let data = info.map((course) => {
    return course.students.length;
  });
  const backgroundColorsTransparent = (numColors) => {
    let colors = [];
    for (let i = 0; i < numColors; i++) {
      colors.push(
        randomcolor({
          luminosity: "light",
          format: "rgba",
          hue: "green",
          alpha: 0.5,
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
          hue: "blue",
        })
      );
    }
    return colors;
  };
  let colorsTransparent = backgroundColorsTransparent(labels.length);
  let colorsSolid = backgroundColorsSolid(labels.length);

  function generarNumero(numero) {
    return (Math.random() * numero).toFixed(0);
  }

  function colorRGBTransparent() {
    var coolor =
      "(" +
      generarNumero(255) +
      "," +
      generarNumero(255) +
      "," +
      generarNumero(255) +
      ", 0.5" +
      ")";
    return "rgb" + coolor;
  }

  function colorRGB() {
    var coolor =
      "(" +
      generarNumero(255) +
      "," +
      generarNumero(255) +
      "," +
      generarNumero(255) +
      ")";
    return "rgb" + coolor;
  }

  const dataBarVertical = {
    labels: labels,
    datasets: [
      {
        label: "número de estudiantes",
        data: data,
        backgroundColor: colorsTransparent,
        hoverBackgroundColor: colorsSolid,
        borderColor: colorsSolid,
        borderWidth: 2,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return <Bar data={dataBarVertical} options={options} />;
}
