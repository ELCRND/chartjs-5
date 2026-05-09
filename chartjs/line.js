/**
 * config.datasets - Стилизация линии и градиента. дефолтные цвета заданы в @param colors
 * config.plugins #centerText - Надписи и формулы в центре
 */

/**
 * @param {string} canvasId
 * @param {string[] | null} labels
 * @param {number[] | null} values
 * @param {Object | null} colors
 */
export function initLineChart(
  canvasId = "chart-line",
  labels = null,
  values = null,
  colors = null,
) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Отсутвует canvas с id ${canvasId}`);
    return null;
  }

  /*  ╔══════════════════════════════════════════════════════════════╗
      ║                            DATA                              ║   */
  labels = labels || ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль"];
  values = values || [20.1, 25.2, 23.3, 18.4, 27.5, 25.6, 24.7];
  /*  ╚══════════════════════════════════════════════════════════════╝  */

  const ctx = canvas.getContext("2d");

  // дефолтные цвета
  colors = colors || {
    firstColor: "rgba(55, 159, 166, 0.5)",
    secondColor: "rgba(55, 159, 166, 0.05)",
    lineColor: "rgba(55, 159, 166, 1)",
  };

  // градиент под линией
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, colors.firstColor);
  gradient.addColorStop(1, colors.secondColor);

  const config = {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          data: values,
          borderColor: colors.lineColor, // цвет линии
          backgroundColor: gradient,
          borderWidth: 3.5, // толщина линии
          pointRadius: 0, // без контрольных точек
          pointHoverRadius: 0,
          tension: 0.15, // плавность линии
          fill: true,
        },
      ],
    },
    options: {
      responsive: true, // адаптивность при изменении контейнера
      maintainAspectRatio: false, // сохранять соотношение сторон
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
      },
      scales: {
        x: {
          display: false, // оси полностью скрыты
        },
        y: {
          display: false,
          max: Math.max(...values) + 20, // отступ графика сверху
        },
      },
    },
    plugins: [
      {
        id: "centerText",
        afterDraw(chart) {
          const { ctx, width, height } = chart;
          ctx.save();

          const data = chart.data.datasets[0].data;
          const firstValue = data[0];
          const lastValue = data[data.length - 1];
          const growth = ((lastValue - firstValue) / firstValue) * 100; // формула роста
          const growthText = `${growth >= 0 ? "▲" : "▼"} ${Number(Math.abs(growth).toFixed(1))}%`;
          const checkValue = Number(
            (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1),
          );

          // заголовок "Средний чек"
          ctx.font = '500 30px "Segoe UI", Roboto, Helvetica, Arial, system-ui';
          ctx.fillStyle = "#fff";
          ctx.textAlign = "center";
          ctx.fillText("Средний чек", width / 2, height / 6); // позиция заголовка

          // сумма
          ctx.font =
            'bold 48px "Segoe UI", Roboto, Helvetica, Arial, system-ui';
          ctx.fillStyle = "#fff";
          ctx.fillText(`$${checkValue}`, width / 2, height / 2.4);

          // процент роста
          ctx.font = '500 20px "Segoe UI", Roboto, Helvetica, Arial, system-ui';
          ctx.fillStyle = `${growth >= 0 ? "#2ECB80" : "#FF6B6B"}`;
          ctx.fillText(growthText, width / 2, height / 1.7);

          ctx.restore();
        },
      },
    ],
  };

  new Chart(ctx, config);
}
