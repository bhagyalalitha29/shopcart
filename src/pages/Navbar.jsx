
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="hamburger" onClick={() => setOpen((v) => !v)}>
        <div className={open ? "bar bar1 open" : "bar bar1"}></div>
        <div className={open ? "bar bar2 open" : "bar bar2"}></div>
        <div className={open ? "bar bar3 open" : "bar bar3"}></div>
      </div>
      <nav className={open ? "nav-links open" : "nav-links"}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}
          onClick={() => setOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/addProduct"
          className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}
          onClick={() => setOpen(false)}
        >
          Add product
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}
          onClick={() => setOpen(false)}
        >
          View products
        </NavLink>
      </nav>
    </>
  );
}

export default Navbar;
