import { observer } from "mobx-react-lite";
import React from "react";

import "./styles.css";

function Selector({ context, name, title }) {
  if (!context || !name) {
    return <React.Fragment />;
  }

  return (
    <div className="selector-wrapper">
      {title && <p>{title}</p>}
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
    </div>
  );
}

export default observer(Selector);
