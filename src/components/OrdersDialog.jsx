const OrdersDialog = ({ id, cartItems, formatPrice }) => {
  return (
    <dialog id={`my_modal_${id}`} className="modal fixed z-10">
      <div className="modal-box border-2 border-primary/60 w-11/12 max-w-5xl">
        <p>orderId: {id}</p>
        {cartItems.map((cartItem) => {
          const { cartID, title, price, image, amount, company, productColor } =
            cartItem;
          return (
            <article
              key={cartID}
              className="my-2 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 p-2 pb-4 last:border-b-0 border-2 border-blue-500/5 hover:border-2 hover:border-blue-500/20 rounded-md"
            >
              <img
                src={image}
                alt={title}
                className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
              />

              <div className="sm:ml-16 sm:w-48">
                <h3 className="capitalize font-medium">{title}</h3>

                <h4 className="mt-2 capitalize text-sm text-neutral-content">
                  {company}
                </h4>

                <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                  color :
                  <span
                    className="badge badge-sm box-shadow-around-sm"
                    style={{ backgroundColor: productColor }}
                  ></span>
                  <span className="ml-2">{productColor}</span>
                </p>
              </div>
              <div className="sm:ml-12">
                <div className="form-control max-w-xs">
                  <label htmlFor="amount" className="label p-0">
                    <span className="label-text">Amount: {amount}</span>
                  </label>
                  <label htmlFor="amount" className="label p-0">
                    <span> cartID: {cartID}</span>
                  </label>
                </div>
              </div>

              <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
            </article>
          );
        })}
      </div>
      <form
        method="dialog"
        className="modal-backdrop"
        style={{ border: "none", outline: "none" }}
      >
        <button></button>
      </form>
    </dialog>
  );
};
export default OrdersDialog;
