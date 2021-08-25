import Header from "../../shared/header/Header";
import {Route} from "react-router-dom";
import LoginForm from "./login-form/LoginForm";

const
    AccountPage = () => {
    return <Header>
        <Route path="/account" component={LoginForm} />
    </Header>;
};

export default AccountPage;

