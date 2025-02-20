import "./App.css";
import IndexRouter from "./routers/IndexRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <IndexRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
