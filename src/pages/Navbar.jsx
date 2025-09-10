import { NavLink } from "react-router-dom";
import "./Navbar.css"; // create a css file

function Navbar() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}
      >
        Home
      </NavLink>

      <NavLink
        to="/addProduct"
        className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}
      >
        Add product
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}
      >
        View products
      </NavLink>
    </nav>
  );
}

export default Navbar;
