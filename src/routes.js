import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductsStore from "./store/products";
import useLocalStore from "./hooks/use-local-store";

import { ProductsGraph } from "./components/products-graph";
import { FactoryDetails } from "./components/factory-details";

import "./App.css";

export const ProductsContext = React.createContext();

function AppRoutes() {
  const store = useLocalStore(ProductsStore);

  return (
    <BrowserRouter>
      <ProductsContext.Provider value={store}>
        <Routes>
          <Route path="/" element={<ProductsGraph />} />
          <Route
            path="/detail/:factoryId/:monthId"
            element={<FactoryDetails />}
          />
        </Routes>
      </ProductsContext.Provider>
    </BrowserRouter>
  );
}

export default AppRoutes;
