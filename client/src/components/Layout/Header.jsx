import React, { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { BsCartDash } from "react-icons/bs";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../../pages/components/SearchInput";
import { useCategoy } from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategoy();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };
  return (
    <>
      <div className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand">
              <img src={logo} alt="logo" />
            </NavLink>
            <div className="ms-auto">
              <SearchInput />
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  data-bs-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01"
                  aria-label="Toggle navigation"
                >
                  Category
                </div>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink to="/categories" className="dropdown-item">
                      All categories
                    </NavLink>
                  </li>
                  {categories?.map((category) => {
                    return (
                      <li key={category._id}>
                        <NavLink
                          to={`/category/${category?.slug}`}
                          className="dropdown-item"
                        >
                          {category?.name}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Sign up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Sign in
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <div
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    data-bs-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-label="Toggle navigation"
                  >
                    {auth.user.name}
                  </div>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        className="dropdown-item"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
            <div className="cart" onClick={() => navigate("/cart")}>
              <div className="cart-item">
                <div className="cart-icon">
                  <BsCartDash />
                </div>
                <div className="cart-number">{cart?.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
