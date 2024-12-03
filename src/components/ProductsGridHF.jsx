import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { formatPrice } from "../utils";
import { useEffect, useState, useMemo } from "react";
// import { nanoid } from 'nanoid';
// import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

// import Search from "./Search/Search";
// import Sort from "./Sort/Sort";
// import { chosePage, selectFilter } from "/redux/Slices/filterSlice";
import { useSelector } from "react-redux";
import FormInput from "./FormInput";
import FormInputHF from "./FormInputHF";
import FormSelect from "./FormSelect";
import FormSelectHF from "./FormSelectHF";
import Pagination from "./Pagination";
import SectionTitle from "./SectionTitle";
import FormRangeHF from "./FormRangeHF";
import { nanoid } from "nanoid";
import ProductDialogHF from "./ProductDialogHF";

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

const pages = [12, 24, 48];

const sorts = ["a-z", "z-a", "low-high", "high-low"];

const getArticlesPerPageFromLocalStorage = () => {
  console.log(
    'localStorage.getItem("articlesPerPage")',
    localStorage.getItem("articlesPerPage")
  );
  return localStorage.getItem("articlesPerPage") || 24;
};

// const getSelectSortFromLocalStorage = () => {
//   console.log(
//     'localStorage.getItem("selectSort")',
//     localStorage.getItem("selectSort")
//   );
//   return localStorage.getItem("selectSort") || "a-z";
// };

const getSelectCategoryFromLocalStorage = () => {
  // console.log(
  //   'localStorage.getItem("selectCategory")',
  //   localStorage.getItem("selectCategory")
  // );
  return localStorage.getItem("selectCategory") || "all";
};

// const getSearchArticleFromLocalStorage = () => {
//   console.log(
//     'localStorage.getItem("searchArticle")',
//     localStorage.getItem("searchArticle")
//   );
//   return localStorage.getItem("searchArticle") || "";
// };

// const getCopyDataFromLocalStorage = () => {
//   console.log(
//     'localStorage.getItem("searchArticle")',
//     localStorage.getItem("searchArticle")
//   );
//   return localStorage.getItem("dataCopy") || [];
// };

// SelectCategory
const byteSize = (str) => new Blob([str]).size;

const ProductsGridHF = () => {
  const { products } = useLoaderData();

  const maxPrice = 5000;

  const [hfApi, setHFApi] = useState([]);
  const [data, setData] = useState([]); // add your data to here
  // const [dataCopy, setDataCopy] = useState(getCopyDataFromLocalStorage);
  const [dataCopy, setDataCopy] = useState([]);
  const [selectedLength, setSelectedLength] = useState(data.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(
    getArticlesPerPageFromLocalStorage
  );
  // const [articlesPerPage, setArticlesPerPage] = useState(3);
  const [searchArticle, setSearchArticle] = useState(
    // getSearchArticleFromLocalStorage
    ""
  );
  const [selectCategory, setSelectCategory] = useState(
    // getSelectCategoryFromLocalStorage
    "all"
  );
  // const [selectSort, setSelectSort] = useState(getSelectSortFromLocalStorage);
  const [selectSort, setSelectSort] = useState("a-z");
  const [pageNumber, setPageNumber] = useState(1);
  const [showProductList, setShowProductList] = useState([]);
  // const [selectedMinPrice, setSelectedMunPrice] = useState(parseInt(price) || 0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(maxPrice);
  const [currentPath, setCurrentPath] = useState("");

  const { pathname, search } = useLocation();
  const uselocation = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectSort("a-z");
    setSearchArticle("");
    setSelectCategory("all");
    setSelectedMaxPrice(5000);
    // setArticlesPerPage(24);

    let newData = products.sort((a, b) =>
      a.imageAlt.toLowerCase() > b.imageAlt.toLowerCase()
        ? 1
        : b.imageAlt.toLowerCase() > a.imageAlt.toLowerCase()
        ? -1
        : 0
    );
    const dataSize = byteSize(newData) / 1024;
    // console.log("dataSize.toFixed(2): ", dataSize.toFixed(2));
    setData(newData); // set your data to state
    setDataCopy(newData);
    // console.log(" useEffect hfApi");
    let hfApi = renderData(newData); // render your component
    // console.log("1. hfApi.length: ", hfApi.length);
    setHFApi(hfApi); // set it to state
  }, []);

  const renderData = (data) => {
    return data.map((product) => {
      setSelectedLength(data.length);
      // let newDataCopy = dataCopy;
      // setDataCopy(newDataCopy);
      const { typeName, name, price, image, url, imageAlt, categoryPath } =
        product;
      const id = product.id;
      // const dollarsAmount = formatPrice(price);
      const dollarsAmount = price.currentPrice;
      const categoryName = categoryPath[1].name;
      return (
        <div
          key={id}
          // key={nanoid()}
          // to={`/products-hf/${item.id}`}
          className="card w-full shadow-xl hover:shadow-2xl transition duration-300 border-2 hover:border-2 border-blue-300/10 hover:border-blue-300/40 rounded-md bg-base-200/80 hover:bg-base-200/90"
          // target="_blank"
        >
          <figure className="px-4 pt-4">
            <img
              src={image}
              alt={imageAlt}
              className="rounded-xl h-auto w-full object-cover border-2 border-slate-500/20"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title capitalize tracking-wider">{imageAlt}</h2>
            <h4 className="capitalize text-md text-neutral-content pt-2">
              Home Furnishings
            </h4>
            <span className="text-secondary">${dollarsAmount.toFixed(2)}</span>
            <span className="text-secondary">category: {categoryName}</span>
            <div className="py-4">
              <p
                className="mt-4 text-lg px-1 pb-0.5 w-20 border-2 border-secondary/60 hover:border-secondary/80 align-center cursor-pointer text-center rounded bg-secondary/40 hover:bg-secondary/60 text-red-600 ml-[-40px] max-h-[40px] absolute bottom-4"
                onClick={() =>
                  document.getElementById(`my_modal_${id}`).showModal()
                }
              >
                content
              </p>
            </div>
          </div>
          <div>
            <ProductDialogHF id={id} product={product} />
          </div>
        </div>
      );
    });
  };

  // const dollarsAmount = price.currentPrice;
  // const categoryName = categoryPath[0].name;
  const indexOfLastArticle = currentPage * articlesPerPage; // 1 * 10 = 10
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage; // 10 - 10 = 0
  const currentArticles = hfApi?.slice(indexOfFirstArticle, indexOfLastArticle); // 0 to 10

  // const handleSearchInput = async  (event) => {
  const handleSearchInput = (event) => {
    setCurrentPage(1);

    setSearchArticle(event.target.value);
    // setSelectCategory("all");
    if (selectCategory === "all") {
      const newDataRender = renderData(
        data
          .filter(
            (item) => item.price.currentPrice <= parseInt(selectedMaxPrice)
          )
          .filter((item) =>
            item.imageAlt.toLowerCase().includes(event.target.value)
          )
      ); // render filtered data
      setHFApi(newDataRender);
      // and set it to state
      // console.log("newDataRender.length: ", newDataRender.length);
      // console.log("hfApi.length: ", hfApi.length);
      return true;
    }
    if (selectCategory !== "all") {
      const newData = renderData(
        data
          .filter(
            (item) => item.categoryPath[1].name.split(" ")[0] === selectCategory
          )
          .filter(
            (item) => item.price.currentPrice <= parseInt(selectedMaxPrice)
          )
          .filter((item) =>
            item.imageAlt.toLowerCase().includes(event.target.value)
          )
      );
      setHFApi(newData);
      return true;
    }
  };

  // setSearchArticle("");
  const handleSelectCategory = (event) => {
    setCurrentPage(1);
    localStorage.setItem("selectCategory", event.target.value);
    setSelectCategory(getSelectCategoryFromLocalStorage);
    // console.log("handleSelectCategory selectCategory: ", selectCategory);
    // setDataCopy(data);
    //
    setDataCopy(data);
    if (event.target.value === "all") {
      const newDataRender = renderData(
        data
          .filter(
            (item) => item.price.currentPrice <= parseInt(selectedMaxPrice)
          )
          .filter((item) => item.imageAlt.toLowerCase().includes(searchArticle))
      ); // render filtered data
      setHFApi(newDataRender);
      return true;
    }
    // setDataCopy(data);

    if (event.target.value !== "all") {
      const newDataRender = renderData(
        data
          .filter(
            (item) =>
              item.categoryPath[1].name.split(" ")[0] === event.target.value
          )
          .filter(
            (item) => item.price.currentPrice <= parseInt(selectedMaxPrice)
          )
          .filter((item) => item.imageAlt.toLowerCase().includes(searchArticle))
      ); // render filtered data
      setHFApi(newDataRender);
      return true;
    }
  };

  const handleSelectSort = (event) => {
    setCurrentPage(1);
    // setSearchArticle("");
    // setSelectCategory("all");
    // setSelectSort(event.target.value);
    setSelectSort(event.target.value);
    // localStorage.setItem("selectSort", event.target.value);

    // console.log("selectSort event.target.value: ", event.target.value);
    if (selectCategory === "all") {
      if (event.target.value === "a-z") {
        const newDataRenderAZ = renderData(
          // newDataCopy
          data
            .sort((a, b) =>
              a.imageAlt.toLowerCase() > b.imageAlt.toLowerCase()
                ? 1
                : b.imageAlt.toLowerCase() > a.imageAlt.toLowerCase()
                ? -1
                : 0
            )
            .filter(
              (item) => item.price.currentPrice <= parseInt(selectedMaxPrice)
            )
            .filter((item) =>
              item.imageAlt.toLowerCase().includes(searchArticle)
            )
          //  (a > b ? 1 : b > a ? -1 : 0)
          // sort(a, b) {return (a.name > b.name) - (a.name < b.name);}
          // )
        );
        // console.log("a-z data", dataCopy);
        setHFApi(newDataRenderAZ);
        return true;
      }
      if (event.target.value === "z-a") {
        const newDataRenderZA = renderData(
          data
            .sort((a, b) =>
              b.imageAlt.toLowerCase() > a.imageAlt.toLowerCase()
                ? 1
                : a.imageAlt.toLowerCase() > b.imageAlt.toLowerCase()
                ? -1
                : 0
            )
            .filter(
              (item) => item.price.currentPrice <= parseInt(selectedMaxPrice)
            )
            .filter((item) =>
              item.imageAlt.toLowerCase().includes(searchArticle)
            )
        );

        setHFApi(newDataRenderZA);
        return true;
      }

      if (event.target.value === "low-high") {
        const newDataRenderLow = renderData(
          data
            .sort((a, b) => a.price.currentPrice - b.price.currentPrice)
            .filter(
              (item) => item.price.currentPrice <= parseInt(selectedMaxPrice)
            )
            .filter((item) =>
              item.imageAlt.toLowerCase().includes(searchArticle)
            )
        );
        // console.log("low-hight data: ", dataCopy);

        setHFApi(newDataRenderLow);
        return true;
      }
      if (event.target.value === "high-low") {
        // setData(newDataCopy);
        const newDataRenderHigh = renderData(
          data
            .sort((a, b) => b.price.currentPrice - a.price.currentPrice)
            .filter(
              (item) => item.price.currentPrice <= parseInt(selectedMaxPrice)
            )
            .filter((item) =>
              item.imageAlt.toLowerCase().includes(searchArticle)
            )
        );
        // console.log("high-low data", dataCopy);
        setHFApi(newDataRenderHigh);
        return true;
      }
    }

    if (selectCategory !== "all") {
      if (event.target.value === "a-z") {
        //  (a > b ? 1 : b > a ? -1 : 0)
        // sort(a, b) {return (a.name > b.name) - (a.name < b.name);}
        // )
        const newDataRenderAZ = renderData(
          // newDataCopy
          data
            .sort((a, b) =>
              a.imageAlt.toLowerCase() > b.imageAlt.toLowerCase()
                ? 1
                : b.imageAlt.toLowerCase() > a.imageAlt.toLowerCase()
                ? -1
                : 0
            )
            .filter(
              (item) =>
                item.categoryPath[0].name.split(" ")[0] === selectCategory
            )
            .filter(
              (item) => item.price.currentPrice <= parseInt(selectedMaxPrice)
            )
            .filter((item) =>
              item.imageAlt.toLowerCase().includes(searchArticle)
            )
        );
        // console.log("a-z data", dataCopy);
        setHFApi(newDataRenderAZ);
        return true;
      }
      if (event.target.value === "z-a") {
        const newDataRenderZA = renderData(
          data
            .sort((a, b) =>
              b.imageAlt.toLowerCase() > a.imageAlt.toLowerCase()
                ? 1
                : a.imageAlt.toLowerCase() > b.imageAlt.toLowerCase()
                ? -1
                : 0
            )
            .filter(
              (item) =>
                item.categoryPath[0].name.split(" ")[0] === selectCategory
            )
            .filter(
              (item) => item.price.currentPrice <= parseInt(selectedMaxPrice)
            )
            .filter((item) =>
              item.imageAlt.toLowerCase().includes(searchArticle)
            )
        );

        setHFApi(newDataRenderZA);
        return true;
      }

      if (event.target.value === "low-high") {
        const newDataRenderLow = renderData(
          data
            .sort((a, b) => {
              return a.price.currentPrice - b.price.currentPrice;
            })
            .filter(
              (item) =>
                item.categoryPath[0].name.split(" ")[0] === selectCategory
            )
            .filter(
              (item) => item.price.currentPrice <= parseInt(selectedMaxPrice)
            )
            .filter((item) =>
              item.imageAlt.toLowerCase().includes(searchArticle)
            )
        ); // render filtered data
        // console.log("low-hight data: ", dataCopy);

        setHFApi(newDataRenderLow);
        return true;
      }
      if (event.target.value === "high-low") {
        // let newDataCopy = data.sort((a, b) => {
        //   return b.price.currentPrice - a.price.currentPrice;
        // });
        // setData(newDataCopy);
        const newDataRenderHigh = renderData(
          data
            .sort((a, b) => {
              return b.price.currentPrice - a.price.currentPrice;
            })
            .filter(
              (item) =>
                item.categoryPath[0].name.split(" ")[0] === selectCategory
            )
            .filter(
              (item) => item.price.currentPrice <= parseInt(selectedMaxPrice)
            )
            .filter((item) =>
              item.imageAlt.toLowerCase().includes(searchArticle)
            )
        );
        // console.log("high-low data", dataCopy);
        setHFApi(newDataRenderHigh);
        return true;
      }
    }
  };

  const handleRangePrice = (event) => {
    setCurrentPage(1);
    setSelectedMaxPrice(parseInt(event.target.value));
    if (selectCategory === "all") {
      const newDataRender = renderData(
        data
          .filter((item) => {
            return item.price.currentPrice <= parseInt(event.target.value);
          })
          .filter((item) => item.imageAlt.toLowerCase().includes(searchArticle))
      ); // render filtered data
      setHFApi(newDataRender);
      return true;
    }
    if (selectCategory !== "all") {
      const newDataRender = renderData(
        data
          .filter(
            (item) => item.price.currentPrice <= parseInt(event.target.value)
          )
          .filter(
            (item) => item.categoryPath[0].name.split(" ")[0] === selectCategory
          )
          .filter((item) => item.imageAlt.toLowerCase().includes(searchArticle))
      ); // render filtered data
      setHFApi(newDataRender);
      return true;
    }
  };

  console.log("selectedMaxPrice: ", selectedMaxPrice);

  const handleResetButton = () => {
    setCurrentPage(1);
    // let newDataCopy = products;
    // setDataCopy(newDataCopy);
    setData(dataCopy);
    // localStorage.setItem("searchArticle", "");
    setSearchArticle("");
    // localStorage.setItem("selectCategory", "all");
    setSelectCategory("all");
    // localStorage.setItem("selectSort", "a-z");
    setSelectSort("a-z");
    const newDataRenderReset = renderData(dataCopy);
    setHFApi(newDataRenderReset);
  };

  const handleArticlesPerPage = (event) => {
    setCurrentPage(1);
    setArticlesPerPage(event.target.value);
    localStorage.setItem("articlesPerPage", event.target.value);
  };

  // const { search, pathname } = useLocation();

  // https://reactrouter.com/en/6.28.0/hooks/use-navigate
  const paginate = (pageNumber) => {
    // console.log("keyword", search);
    // console.log("pathname", pathname);
    // console.log("location: ", location);
    // console.log("uselocation: ", uselocation);
    setCurrentPage(pageNumber);
    // new URL(".", window.origin + location.pathname + "/");
    // const currentUrl = new URL(`${pathname}${search}#page=${pageNumber}`);
    // searchParams.set("page", currentPage);
    // console.log("currentUrl", currentUrl);

    // setCurrentPage(pageNumber);
    // setCurrentPath(`${pathname}${search}?page=${pageNumber}`);
    // console.log();
    // navigate(`${currentUrl}`);
  };
  // console.log("currentPath: ", currentPath);
  // console.log("selectCategory: ", selectCategory);
  // console.log("selectSort: ", selectSort);
  // console.log("articlesPerPage: ", articlesPerPage);
  // console.log("products.length: ", products.length);
  // console.log("data.length: ", data.length);
  // console.log("dataCopy.length: ", dataCopy.length);
  // console.log("hfApi?.length", hfApi?.length);

  return (
    <div className="pb-6">
      <div className="text-base md:text-lg bg-base-200/80 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 items-center">
        <h1 className="stats bg-neutral/90 shadow p-2 text-center rounded-md">
          {" "}
          {`selected subcategory: ${selectCategory || "all"}`}
        </h1>
        <h1 className="stats bg-neutral/90 shadow p-2 text-center rounded-md">
          {" "}
          {`all product${data.length > 1 && "s"} ${data.length}`}
        </h1>
        <h1 className="stats bg-neutral/90 shadow p-2 text-center rounded-md">
          {" "}
          {`selected product${selectedLength > 1 && "s"}  ${selectedLength} `}
        </h1>
      </div>
      <div className="bg-base-200/90 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        <Search onChange={handleSearchInput} searchArticle={searchArticle} />
        <SelectCategory
          onChange={handleSelectCategory}
          selectCategory={selectCategory}
        />
        <SelectSort onChange={handleSelectSort} selectSort={selectSort} />
        <FormSelectHF
          label="articles per page"
          name="pages"
          list={pages}
          size="select-sm"
          value={articlesPerPage || 24}
          // defaultValue={selectCategory}
          onChange={handleArticlesPerPage}
          // onChange={(e) => setArticlesPerPage(e.target.value)}
        />
        <SelectRangePrice
          onChange={handleRangePrice}
          selectedMaxPrice={selectedMaxPrice}
          value={selectedMaxPrice || 500000}
        />
        <button
          type="button"
          className="btn btn-accent btn-sm text-base"
          onClick={handleResetButton}
        >
          reset
        </button>
      </div>
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={hfApi?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <div className="px-2 py-4 sm:p-4 2xl:p-6 grid gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {currentArticles}
      </div>
      <Pagination
        articlesPerPage={articlesPerPage}
        totalArticles={hfApi?.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Search = ({ onChange, searchArticle }) => {
  // function Search({ onChange, searchArticle }) {

  return (
    <>
      <FormInputHF
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        // defaultValue={searchArticle}
        value={searchArticle}
        onChange={onChange}
        // key={'searchGrid'}
      />
    </>
  );
};

const SelectCategory = ({ onChange, selectCategory }) => {
  return (
    <>
      <FormSelectHF
        label="select category"
        name="category"
        list={categories}
        size="select-sm"
        // defaultValue={selectCategory}
        value={selectCategory}
        onChange={onChange}
        // key={"categoryGrid"}
      />
    </>
  );
};

const SelectSort = ({ onChange, selectSort }) => {
  return (
    <>
      <FormSelectHF
        label="select sort"
        name="sort"
        list={sorts}
        size="select-sm"
        // defaultValue={order}
        value={selectSort}
        onChange={onChange}
        // key={"sortGrid"}
      />
    </>
  );
};

const SelectRangePrice = ({ onChange, selectedMaxPrice }) => {
  return (
    <>
      <FormRangeHF
        name="price"
        label="select price"
        size="range-sm"
        // defaultValue={order}
        value={selectedMaxPrice}
        onChange={onChange}
        // key={"priceGrid"}
      />
    </>
  );
};

export default ProductsGridHF;
