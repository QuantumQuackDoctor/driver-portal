import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/home/HomePage";
import AccountPage from "./pages/account/AccountPage"
import OrderPage from "./pages/orders/OrderPage"

function App() {
  return (
      <BrowserRouter>
          <Switch>
            <Route exact path={["/", "/home"]} component={HomePage} />
            <Route path="/account" component={AccountPage} />
            <Route path="/orders" component={OrderPage} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
