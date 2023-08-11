import { makeObservable, observable } from "mobx";

import { Meta } from "../meta";

import { METHODS } from "./constants";

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
      this.meta.error(
        "No data on localhost:3000 was found ;( Possibly there is no json server running on host machine. You can start it with command 'npm run server' "
      );
    });

    try {
      const data = await response.json();

      if (data) {
        this.meta.success();
      }

      return data;
    } catch (e) {
      console.error(e);
    }
  }
}
