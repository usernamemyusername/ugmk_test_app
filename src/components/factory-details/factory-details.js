import * as React from "react";
import { observer } from "mobx-react-lite";
import { Pie } from "react-chartjs-2";
import { useParams } from "react-router";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { ProductsContext } from "../../routes";
import { ErrorMsg } from "../ui/error-msg";

ChartJS.register(ArcElement, Tooltip, Legend);

export function FactoryDetails() {
  const store = React.useContext(ProductsContext);
  const { monthId, factoryId } = useParams();

  const pieData = React.useMemo(() => {
    if (!store.graph.dataset) {
      return null;
    }

    const target = store.graph.getDataWithParams(
      Number(factoryId),
      Number(monthId)
    );

    return target;
  }, [store.graph.dataset, store.graph, monthId, factoryId]);

  if (!pieData || !pieData.dataset) {
    return store.request.meta.isError ? (
      <ErrorMsg msg={store.request.meta.errorMsg} />
    ) : (
      <React.Fragment />
    );
  }

  return (
    <div className="factory-details">
      <h1>
        Production Statistics of Factory {pieData.factoryName} in{" "}
        {pieData.monthName} 
      </h1>
      <Pie data={pieData.dataset} />;
    </div>
  );
}

export default observer(FactoryDetails);
