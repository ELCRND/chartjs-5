/**
 * config.datasets - Цвета, скругление секторов, расстояние м\у секторами
 * config.options - Вырез в центре, tooltip
 * config.plugins #centerText - Надпись в центре
 * createGradient - Градиент
 */

export function initDoughnutChart(canvasId = "chart-doughnut") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Отсутвует canvas с id ${canvasId}`);
    return null;
  }

  /*  ╔══════════════════════════════════════════════════════════════╗
      ║                            DATA                              ║   */
  const labels = ["Янв", "Фев", "Март", "Апр"];
  const values = [45.1, 20.2, 20.3, 15.4];
  /*  ╚══════════════════════════════════════════════════════════════╝  */

  const ctx = canvas.getContext("2d");

  function createGradient(ctx, color, centerX, centerY, radius) {
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      radius *
        0.6 /** направление градиента, если значение меньше второго @param radius затемнение идет от центра к краям и наоборот*/,
      centerX,
      centerY,
      radius * 0.95,
    );

    const darkerColor = darkenColor(color, -50); // сила затемнения края градиента

    gradient.addColorStop(0, darkerColor);
    gradient.addColorStop(1, color);

    return gradient;
  }

  function darkenColor(hex, percent) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.min(255, Math.max(0, r + Math.round((percent * 255) / 100)));
    g = Math.min(255, Math.max(0, g + Math.round((percent * 255) / 100)));
    b = Math.min(255, Math.max(0, b + Math.round((percent * 255) / 100)));

    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  const config = {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: ["#cc4c63", "#2fb8e6", "#fca94b", "#59ee9c"],
          borderColor: "transparent",
          borderRadius: 10, // скругление секторлов
          borderWidth: 0,
          spacing: 6, // расстояние между секторами
        },
      ],
    },
    plugins: [
      {
        id: "centerText", // текст
        beforeDraw(chart) {
          const { ctx, width, height } = chart;
          ctx.save();

          const value = Number(
            (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1),
          ); // формула для вычисления значения в центре

          // заголовок "ER"
          ctx.font = '500 24px "Segoe UI", Roboto, Helvetica, Arial, system-ui';
          ctx.fillStyle = "#fff";
          ctx.textAlign = "center";
          ctx.fillText("ER:", width / 2, height / 2.15); // позиция заголовка

          // %
          ctx.font =
            'bold 24px "Segoe UI", Roboto, Helvetica, Arial, system-ui';
          ctx.fillStyle = "#fff";
          ctx.fillText(`${value}%`, width / 2, height / 1.7);

          ctx.restore();
        },
      },
      {
        id: "customGradient",
        beforeDraw: function (chart) {
          const ctx = chart.ctx;
          const chartArea = chart.chartArea;
          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = (chartArea.top + chartArea.bottom) / 2;
          const radius = Math.min(
            (chartArea.right - chartArea.left) / 2,
            (chartArea.bottom - chartArea.top) / 2,
          );

          chart.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);
            meta.data.forEach((element, index) => {
              const originalColor = dataset.backgroundColor[index];
              const gradient = createGradient(
                ctx,
                originalColor,
                centerX,
                centerY,
                radius,
              );
              element.options.backgroundColor = gradient;
            });
          });
        },
      },
    ],
    options: {
      responsive: true, // адаптивность при изменении контейнера
      maintainAspectRatio: true, // сохранять соотношение сторон
      cutout: "72%", // вырез в центре
      plugins: {
        tooltip: {
          // tooltip
          bodyFont: {
            size: 16,
            weight: "bold",
          },
          bodyAlign: "center",
          // управление надписями в tooltip
          callbacks: {
            title: function (context) {
              return "";
            },
            label: function (context) {
              return `${context.label}: ${context.parsed}%`;
            },
          },
          titleFont: { size: 16, weight: 600 },
          titleColor: "#fff",
          bodyFont: { size: 18, weight: 600 },
          bodyColor: "#fff",
          borderColor: "#363636",
          borderWidth: 1,
          backgroundColor: "#2D2E2F",
          displayColors: false,
          cornerRadius: 10,
          padding: 20,
          caretSize: 0,
        },
        legend: { display: false },
      },
    },
  };

  new Chart(ctx, config);
}
