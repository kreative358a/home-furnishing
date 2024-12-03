import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useState, useEffect } from "react";
import CartDialog from "./CartDialog";

// useSelector A hook to access the redux store's state. This hook takes a selector function as an argument. The selector is called with the store state. This hook takes an optional equality comparison function as the second parameter that allows you to customize the way the selected state is compared to determine whether the component needs to be re-rendered.
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/user/userSlice";

// const themes = {
//   winter: "winter",
//   night: "night",
// };

// const getThemeFromLocalStorage = () => {
//   return localStorage.getItem("theme") || themes.winter;
// };

const Navbar = () => {
  // const [theme, setTheme] = useState(themes.winter)
  // const [theme, setTheme] = useState(getThemeFromLocalStorage);
  // const handleTheme = () => {
  //   const { winter, night } = themes;
  //   const newTheme = theme === winter ? night : winter;
  //   document.documentElement.setAttribute("data-theme", theme);
  //   setTheme(newTheme);
  // };

  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  const basketId = "my_modal_basket";

  return (
    <nav
      className="bg-base-200/80"
      style={{
        minWidth: "100%",
        height: "auto",
        position: "fixed",
        zIndex: 11,
        top: "40px",
        display: "flex",
      }}
    >
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center font-['Georgia']"
          >
            HF
          </NavLink>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* THEME SETUP */}
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />
            {/* sun icon*/}
            <BsSunFill className="swap-on h-4 w-4" />
            {/* moon icon*/}
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
          {/* CART LINK */}
          {/* <NavLink to="/cart" target="_blank" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numItemsInCart}
              </span>
            </div>
          </NavLink> */}
          <div
            className="btn btn-ghost btn-circle btn-md ml-4 pointer"
            onClick={() => document.getElementById(basketId).showModal()}
          >
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numItemsInCart}
              </span>
            </div>
          </div>
          <CartDialog basketId={basketId} />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
