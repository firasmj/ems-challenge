import { NavLink, useLocation } from "react-router";

type LinkProps = {
    to: string;
    text: string;
}

const Link:React.FC<LinkProps> = ({ to, text }) => {
    const location = useLocation();
    const isActive = location.pathname === (to);
    // const isActive = true;
    return(
        <NavLink
            to={to}
            className={`${isActive ? 'bg-gray-500 rounded-sm p-5 py-2 hover:text-blue-200' : 'hover:bg-gray-500 bg-transparent rounded-sm p-5 py-2 hover:text-white'}`}
            // className="hover:bg-gray-500 rounded-sm p-5 py-2 hover:text-white"
        >
            {text}
        </NavLink>
    )
}

const NavBar = () => {

    return (
        <div
            className="container w-screen mx-auto flex justify-around bg-gray-800 text-white p-5"
        >
            <Link to="/" text="Home" />
            <Link to="/employees" text="Employees" />
            <Link to="/timesheets" text="Timesheets" />
            <Link to="/employees/new" text="New Employee" />
            {/* <NavLink 
                to="/employees"
                className="hover:bg-gray-500 rounded-sm p-5 py-2 hover:text-white"
                >
                Employees
            </NavLink>
            <NavLink 
                to="/employees"
                className="bg-transparent rounded-sm p-5 py-2 hover:bg-white hover:text-black"
                >
                Employees
            </NavLink>
            <NavLink 
                to="/employees"
                className="bg-transparent rounded-sm p-5 py-2 hover:bg-white hover:text-black"
                >
                Employees
            </NavLink> */}
        </div>
    );
}

export default NavBar;