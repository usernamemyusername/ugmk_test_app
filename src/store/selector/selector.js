import { makeObservable, action, observable } from "mobx";

import { MemoService } from "../../services/memo";

export class Selector {
  selectedOption = undefined;
  options = null;
  name = "";

  constructor(options, name) {
    if (!options || !name) {
      throw Error();
    }

    this.options = options;
    this.name = name;

    const memoizedOption = MemoService.get(name);

    if (memoizedOption) {
      this.selectedOption = JSON.parse(memoizedOption);
    }

    if (!memoizedOption) {
      this.selectedOption = options[0];
    }

    makeObservable(this, {
      selectedOption: observable,
      options: observable,
      name: observable,
      setSelectedOption: action,
    });
  }

  setSelectedOption = (event) => {
    const { value } = event.target;
    const selected = this.options.find(
      (option) => option.value === Number(value)
    );

    MemoService.set(this.name, JSON.stringify(selected));

    if (selected) {
      this.selectedOption = selected;
    }
  };
}
