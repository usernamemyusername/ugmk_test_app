import { observer } from "mobx-react-lite";
import React from "react";

import "./styles.css";

function Selector({ context, name }) {
  if (!context || !name) {
    return <React.Fragment />;
  }

  return (
    <select
      className="selector"
      value={context.selectedOption.value}
      onChange={context.setSelectedOption}
      name={name}
    >
      {context.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default observer(Selector);
