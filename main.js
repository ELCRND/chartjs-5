import { initDoughnutChart } from "./chartjs/doughnut.js";
import { initLineChart } from "./chartjs/line.js";
import { initMatrixChart } from "./chartjs/matrix.js";
import { initMultiLineChart } from "./chartjs/multiLine.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    // линейный график с дефолтными цветами как на картинке
    initLineChart("chart-line");

    // линейный график с указанием цветов для градиента и линии
    initLineChart("chart-line-2", {
      firstColor: "rgba(184, 85, 36, 0.5)",
      secondColor: "rgba(184, 85, 36, 0.1)",
      lineColor: "rgba(184, 85, 36, 1)",
    });

    // multi-line график
    initMultiLineChart("chart-multiline");

    // doughnut график
    initDoughnutChart("chart-doughnut");

    // matrix график
    initMatrixChart("chart-matrix");
  } catch (error) {
    console.error(error);
  }
});
