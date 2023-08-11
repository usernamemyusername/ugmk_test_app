export const ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    labels: {
      render: "value",
      fontColor: ["green", "white", "red"],
    },
    legend: {
      position: "bottom",
    },
  },
};
