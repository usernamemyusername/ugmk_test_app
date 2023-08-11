import { makeObservable, computed, action, observable } from "mobx";
import { ApiRequest } from "../api-request";
import { API } from "../../api";
import { Products as ProductsDataStore } from "../../models/product/store";
import { Graph } from "./graph";

export default class Products {
  products = new ProductsDataStore();
  graph = new Graph();
  request = new ApiRequest(API.PRODUCTS);

  constructor() {
    makeObservable(this, {
      products: observable.ref,
      request: observable.ref,
      graph: observable.ref,
      data: computed,
      meta: computed,
      fetch: action,
    });

    this.fetch();
  }

  async fetch() {
    if (this.request.isLoading) {
      return;
    }

    const data = await this.request.call();

    if (this.request.meta.isError) {
      // alert(
      //   "No data on localhost:3000 was found ;( Possibly there is no json server running on host machine"
      // );
    }

    if (!this.request.meta.isError) {
      this.products.toClientFormat(data);
      this.graph.createDataset(this.products.data);
    }
  }

  get meta() {
    return this.request.meta;
  }

  get data() {
    if (!this.products.data) {
      return [];
    }

    return this.products.data;
  }
}
