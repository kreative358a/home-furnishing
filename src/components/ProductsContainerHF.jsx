import { useLoaderData } from "react-router-dom";
import ProductsGridMy from "./ProductsGridMy";
import ProductsGridNew from "./ProductsGridNew";
import ProductsGridHF from "./ProductsGridHF";
import ProductsListHF from "./ProductsListHF";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import SectionTitle from "./SectionTitle";

const layouts = {
  grid: "grid",
  list: "list",
};

const getLayoutFromLocalStorage = () => {
  return localStorage.getItem("layout") || layouts.grid;
};

const ProductsContainerHF = () => {
  const { total, params } = useLoaderData();
  const totalProducts = total;
  // console.log("totalProducts", totalProducts);
  const [layout, setLayout] = useState(getLayoutFromLocalStorage);

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm sm:btn-md focus:border-none focus:outline-none box-shadow-around-sm-blue ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-based-content"
    }`;
  };

  const handleGrid = () => {
    setLayout("grid");
    localStorage.setItem("layout", "grid");
  };

  const handleList = () => {
    setLayout("list");
    localStorage.setItem("layout", "list");
  };

  return (
    <div className="pb-4">
      {/* HEADER */}

      <div className=" flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <div className="flex gap-x-2 bg-base-200/80 p-4 rounded-md">
          <button
            type="button"
            onClick={handleGrid}
            className={setActiveStyles("grid")}
          >
            <BsFillGridFill className="h-[1.2em] w-[1.2em] sm:h-[2em] sm:w-[2em]" />
          </button>
          <button
            type="button"
            onClick={handleList}
            // onClick={() => setLayout("list")}
            className={setActiveStyles("list")}
          >
            <BsList className="h-[1.2em] w-[1.2em] sm:h-[2em] sm:w-[2em]" />
          </button>
        </div>
      </div>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGridHF />
        ) : (
          // <ProductsGrid />
          <ProductsListHF />
        )}
      </div>
    </div>
  );
};
export default ProductsContainerHF;
