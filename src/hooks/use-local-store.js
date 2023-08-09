import * as React from "react";

const UseLocalStore = (Store) => {
  const [store] = React.useState(() => new Store());

  return store;
};

export default UseLocalStore;
