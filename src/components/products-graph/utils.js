import { rand } from "../../utils/rand";

export const createDataset = (data) => {
  const datasets = [];

  data.forEach((product) => {
    if (!datasets[product.factoryId]) {
      datasets[product.factoryId] = {};
    }

    const targetFactory = datasets[product.factoryId];

    if (!product.date) {
      return;
    }

    const targetDate = datasets[product.factoryId][product.date.getMonth()];

    if (!targetDate) {
      datasets[product.factoryId][product.date.getMonth()] = 0;
    }

    targetFactory[product.date.getMonth()] =
      targetFactory[product.date.getMonth()] +
      Number(product.product1) +
      Number(product.product2) +
      Number(product.product3);
  });

  return datasets.map((element, index) => {
    return {
      data: Object.values(element),
      label: "Factory" + index,
      backgroundColor: `rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(
        0,
        255
      )}, 0.5)`,
    };
  });
};
