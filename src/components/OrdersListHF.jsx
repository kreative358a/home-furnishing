import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);
import { useDispatch } from "react-redux";
import { removeItem } from "../features/checkout/checkoutSlice";

const OrdersListHF = () => {
  const orders = useSelector((state) => state.checkoutState.checkoutItems);

  const dispatch = useDispatch();
  const removeItemFromTheOrders = () => {
    dispatch(removeItem({ cartID }));
  };

  // const { orders, meta } = useLoaderData();

  return (
    <div className="mt-8">
      <h4 className="mb-4 capitalize">total orders :</h4>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className="hidden sm:block">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order.checkoutId;
              const { name, address, numItemsInCart, orderTotal, createdAt } =
                order;
              // const date = day(createdAt).format('hh:mm a - MMM Do, YYYY');
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className="hidden sm:block">{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersListHF;
