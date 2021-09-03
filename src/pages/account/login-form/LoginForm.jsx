import {Button, Form, FormGroup} from "react-bootstrap";
import {useAuth} from "../../../services/context-provider/ServiceProvider";
import {useEffect, useState} from "react";


const LoginForm = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const authService = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const cb = (status) => {
            setAuthenticated(status);
        };
        let unsubscribe = authService.subscribe(cb);
        return () => {
            unsubscribe();
        };
    }, [authService, setAuthenticated]);

    const [errorMessage, setErrorMessage] = useState("");

    const checkInputs = () => {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            if (password.length >= 8) {
                return true;
            }
            else {
                setErrorMessage("Password too short");
                return false;
            }
        }
        else {
            setErrorMessage("Invalid email");
            return false;
        }
    }

    const handleLogin = async () => {
        if (checkInputs()) {
            let authRequest = {
                isDriver: true,
                password: password,
                email: email
            };

            let errorCode = await authService.login(authRequest);
            if (errorCode) {
                switch (errorCode) {
                    case 401:
                        setErrorMessage("Incorrect email or password");
                        break;
                    default:
                        setErrorMessage("Failed to connect to server");
                }
            }
        }
    }

    return <>{authenticated ? "" : (
        <div style={{width: 250, padding:10}}>
            <Form>
                <FormGroup>
                    <Form.Label style={{fontSize: 25}}>Login</Form.Label>
                </FormGroup>
                <div style={{color: "red"}}>{errorMessage}</div>
                <FormGroup>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                </FormGroup>
                <div style={{paddingTop: 10}}>
                    <Button onClick={() => handleLogin()}>Login</Button>
                </div>
            </Form>
        </div>
    )}</>;
}


export default LoginForm;