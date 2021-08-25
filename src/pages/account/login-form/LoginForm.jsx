import {Form, FormGroup} from "react-bootstrap";


const LoginForm = () => {
    return (
        <Form>
            <FormGroup>
                <Form.Label>Login</Form.Label>
            </FormGroup>
            <FormGroup>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </FormGroup>
            <FormGroup>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </FormGroup>
        </Form>
    );
}

export default LoginForm;