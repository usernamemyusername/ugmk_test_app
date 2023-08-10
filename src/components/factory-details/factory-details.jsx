import { observer } from "mobx-react-lite";
import * as React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { ContextData } from "../../App";

ChartJS.register(ArcElement, Tooltip, Legend);

export function FactoryDetails() {
  const store = React.useContext(ContextData);

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
  }, [store.graph.dataset]);

  if (!dataset) {
    //TODO: spinner
    return null;
  }

  return <Pie data={dataset} />;
}

export default observer(FactoryDetails);
