import { createContext, useContext } from "react";
import AuthService from "../AuthService";

const ServiceContext = createContext();

const ServiceProvider = ({ children }) => {
    const services = {
        authentication: new AuthService(),
    };

    return (
        <ServiceContext.Provider value={services}>
            {[children].flat()}
        </ServiceContext.Provider>
    );
};

/**
 *
 * @returns {AuthService}
 */
export const useAuth = () => {
    return useContext(ServiceContext).authentication;
};

export default ServiceProvider;
