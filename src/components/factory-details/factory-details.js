import * as React from "react";
import { observer } from "mobx-react-lite";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { ProductsContext } from "../../routes";
import { ErrorMsg } from "../ui/error-msg";

ChartJS.register(ArcElement, Tooltip, Legend);

export function FactoryDetails() {
  const store = React.useContext(ProductsContext);

  const dataset = React.useMemo(() => {
    if (!store.graph.dataset) {
      return null;
    }

    const searchParams = new URLSearchParams(document.location.search);
    const factoryId = searchParams.get("factoryId");
    const monthId = searchParams.get("monthId");

    const target = store.graph.getDataWithParams(
      Number(factoryId),
      Number(monthId)
    );

    return target;
  }, [store.graph.dataset, store.graph]);

  if (!dataset) {
    return store.request.meta.isError ? (
      <ErrorMsg msg={store.request.meta.errorMsg} />
    ) : (
      <React.Fragment />
    );
  }

  return <Pie data={dataset} />;
}

export default observer(FactoryDetails);
