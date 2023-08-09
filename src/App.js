import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductsStore from "./store/products";
import useLocalStore from "./hooks/use-local-store";

import { ProductsGraph } from "./components/products-graph";
import { FactoryDetails } from "./components/factory-details";

import "./App.css";

//TODO: in /routes folder
export const ContextData = React.createContext();

function App() {
  const store = useLocalStore(ProductsStore);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <ContextData.Provider value={store}>
                <ProductsGraph />
              </ContextData.Provider>
            }
          />

          <Route
            path="/factory"
            element={
              <ContextData.Provider value={store}>
                <FactoryDetails />
              </ContextData.Provider>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
