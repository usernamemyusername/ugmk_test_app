import { makeObservable, computed, action, observable } from "mobx";

import { rand } from "../../../utils/rand";
import { Selector } from "../../selector";

import { Months } from "./constants";

export class Graph {
  _dataset = [];
  selector = null;

  constructor() {
    makeObservable(this, {
      _dataset: observable,
      selector: observable.ref,
      dataset: computed,
      createDataset: action.bound,
    });
  }

  createDataset = (data) => {
    if (!data) {
      return;
    }

    const datasets = [];

    data.forEach((product) => {
      if (!datasets[product.factoryId]) {
        datasets[product.factoryId] = {
          factoryId: product.factoryId,
        };
      }

      const targetFactory = datasets[product.factoryId];

      if (!product.date) {
        return;
      }

      const targetDate = datasets[product.factoryId][product.date.getMonth()];

      if (!targetDate) {
        datasets[product.factoryId][product.date.getMonth()] = {
          total: 0,
          product1: 0,
          product2: 0,
          product3: 0,
        };
      }

      const target = targetFactory[product.date.getMonth()];

      const total =
        target.total +
        Number(product.product1) +
        Number(product.product2) +
        Number(product.product3);
      const product1 = target.product1 + product.product1;
      const product2 = target.product2 + product.product2;
      const product3 = target.product3 + product.product3;

      targetFactory[product.date.getMonth()] = {
        total,
        product1,
        product2,
        product3,
      };
    });

    const labels = Object.keys(datasets[1][0]);

    this.selector = new Selector(
      labels.map((label, index) => {
        return {
          value: index,
          label,
        };
      }),
      "products"
    );

    this._dataset = datasets
      .map((element) => {
        const { factoryId } = element;

        return {
          data: Object.values(element),
          label: "Factory " + factoryId,
          id: factoryId,
          backgroundColor: `rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(
            0,
            255
          )}, 0.5)`,
        };
      })
      .filter(Boolean);
  };

  getDataWithParams(factoryId, monthId) {
    const targetFactory = this._dataset
      .filter(Boolean)
      .find((element) => element.id === factoryId + 1);

    const targetMonth = targetFactory.data[monthId];

    const labels = Object.keys(targetMonth).filter((key) => key !== "total");
    const data = labels.map((label) => targetMonth[label]);
    const backgroundColor = labels.map(
      () => `rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)}, 0.5)`
    );

    return {
      labels,
      datasets: [
        {
          label: "quantity: ",
          data,
          backgroundColor,
        },
      ],
    };
  }

  get dataset() {
    if (!this.selector) {
      return null;
    }

    const { value: selected } = this.selector.selectedOption;

    if (!this._dataset) {
      return [];
    }

    const datasets = this._dataset.map((factory) => {
      if (!factory) {
        return undefined;
      }

      return {
        ...factory,
        data: factory.data.map((element) => {
          if (selected === 0) {
            return element.total;
          }

          return element[`product${selected}`];
        }),
      };
    });

    return {
      labels: Months,
      datasets,
    };
  }
}
