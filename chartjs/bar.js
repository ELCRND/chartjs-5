/**
 *
 *
 */
export function initBarChart(canvasId = "chart-bar") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Отсутствует canvas с id ${canvasId}`);
    return null;
  }

  /*  ╔══════════════════════════════════════════════════════════════╗
      ║                            DATA                              ║   */
  const labels = ["Пн.", "Вт.", "Ср.", "Чт.", "Пт.", "Сб.", "Вс."];
  const values = [
    [1.7, 2.5, 3, 3.7, 5.7, 7.0, 6.0], // голубой
    [1.2, 1.7, 2.3, 3.2, 5.7, 7.7, 5.0], // оранжевый
  ];
  /*  ╚══════════════════════════════════════════════════════════════╝  */

  function createGradient(ctx, colorTop, colorBottom) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400); // вертикальный градиент
    gradient.addColorStop(0, colorTop);
    gradient.addColorStop(0.6, colorBottom);
    gradient.addColorStop(1, colorBottom);
    return gradient;
  }

  const ctx = canvas.getContext("2d");

  const config = {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "bar 1", // голубой
          data: values[0],
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return;
            return createGradient(ctx, "#95E1FF", "#95E1FF");
          },
          borderWidth: 4, // фиксированный разрыв м\у столбиками
          borderColor: "transparent",
          borderRadius: 8, // закругление
          barThickness: 20,
        },
        {
          label: "bar 2", // оранжевый
          data: values[1],
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return;
            return createGradient(ctx, "#FF0825", "#FFA023");
          },
          borderWidth: 4,
          borderColor: "transparent",
          borderRadius: 8,
          barThickness: 20,
        },
      ],
    },
    options: {
      responsive: true, // адаптивность при изменении контейнера
      maintainAspectRatio: true, // сохранять соотношение сторон

      plugins: {
        legend: { display: false },
        tooltip: {
          // tooltip
          mode: "index",
          intersect: false,
          backgroundColor: "#2D2E2F",
          titleFont: { size: 16, weight: 600 },
          titleColor: "#fff",
          bodyFont: { size: 16, weight: 600 },
          bodyColor: "#fff",
        },
      },

      scales: {
        x: {
          grid: {
            drawTicks: false,
            offset: true,
            color: (context) => {
              if (context.index === 0) return "transparent";

              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) return;
              return createGradient(ctx, "#1B1B1B", "#363636");
            },
          },
          ticks: {
            color: "#fff",
            font: { size: 18, weight: 700 },
          },
        },
        y: {
          grid: {
            drawTicks: false,
            color: (context) => {
              const index = context.tick.value;

              if (index > 4) return "#272727";
              return "#363636";
            },
          },
          ticks: {
            labelOffset: 15, // смещение подписей вниз
            color: "#fff", // цвет подписей
            font: { size: 16, weight: 700 },
            stepSize: 2,
            callback: (value) => {
              if (value === 0) return "";
              return `${value}ч.`;
            },
          },
        },
      },

      // Отступы
      layout: {
        padding: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 10,
        },
      },
    },
  };

  new Chart(ctx, config);
}
