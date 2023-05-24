import "./App.css";
import Product from "./components/Product";
import { SnackbarProvider, useSnackbar } from "notistack";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={1}>
        <Product />
      </SnackbarProvider>
    </div>
  );
}

export default App;
