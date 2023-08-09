import { observer } from "mobx-react-lite";
import * as React from "react";
import { ContextData } from "../../App";

export function FactoryDetails() {
  const store = React.useContext(ContextData);

  console.log("store isssss", store);
  return <div>DAT IS DETAILS!!</div>;
}

export default observer(FactoryDetails);
