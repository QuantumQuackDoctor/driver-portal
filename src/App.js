import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/home/HomePage";

function App() {
  return (
      <BrowserRouter>
          <Switch>
            <Route exact path={["/", "/home"]} component={HomePage} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
