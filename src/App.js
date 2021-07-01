import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import Chart from "./components/Chart";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={Chart} />
      </BrowserRouter>
    </div>
  );
}

export default App;
