import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import ReactModal from "react-modal";
import { useState } from "react";
import { formatPrice } from "../utils";
import OrdersDialog from "./OrdersDialog";
day.extend(advancedFormat);

const OrdersList = () => {
  const { orders, meta } = useLoaderData();
  const [modalIsOpen, setIsOpen] = useState(false);

  console.log("orders: ", orders);

  return (
    <div className="mt-4">
      <h4 className="mb-4 capitalize">
        total orders : {meta.pagination.total}
      </h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-sm">
              <th>Name</th>
              <th className="hidden md:block">Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden md:block">Date</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order.id;
              const {
                name,
                address,
                numItemsInCart,
                orderTotal,
                createdAt,
                cartItems,
              } = order.attributes;
              const date = day(createdAt).format("hh:mm a - MMM Do, YYYY");
              return (
                <tr
                  className="border-2 rounded-md border-secondary/20 hover:border-secondary/40"
                  key={id}
                >
                  <td className="">{name}</td>
                  <td style={{ lineHeight: 2 }} className="hidden sm:block">
                    {address}
                  </td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td style={{ lineHeight: 2 }} className="hidden sm:block">
                    {date}
                  </td>
                  <td>
                    <p
                      className="px-1 pb-0.5 w-20 border-2 border-secondary/60 hover:border-secondary/80 align-center cursor-pointer text-center rounded bg-secondary/40 hover:bg-secondary/60 text-red-600"
                      onClick={() =>
                        document.getElementById(`my_modal_${id}`).showModal()
                      }
                    >
                      content
                    </p>
                    <OrdersDialog
                      id={id}
                      cartItems={cartItems}
                      formatPrice={formatPrice}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersList;
