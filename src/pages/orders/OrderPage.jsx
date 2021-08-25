import Header from "../../shared/header/Header";
import DisplayOrdersPage from "../orders/display-orders/DisplayOrdersPage";
import {Route} from "react-router-dom";

const OrderPage = () => {
    return <Header>
        <Route path="/orders" component={DisplayOrdersPage} />
    </Header>;
};

export default OrderPage;