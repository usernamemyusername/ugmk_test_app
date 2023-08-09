import * as React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { ContextData } from "../../App";

function ProductsGraph() {
  const store = React.useContext(ContextData);

  return (
    <>
      {store.data.map((element) => (
        <Link to={`/factory?id=${element.factoryId}`}>
          <span>hey </span>
        </Link>
      ))}
    </>
  );
}

export default observer(ProductsGraph);
