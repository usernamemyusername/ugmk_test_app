import { makeObservable, action, observable } from "mobx";

export class Selector {
  selectedOption = undefined;
  options = null;

  constructor(options) {
    if (!options) {
      throw Error();
    }

    this.options = options;
    this.selectedOption = options[0];

    makeObservable(this, {
      selectedOption: observable,
      options: observable,
      setSelectedOption: action,
    });
  }

  setSelectedOption = (event) => {
    const { value } = event.target;
    const selected = this.options.find(
      (option) => option.value === Number(value)
    );

    if (selected) {
      this.selectedOption = selected;
    }
  };
}
