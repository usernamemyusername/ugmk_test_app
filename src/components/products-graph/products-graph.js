import * as React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";

import { ContextData } from "../../App";
import { ChartOptions } from "./constants";
import { Selector } from "../ui/selector";

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
  const chartRef = React.useRef();
  const navigate = useNavigate();

  const onClick = (event) => {
    const element = getElementAtEvent(chartRef.current, event)[0];

    if (!element) {
      return;
    }

    const { index, datasetIndex } = element;

    if (index === undefined || datasetIndex === undefined) {
      return;
    }

    navigate({
      pathname: "/factory",
      search: `?factoryId=${datasetIndex}&month=${index}`,
    });
  };

  if (!store.graph.dataset) {
    return <React.Fragment />;
  }

  return (
    <>
      <Selector name="selector" context={store.graph.selector} />
      <Bar
        ref={chartRef}
        options={ChartOptions}
        data={store.graph.dataset}
        onClick={onClick}
      />
    </>
  );
}

export default observer(ProductsGraph);
