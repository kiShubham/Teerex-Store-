import "./App.css";
import Checkout from "./components/Checkout";
import Product from "./components/Product";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={1}>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} exact />
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;
