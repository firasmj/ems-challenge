import { NavLink, useLocation } from "react-router";

type LinkProps = {
    to: string;
    text: string;
}

const Link: React.FC<LinkProps> = ({ to, text }) => {
    const location = useLocation();
    const isActive = location.pathname === (to);
    return (
        <NavLink
            to={to}
            className={`${isActive ? 'bg-gray-500 rounded-sm p-5 py-2 hover:text-blue-200' : 'hover:bg-gray-500 bg-transparent rounded-sm p-5 py-2 hover:text-white'}`}
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
            <Link to="/employees" text="Employees" />
            <Link to="/timesheets" text="Timesheets" />
            <Link to="/employees/new" text="New Employee" />
            <Link to="/timesheets/new" text="New Timesheet" />
        </div>
    );
}

export default NavBar;