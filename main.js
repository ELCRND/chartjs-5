import { initBarChart } from "./chartjs/bar.js";
import { initDoughnutChart } from "./chartjs/doughnut.js";
import { initLineChart } from "./chartjs/line.js";
import { initMatrixChart } from "./chartjs/matrix.js";
import { initMultiLineChart } from "./chartjs/multiLine.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    // линейный график с дефолтными цветами как на картинке
    initLineChart("chart-line");

    // линейный график с указанием параметров
    initLineChart(
      "chart-line-2",
      ["Янв", "Фев", "Март", "Апр", "Май"],
      [30.1, 25.2, 23.3, 28.4, 27.5],
      {
        firstColor: "rgba(184, 85, 36, 0.5)",
        secondColor: "rgba(184, 85, 36, 0.1)",
        lineColor: "rgba(184, 85, 36, 1)",
      },
    );

    // multi-line график
    initMultiLineChart("chart-multiline");

    // doughnut график
    initDoughnutChart("chart-doughnut");

    // matrix график
    initMatrixChart("chart-matrix");

    // bar график
    initBarChart("chart-bar");
  } catch (error) {
    console.error(error);
  }
});
