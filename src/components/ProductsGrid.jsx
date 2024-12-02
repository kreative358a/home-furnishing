import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";
import ProductDialog from "./ProductDialog";
const ProductsGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const id = product.id;
        const { title, price, image } = product.attributes;
        const dollarsAmount = formatPrice(price);
        return (
          <div
            key={id}
            // to={`/products/${id}`}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={title}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              <span className="text-secondary">{dollarsAmount}</span>
              <p
                className="px-1 pb-0.5 w-20 border-2 border-secondary/60 hover:border-secondary/80 align-center cursor-pointer text-center rounded bg-secondary/40 hover:bg-secondary/60 text-red-600"
                onClick={() =>
                  document.getElementById(`my_modal_${id}`).showModal()
                }
              >
                content
              </p>
              <ProductDialog id={id} product={product} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
