import {
  Filters,
  FiltersMy,
  PaginationContainer,
  ProductsContainer,
  ProductsContainerMy,
  PaginationContainerHF,
} from "../components";
import { customFetchHF } from "../utils";
import { useState, useEffect } from "react";

// const url = "/products";
// const url =
//  "/keywordSearch?countryCode=us&languageCode=en&keyword=best-sellers";

const url = `/keywordSearch?countryCode=us&languageCode=en&keyword=best-sellers`;

const allProductsQuery = (queryParams) => {
  const { keyword, search, category, company, sort, price, shipping, page } =
    queryParams; // || "best-sellers";

  if (keyword) {
    return {
      queryKey: [
        "products",
        // "keywordSearch",
        keyword ?? "",
        // search ?? '',
        category ?? "all",
        // company ?? "all",
        sort ?? "a-z",
        price ?? 1000,
        // shipping ?? false,
        page ?? 1,
      ],

      queryFn: () =>
        customFetchHF(url.split("&keyword=")[0], {
          params: queryParams,
        }),
    };
  } else {
    return {
      queryKey: [
        "products",
        // "keywordSearch",
        //keyword ?? "",
        // search ?? '',
        category ?? "all",
        // company ?? "all",
        sort ?? "a-z",
        price ?? 1000,
        // shipping ?? false,
        page ?? 1,
      ],

      queryFn: () =>
        customFetchHF(url, {
          params: queryParams,
        }),
    };
  }
};
// const startUrl = `${url}&keyword=best-sellers`;
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log("params: ", params);
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );

    const products = response.data;
    console.log("products: ", products);

    const total = response.data.length;

    // console.log("1. pageCount", pageCount);
    // console.log("1. page", page);
    // console.log("1. total", total);
    sessionStorage.setItem("products", JSON.stringify(products));
    sessionStorage.setItem("total", total);
    sessionStorage.setItem("params", params);
    return { products, total, params };
  };

const Products = () => {
  // const [parameter, setParameter] = useState(getParameterFromLocalStorage);
  // useEffect(() => {
  //   setParameter("sel");
  //   localStorage.setItem("parameter", "&keyword=best-sellers");
  // }, []);

  return (
    <>
      <FiltersMy />
      <ProductsContainerMy />
    </>
  );
};
export default Products;
