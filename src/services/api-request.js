import { makeObservable, observable } from "mobx";
import { Meta } from "../utils/stores/meta/meta";

//TODO: in constants
export const METHODS = {
  GET: "GET",
  POST: "POST",
};

export class ApiRequest {
  url;
  method;

  meta = new Meta();

  constructor(url, method = METHODS.GET) {
    this.url = url;
    this.method = method;

    makeObservable(this, {
      meta: observable.ref,
    });
  }

  async call(payload) {
    const { method, url } = this;
    this.meta.start();
    const isGet = method === METHODS.GET;

    const getParams = isGet ? new URLSearchParams(payload) : "";
    const params = isGet ? {} : payload;
    const targetUrl = `${process.env.REACT_APP_BASE_URL}${url}${getParams}`;

    const response = await fetch(targetUrl, {
      method,
      params,
    }).catch(() => {
      this.meta.error();
    });

    const data = await response.json();

    if (data) {
      this.meta.success();
    }

    return data;
  }
}
