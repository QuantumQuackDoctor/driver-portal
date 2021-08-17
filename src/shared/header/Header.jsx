import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import {
    FaBars,
    FaTimes,
    FaHome,
    FaUserEdit,
    FaReceipt,
} from "react-icons/fa";
import { useEffect, useState } from "react";

//Add navigation links here !!!!
const paths = [
    { name: "Home", icon: <FaHome />, path: "/home" },
    { name: "Orders", icon: <FaReceipt />, path: "/orders" },
    { name: "Account", icon: <FaUserEdit />, path: "/account" },
];
const Header = ({ children }) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const toggleOpen = () => {
        setOpen(!open);
    };
    useEffect(() => {
        if (window.innerWidth > 800 && open === false) setOpen(true);
    }, [open]);
    return (
        <div className="Header-container">
            <div className="Header-spacer">{children}</div>
            <nav className="Header-nav">
                {!open ? (
                    <FaBars
                        onClick={toggleOpen}
                        style={{ fontSize: "1.5em", color: "var(--color-light)" }}
                    />
                ) : (
                    <FaTimes
                        onClick={toggleOpen}
                        style={{ fontSize: "1.5em", color: "var(--color-light)" }}
                    />
                )}
                <div className={open ? "Header-links-open" : "Header-links"}>
                    {paths.map((data, index) => {
                        let classes =
                            location.pathname === data.path
                                ? "Header-link Header-link-open"
                                : "Header-link";
                        return (
                            <Link to={data.path} key={index} className={classes}>
                                {data.icon}
                                <span className="Header-margin-left">{data.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default Header;