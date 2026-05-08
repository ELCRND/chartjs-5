/**
 * @param {string} canvasId - id canvas элемента
 * config.datasets - настройки линий и точек
 * config.options.layout - смещение графика внутри canvas / отступы по краям
 * config.options.plugins.tooltip - tooltip
 * config.options.scales - оси, сетка, подписи
 * config.plugins #customTitle - заголовок над графиком
 * config.plugins #verticalLine - вертикальная линия при наведении
 */
export function initMultiLineChart(canvasId = "chart-multiline") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas с id ${canvasId} не найден`);
    return null;
  }

  /*  ╔══════════════════════════════════════════════════════════════╗
      ║                            DATA                              ║   */
  //  шкала X за 30 дней
  const labels = Array.from({ length: 30 }, (el, i) =>
    String(i + 1).padStart(2, "0"),
  );

  // данные для линий
  const purpleData = [
    1050, 1100, 1150, 1250, 1600, 1700, 1550, 1650, 1750, 1550, 1650, 1800,
    2100, 2200, 2100, 2300, 2500, 3200, 3800, 4100, 4000, 3900, 3700, 3600,
    3550, 3700, 3800, 4100, 4300, 4500,
  ];
  const orangeData = [
    1950, 1980, 2000, 2050, 2100, 2150, 2200, 2150, 2050, 1950, 1900, 1850,
    1800, 1750, 1700, 1650, 1600, 1580, 1550, 1520, 1800, 2100, 2400, 2300,
    1900, 1500, 1200, 950, 800, 750,
  ];
  const greenData = [
    850, 880, 920, 950, 980, 920, 880, 850, 820, 780, 650, 600, 550, 620, 780,
    950, 1100, 1250, 1350, 1100, 1050, 1150, 1250, 1200, 1300, 1350, 1400, 1450,
    1480, 1520,
  ];
  /*  ╚══════════════════════════════════════════════════════════════╝  */

  const ctx = canvas.getContext("2d");

  const tooltipGradient = ctx.createLinearGradient(0, 0, 0, 400);
  tooltipGradient.addColorStop(0, "#363636");
  tooltipGradient.addColorStop(1, "#151515");

  const config = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Purple",
          data: purpleData,
          borderColor: "#BB4BD1", // цвет линии
          borderWidth: 3, // толщина линии
          tension: 0.25, // плавность линии
          pointRadius: 0, // без контрольных точек
          pointHoverRadius: 6, // размер контрольных точек при наведении
          pointHoverBorderWidth: 3, // цвет контрольных точек при наведении
          pointHoverBorderColor: "#fff", //  border контрольных точек при наведении
          pointBackgroundColor: "#191919", // цвет контрольных точек
        },
        {
          label: "Orange",
          data: orangeData,
          borderColor: "#FFB202",
          borderWidth: 3,
          tension: 0.25,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBorderWidth: 3,
          pointHoverBorderColor: "#fff",
          pointBackgroundColor: "#191919",
        },
        {
          label: "Green",
          data: greenData,
          borderColor: "#02FF7C",
          borderWidth: 3,
          tension: 0.25,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBorderWidth: 3,
          pointHoverBorderColor: "#fff",
          pointBackgroundColor: "#191919",
        },
      ],
    },
    options: {
      responsive: true, // адаптивность при изменении контейнера
      maintainAspectRatio: true, // сохранять соотношение исходное сторон

      layout: {
        padding: {
          // padding для графика
          top: 50,
          right: 10,
          bottom: 20,
          left: 20,
        },
      },

      interaction: {
        intersect: false,
        mode: "index", // показывает данные сразу на всех линиях https://www.chartjs.org/docs/latest/configuration/interactions.html#modes
      },

      plugins: {
        legend: { display: false },
        tooltip: {
          // tooltip
          caretPadding: 20, // отступ от точек
          backgroundColor: "#2D2E2F",
          cornerRadius: 32,
          titleAlign: "left",
          titleFont: { size: 16, weight: 600 },
          titleColor: "#fff",
          bodyFont: { size: 24, weight: 600 },
          bodySpacing: 8, // расстояние между строками в тултипе
          bodyColor: "#fff",
          borderColor: "#363636",
          borderWidth: 1,
          padding: 20,
          displayColors: true,
          usePointStyle: true,
          boxWidth: 13, // ширина кружка
          boxHeight: 13, // высота кружка
          caretSize: 0,
          backgroundColor: (context) => {
            return tooltipGradient;
          },
          callbacks: {
            title: (tooltipItems) => {
              return ` ${tooltipItems[0].label} июня`;
            },
            label: (context) => `  $${context.raw}`,
            labelColor: function (context) {
              return {
                borderColor: context.dataset.borderColor,
                backgroundColor: context.dataset.borderColor,
                borderWidth: 0,
              };
            },
          },
        },
      },

      scales: {
        x: {
          grid: {
            color: "rgba(156, 163, 175, 0.25)", // цвет сетки
            lineWidth: 0.5, // толщина линий сетки
            color: function (context) {
              return (context.index + 1) % 5 === 0
                ? "rgba(156, 163, 175, 0.25)"
                : "transparent"; // каждая 5-я линия видимая, остальные прозрачные
            },
          },
          ticks: {
            color: "#9CA3AF", // цвет подписей
            font: { size: 20 },
            maxRotation: 0,
            autoSkipPadding: 0,
            callback: function (val, index) {
              if (index === 0) return "01";
              return (index + 1) % 5 === 0 ? this.getLabelForValue(val) : ""; // каждая 5-я подпись видимая, остальные прозрачные
            },
          },
        },
        y: {
          // левая шкала
          //   min: 0,
          //   max: 4000,
          grid: {
            color: "rgba(156, 163, 175, 0.25)", // цвет сетки
            lineWidth: 0.5, // толщина сетки
          },
          ticks: {
            labelOffset: 15, // смещение подписей вниз
            color: "#fff", // цвет подписей
            font: { size: 16, weight: 700 },
            stepSize: 1000,
            callback: (value) => {
              if (value === 0) return "";
              if (value >= 1000) return value / 1000 + "k";
              return value;
            },
          },
        },
        y1: {
          // правая шкала
          position: "right",
          min: 0,
          max: 100,

          ticks: {
            labelOffset: 15, // смещение подписей вниз
            color: "#9D9D9D", // цвет подписей
            font: { size: 16, weight: 700 },
            stepSize: 25,
            callback: (value) => {
              if (value === 0) return "";
              return value + " шт.";
            },
          },
        },
      },
    },

    plugins: [
      {
        // заголовок
        id: "customTitle",
        beforeDraw(chart) {
          const {
            ctx,
            chartArea: { top, width },
          } = chart;
          ctx.save();

          ctx.font = '600 20px "Segoe UI", Roboto, Helvetica, Arial, system-ui';
          ctx.fillStyle = "#9D9D9D";
          ctx.textAlign = "center";
          ctx.fillText("vs предыдущий период $47,488", width / 2, top - 30);

          ctx.restore();
        },
      },

      {
        // вертикальная белая линия при наведении
        id: "verticalLine",
        beforeDraw: (chart) => {
          const activeElements = chart.tooltip?._active;

          if (activeElements && activeElements.length > 0) {
            const { ctx } = chart;
            const x = activeElements[0].element.x;

            const yValues = activeElements.map((el) => el.element.y);
            const minY = Math.min(...yValues) - 50; // отступ сверху
            const maxY = Math.max(...yValues) + 50; // отступ снизу

            ctx.save();

            const gradient = ctx.createLinearGradient(x, minY, x, maxY);
            gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
            gradient.addColorStop(0.08, "rgba(255, 255, 255, 0.9)");
            gradient.addColorStop(0.92, "rgba(255, 255, 255, 0.9)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

            ctx.beginPath();
            ctx.moveTo(x, minY);
            ctx.lineTo(x, maxY);
            ctx.lineWidth = 4;
            ctx.strokeStyle = gradient;
            ctx.stroke();

            ctx.restore();
          }
        },
      },
    ],
  };

  new Chart(ctx, config);
}
