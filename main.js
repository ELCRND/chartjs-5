import { initialLineChart } from "./chartjs/line.js";
import { initialMultiLineChart } from "./chartjs/multiLine.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    // линейный график с дефолтными цветами как на картинке
    initialLineChart("chart-line");

    // линейный график с указанием цветов для градиента и линии
    initialLineChart("chart-line-2", {
      firstColor: "rgba(184, 85, 36, 0.5)",
      secondColor: "rgba(184, 85, 36, 0.1)",
      lineColor: "rgba(184, 85, 36, 1)",
    });

    // multi-line график
    initialMultiLineChart("chart-multiline");
  } catch (error) {
    console.error(error);
  }
});
