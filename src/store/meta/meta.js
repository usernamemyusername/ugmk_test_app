import { makeObservable, action, observable } from "mobx";

export class Meta {
  isLoading = false;
  isLoaded = false;
  isError = false;
  errorMsg = "";

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      isLoaded: observable,
      isError: observable,
      start: action,
      success: action,
      error: action,
    });
  }
  start() {
    this.isLoading = true;
    this.isLoaded = false;
    this.isError = false;
  }

  success() {
    this.isLoading = false;
    this.isLoaded = true;
    this.isError = false;
  }

  error(msg) {
    this.isLoading = false;
    this.isLoaded = true;
    this.isError = true;
    if (msg) {
      this.errorMsg = msg;
    }
  }
}
