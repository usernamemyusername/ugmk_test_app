import { makeObservable, computed, action, observable } from "mobx";

export class Meta {
  isLoading = false;
  isLoaded = false;
  isError = false;

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

  error() {
    this.isLoading = false;
    this.isLoaded = true;
    this.isError = true;
  }
}
