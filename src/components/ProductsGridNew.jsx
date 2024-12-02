import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";
import { useEffect, useState } from "react";
// import { nanoid } from 'nanoid';
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
// import Categories from "./Categories/Categories";
// import Search from "./Search/Search";
// import Sort from "./Sort/Sort";
// import { chosePage, selectFilter } from "/redux/Slices/filterSlice";
import { useSelector } from "react-redux";
import FormInput from "./FormInput";
import FormInputMy from "./FormInputHF";
import FormSelect from "./FormSelect";
import FormSelectMy from "./FormSelectHF";

const categories = ["all", "Tables", "Chairs", "Kids", "Sofas", "Beds"];
// const companies = [all, Modenza, Luxora, Artifex, Comfora, Homestead];
const companies = [
  "all",
  "Modenza",
  "Luxora",
  "Artifex",
  "Comfora",
  "Homestead",
];

const ProductsGridNew = () => {
  const { products } = useLoaderData();
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState(null);
  const [category, setCategory] = useState(null);
  const n = 3;

  // useEffect(() => {
  //   getProducts(products);
  // }, []);

  // const getProducts = (products) => {
  //   setArticles(products);
  // };

  // const byCategory = (article, category) => {
  //   if (category && category != "all") {
  //     return article.attributes.category === category;
  //   } else return article;
  // };
  // const bySearch = (article, search) => {
  //   if (search) {
  //     console.log(search);
  //     // return article.title.includes(search);
  //     return article.attributes.title
  //       .toLowerCase()
  //       .includes(search.toLowerCase());
  //   } else return article;
  // };

  // // const filteredList = (articles, category, search) => {
  // const filteredList = (articles, category, search) => {
  //   return articles
  //     .filter((article) => byCategory(article, category))
  //     .filter((article) => bySearch(article, search));
  // };

  useEffect(() => {
    setArticles(products);
  }, [products]);

  useEffect(() => {
    setFilterData(
      products.filter((article, index) => {
        return (index >= page * n) & (index < (page + 1) * n);
      })
    );
  }, [page]);

  console.log("products.length: ", products.length);
  return (
    <>
      {/* <div className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        <FormInputMy
          type="search"
          label="search product"
          name="search"
          size="input-sm"
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormSelectMy
          label="select category"
          name="category"
          list={categories}
          size="select-sm"
          defaultValue={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div> */}
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filterData &&
          filterData.map((article, index) => {
            {
              /* {filterData &&
          filteredList(articles, category, search).map((article, index) => { */
            }
            const { title, price, image } = article.attributes;
            const dollarsAmount = formatPrice(price);
            return (
              <Link
                key={article.id}
                to={`/products/${article.id}`}
                className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
              >
                <figure className="px-4 pt-4">
                  <img
                    src={image}
                    alt={title}
                    className="rounded-xl h-auto max-h-96 md:max-h-48 w-full object-cover"
                    // className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title capitalize tracking-wider">
                    {title}
                  </h2>
                  <span className="text-secondary">{dollarsAmount}</span>
                </div>
              </Link>
            );
          })}
        <ReactPaginate
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          onPageChange={(event) => setPage(event.selected)}
          breakLabel="..."
          pageCount={Math.ceil(articles.length / n)}
          previousLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
        />
      </div>
    </>
  );
};
export default ProductsGridNew;
