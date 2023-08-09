import { Model } from "objectmodel";

export const ProductModel = new Model({
  date: [Date, null],
  id: Number,
  factoryId: Number,
  product1: [Number, null, undefined],
  product2: [Number, null, undefined],
  product3: [Number, null, undefined],
});
