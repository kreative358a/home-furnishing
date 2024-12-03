import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { logoutUser } from "../features/user/userSlice";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.userState.user);

  const handleLogout = () => {
    navigate("/");
    dispatch(clearCart());
    dispatch(logoutUser());
    queryClient.removeQueries();
  };

  return (
    <header
      style={{
        minWidth: "100%",
        position: "fixed",
        zIndex: 11,
        display: "flex",
        top: 0,
        height: '40px'
      }}
      className="bg-neutral/90 py-2 text-neutral-content "
    >
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-base sm:text-lg">Hello, {user.username}</p>
            {/* <p className="text-sm sm:text-base">Hello, Test User</p> */}
            <button
              className="btn btn-sm btn-primary text-base"
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-sm sm:text-base">
              Sign in / Guest
            </Link>
            <Link
              to="/register"
              className="link link-hover text-sm sm:text-base"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
