import Header from "../../shared/header/Header";
import DisplayOrdersPage from "../orders/display-orders/DisplayOrdersPage";
import {Route} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../../services/context-provider/ServiceProvider";
import LoginForm from "../account/login-form/LoginForm";
import DriverPage from "../account/driver-page/DriverPage";

const OrderPage = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const authService = useAuth();
    useEffect(() => {
        let unsubscribe = authService.subscribe((authStatus) => {
            setAuthenticated(authStatus);
        });
        return () => {
            unsubscribe();
        };
    }, [authService, authenticated, setAuthenticated]);
    return (
        <Header>
            <DisplayOrdersPage authenticated={authenticated} />
        </Header>
    );
};

export default OrderPage;