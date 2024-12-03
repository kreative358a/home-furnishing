import { useSelector } from "react-redux";
import { CartItemsList, SectionTitle, CartTotals } from "../components";
import { Link } from "react-router-dom";
import { useNavigate, useNavigation } from "react-router-dom";

const CartDialog = ({ basketId }) => {
  const user = useSelector((state) => state.userState.user);
  const navigate = useNavigate();

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  const handleCheckoutClose = () => {
    setTimeout(() => {
      navigate("/checkout");
    }, 100);
  };

  const handleLoginClose = () => {
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };
  //   if (numItemsInCart === 0) {
  //     return <SectionTitle text="Your cart is empty" />;
  //   }

  return (
    // <dialog id={basketId} className="modal">

    <dialog id={basketId} className="modal">
      <div className="modal-box min-w-[90%] h-auto">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm text-xl btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <SectionTitle text="Shopping Cart" />
        {numItemsInCart === 0 ? (
          <SectionTitle text="Your cart is empty" />
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <CartItemsList />
            </div>
            <div className="lg:col-span-4 lg:pl-4">
              <CartTotals />
              {user ? (
                // <Link
                //   to="/checkout"
                //   // className="btn btn-primary btn-block mt-8"
                // >
                <div className="modal-action w-[100%] mb-4">
                  <form method="dialog" className="w-[100%]">
                    {/* <div className="min-w-[100%] border-2 border-red-500"> */}
                    <button
                      className="btn btn-primary btn-block mt-4 "
                      onClick={handleCheckoutClose}
                    >
                      proceed to checkout
                    </button>
                    {/* </div> */}
                  </form>
                </div>
              ) : (
                // </Link>
                <div className="modal-action w-[100%] mb-4">
                  <form method="dialog" className="w-[100%]">
                    <button
                      className="btn btn-primary btn-block mt-4 "
                      onClick={handleLoginClose}
                    >
                      please login
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
};
export default CartDialog;
