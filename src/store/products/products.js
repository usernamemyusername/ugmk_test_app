import { makeObservable, computed, action, observable } from "mobx";
import { ApiRequest } from "../../services/api-request";
import { API } from "../../api";
import { Products as ProductsDataStore } from "../../models/product/store";

export default class Products {
  products = new ProductsDataStore();
  request = new ApiRequest(API.PRODUCTS);

  constructor() {
    makeObservable(this, {
      products: observable.ref,
      request: observable.ref,
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

    if (!this.request.meta.isError) {
      this.products.toClientFormat(data);
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
