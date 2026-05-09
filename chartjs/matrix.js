/**
 * config.datasets - Стилизация плиток, расстояние м\у, цвета заданы в @param colorPalette
 * config.options.plugins.tooltip - Tooltip
 * @param values - Пустой массив, данные генерируются через  @param createData
 */

export function initMatrixChart(canvasId = "chart-matrix") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas с id ${canvasId} не найден`);
    return null;
  }

  /*  ╔══════════════════════════════════════════════════════════════╗
      ║                            DATA                              ║   */
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const values = [];
  /*  ╚══════════════════════════════════════════════════════════════╝  */

  const ctx = canvas.getContext("2d");

  const colorPalette = [
    "#241C32",
    "#2F2441",
    "#43345E",
    "#604980",
    "#7B5FA8",
    "#9B77D1",
    "#C299FF",
  ];

  function getColor(value, maxValue = 1000) {
    if (!value || value <= 0) return colorPalette[0];

    const normalized = Math.min(value / maxValue, 1);

    const index = Math.floor(normalized * (colorPalette.length - 1));

    return colorPalette[index];
  }

  /* автогенерация массива вида 
    [{x: 1, y: 1, v: 1}, {x: 2, y: 1, v: 10}, {x: 1, y: 2, v: 100}, {x: 2, y: 2, v: 1000}]
    где x - номер недели, y - день недели, v - значение для определения цвета
  */
  (function createData(numWeeks = 24) {
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < numWeeks; x++) {
        const active =
          Math.random() > 0.15 ? Math.floor(Math.random() * 1000) : 0;

        values.push({ x, y, v: active });
      }
    }
  })();

  const maxActivity = Math.max(...values.map((d) => d.v));

  const { cols, rows } = getUniqueCounts(values);

  function getUniqueCounts(data) {
    const xValues = new Set(data.map((item) => item.x));
    const yValues = new Set(data.map((item) => item.y));
    return {
      cols: xValues.size,
      rows: yValues.size,
    };
  }

  const config = {
    type: "matrix",
    data: {
      datasets: [
        {
          label: "",
          data: values,
          // borderColor: "#1b1b1b", // border плитки
          // borderWidth: 1,
          borderRadius: 5,
          anchorX: "start",
          anchorY: "center",
          width: ({ chart }) => {
            const s = chart.chartArea ? chart.chartArea.width / cols - 6 : 0; // -6 расстояние м\у плитками
            return s;
          },
          height: ({ chart }) => {
            const s = chart.chartArea ? chart.chartArea.width / cols - 6 : 0;
            return s;
          },
          backgroundColor: (ctx) => getColor(ctx.raw?.v || 0, maxActivity),
        },
      ],
    },
    options: {
      responsive: true, // адаптивность при изменении контейнера
      maintainAspectRatio: true, // сохранять соотношение сторон
      aspectRatio: (cols - 1) / rows, // пропорции для квадрадных плиток
      plugins: {
        legend: { display: false },
        tooltip: {
          // tooltip
          backgroundColor: "#2D2E2F",
          titleAlign: "left",
          titleFont: { size: 12, weight: 600 },
          titleColor: "#fff",
          bodyFont: { size: 14, weight: 600 },
          bodyColor: "#fff",
          borderColor: "#363636",
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          //   caretSize: 0, // отключить стрелочку
          backgroundColor: "#2D2E2F",
          // управление надписями в tooltip
          callbacks: {
            title: (context) => {
              const d = context[0].raw;
              return `${days[d.y]} — Неделя ${d.x + 1}`;
            },
            label: (context) => `Значение: ${context.raw.v}`,
          },
        },
      },

      layout: {
        padding: {
          // padding для графика
          top: 35,
          right: 0,
          bottom: 35,
          left: 4,
        },
      },

      scales: {
        x: {
          type: "linear",
          offset: false,
          grid: { display: false },
          ticks: { display: false },
        },
        y: {
          type: "linear",
          offset: false,
          grid: { display: false },
          ticks: {
            // подписи по оси Y
            callback: (v) => `${days[Math.round(v)]}.    ` || "",
            color: "#9CA3AF",
            font: {
              size: 16,
              weight: 500,
            },
            crossAlign: "far",
            padding: 0,
          },
        },
      },
    },
  };

  new Chart(ctx, config);
}
