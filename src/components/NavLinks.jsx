import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "about", text: "about" },
  //  { id: 3, url: "products", text: "products" },
  { id: 4, url: "products-hf", text: "products-hf" },
  { id: 5, url: "cart", text: "cart" },
  { id: 6, url: "checkout", text: "checkout" },
  { id: 7, url: "orders", text: "orders" },
];

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        if ((url === "checkout" || url === "orders") && !user) return null;
        return (
          <li key={id}>
            <NavLink className="capitalize text-base" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
