import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import FormInputCheckout from "./FormInputCheckout";
import SubmitBtn from "./SubmitBtn";
import { customFetchStrapi, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addItem } from "../features/checkout/checkoutSlice";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
      checkoutId: nanoid(),
    };

    try {
      const response = await customFetchStrapi.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      queryClient.removeQueries(["orders"]);
      store.dispatch(clearCart());
      toast.success("order placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect("/login");
      return null;
    }

    // queryClient.removeQueries(["orders"]);
    // store.dispatch(clearCart());

    // toast.success("order placed successfully");
    // return redirect("/orders");
  };

const CheckoutFormHF = () => {
  const { numItemsInCart, cartItems, orderTotal } = useSelector(
    (state) => state.cartState
  );

  const [formShipping, setFormShipping] = useState({ name: "", address: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToOrders = () => {
    dispatch(addItem({ order: infoOrder }));
  };

  const handleChange = (e) => {
    setFormShipping({ ...formShipping, [e.target.name]: e.target.value });
  };

  // const handleClick = () => {
  //   setFormShipping({ ...formShipping, [e.target.name]: e.target.value });
  //   const { name, address } = formShipping;
  //   const info = {
  //     name,
  //     address,
  //     chargeTotal: orderTotal,
  //     orderTotal: formatPrice(orderTotal),
  //     cartItems,
  //     numItemsInCart,
  //     checkoutId: nanoid(),
  //   };
  //   dispatch(clearCart());
  //   console.log("info: ", info);

  //   toast.success("order placed successfully");
  //   navigate("/orders");
  //   // return redirect("/orders");
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormShipping({ ...formShipping, [e.target.name]: e.target.value });
    const { name, address } = formShipping;
    const infoOrder = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
      checkoutId: nanoid(),
    };
    addToOrders();
    dispatch(clearCart());
    console.log("infoOrder: ", infoOrder);

    toast.success("order placed successfully");
    navigate("/orders");
  };
  return (
    <div>
      <Form
        method="POST"
        className="flex flex-col gap-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <h4 className="font-medium text-xl capitalize">
            shipping information
          </h4>
          <FormInputCheckout
            label="first name"
            name="name"
            type="text"
            required={true}
            onChange={handleChange}
          />
          <FormInputCheckout
            label="address"
            name="address"
            type="text"
            required={true}
            onChange={handleChange}
          />
          <div className="mt-4">
            <SubmitBtn text="place your order" />
            {/* <Link
            // to="/orders"
            className="btn btn-primary btn-block mt-8"
            onClick={handleClick}
          >
            proceed to orders
          </Link> */}
          </div>
        </div>
      </Form>
      {/* <div className="lg:col-span-4 lg:pl-4">
        {user ? (
          <Link to="/checkout" className="btn btn-primary btn-block mt-8">
            proceed to checkout
          </Link>
        ) : (
          <Link to="/login" className="btn btn-primary btn-block mt-8">
            please login
          </Link>
        )}
      </div> */}
    </div>
  );
};

export default CheckoutFormHF;
