import {Form, FormGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useAuth} from "../../../services/context-provider/ServiceProvider";
import {getCurrentDriver} from "../../../services/DriverService";



const DriverPage = ({ authenticated }) => {
    const [currentDriver, setCurrentDriver] = useState({
        id: 0,
        email: "",
        DOB: "",
        firstName: "",
        lastName: "",
        phone: "",
        veteranStatus: "",
        points: 0,
        settings: {
            notifications: {
                email: false,
                text: false,
            },
            theme: "light",
        },
    });
    const authService = useAuth();
    useEffect(() => {
        if (authenticated) {
            getCurrentDriver().then((res) => {
                setCurrentDriver(res.data);
            });
        }
    }, [authenticated]);


    return (
        <>
            {authenticated ? (
            <div>
                <div></div>
                <p>{currentDriver.firstName}</p>
                <p>{currentDriver.lastName}</p>
                <p>{currentDriver.email}</p>
                <button onClick={() => authService.logout()}>Logout</button>
            </div>
            ) : (
                ""
            )}
        </>
    );
}

export default DriverPage;