import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header clearfix">
      <img className="header-logo" src="/images/logo.jpg" alt="Shop Parts" />
      <nav className="header-nav" aria-label="Navigare principală">
        <NavLink exact className="header-nav-link" to="/" activeClassName="selected">Home</NavLink>
        <NavLink className="header-nav-link" to="/produs-getAll" activeClassName="selected">All Products DB</NavLink>
        <NavLink className="header-nav-link" to="/your-cart" activeClassName="selected">Your Cart</NavLink>
        <NavLink className="header-nav-link" to="/add-products" activeClassName="selected">Add Products</NavLink>
      </nav>
    </header>
  );
}
