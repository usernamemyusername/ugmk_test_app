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

import { Selector } from "../ui/selector";
import { ProductsContext } from "../../routes";
import { ErrorMsg } from "../ui/error-msg";

import { ChartOptions } from "./constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ProductsGraph() {
  const store = React.useContext(ProductsContext);
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
      pathname: `/detail/${datasetIndex}/${index}`,
    });
  };

  if (!store.graph.dataset) {
    return store.request.meta.isError ? (
      <ErrorMsg msg={store.request.meta.errorMsg} />
    ) : (
      <React.Fragment />
    );
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <Selector
          name="selector"
          title="Production type Filter"
          context={store.graph.selector}
        />
        <Bar
          ref={chartRef}
          options={ChartOptions}
          data={store.graph.dataset}
          onClick={onClick}
        />
      </React.Fragment>
    </React.Fragment>
  );
}

export default observer(ProductsGraph);
