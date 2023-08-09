import * as React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { ContextData } from "../../App";
import { createDataset } from "./utils";
import { ChartOptions, Months } from "./constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ProductsGraph() {
  const store = React.useContext(ContextData);

  const data = React.useMemo(() => {
    //TODO: in store, get rid of memo
    const dataset = createDataset(store.data);
    const dataFromDataset = Object.values(dataset);

    const config = {
      labels: Months,
      datasets: dataFromDataset,
    };

    return config;
  }, [store.data]);

  return (
    <>
      <Bar options={ChartOptions} data={data} />;
      {/* {store.data.map((element) => (
        <Link to={`/factory?id=${element.factoryId}`}>
          <span>hey </span>
        </Link>
      ))} */}
    </>
  );
}

export default observer(ProductsGraph);
