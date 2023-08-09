import { makeObservable, observable } from "mobx";
import { ProductModel } from "./model";
import { getProductDate } from "./utils";

export class Products {
  data = null;

  constructor() {
    makeObservable(this, { data: observable });
  }

  toClientFormat(data) {
    const products = data.map((element) => {
      const date = getProductDate(element.date);

      return ProductModel({
        date,
        id: element.id,
        factoryId: element.factory_id,
        product1: element.product1,
        product2: element.product2,
        product3: element.product3,
      });
    });

    this.data = products;
  }
}
