import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { formatPrice } from "../utils";
import { useEffect, useState, useMemo, useRef } from "react";
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

const getArticlesPerPageFromSessionStorage = () => {
  console.log(
    'localStorage.getItem("articlesPerPage")',
    localStorage.getItem("articlesPerPage")
  );
  return localStorage.getItem("articlesPerPage") || 24;
};

// const getSelectSortFromSessionStorage = () => {
//   console.log(
//     'localStorage.getItem("selectSort")',
//     localStorage.getItem("selectSort")
//   );
//   return localStorage.getItem("selectSort") || "a-z";
// };

const getSelectCategoryFromSessionStorage = () => {
  // console.log(
  //   'localStorage.getItem("selectCategory")',
  //   localStorage.getItem("selectCategory")
  // );
  return localStorage.getItem("selectCategory") || "all";
};

// const getSearchArticleFromSessionStorage = () => {
//   console.log(
//     'localStorage.getItem("searchArticle")',
//     localStorage.getItem("searchArticle")
//   );
//   return localStorage.getItem("searchArticle") || "";
// };

// const getCopyDataFromSessionStorage = () => {
//   console.log(
//     'localStorage.getItem("searchArticle")',
//     localStorage.getItem("searchArticle")
//   );
//   return localStorage.getItem("dataCopy") || [];
// };

const getCurrentPageFromSessionStorage = () => {
  // console.log(
  //   'localStorage.getItem("currentPage")',
  //   localStorage.getItem("currentPage")
  // );
  return localStorage.getItem("currentPage") || 1;
};

// SelectCategory
const byteSize = (str) => new Blob([str]).size;

const ProductsGridHF = () => {
  const { products } = useLoaderData();

  const maxPrice = 5000;

  const [hfApi, setHFApi] = useState([]);
  const [data, setData] = useState([]); // add your data to here
  // const [dataCopy, setDataCopy] = useState(getCopyDataFromSessionStorage);
  const [dataCopy, setDataCopy] = useState([]);
  const [selectedLength, setSelectedLength] = useState(data.length);
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState(
  //   getCurrentPageFromSessionStorage
  // );
  // getCurrentPageFromSessionStorage
  const [articlesPerPage, setArticlesPerPage] = useState(
    getArticlesPerPageFromSessionStorage
  );
  // const [articlesPerPage, setArticlesPerPage] = useState(3);
  const [searchArticle, setSearchArticle] = useState(
    // getSearchArticleFromSessionStorage
    ""
  );
  const [selectCategory, setSelectCategory] = useState(
    // getSelectCategoryFromSessionStorage
    "all"
  );
  // const [selectSort, setSelectSort] = useState(getSelectSortFromSessionStorage);
  const [selectSort, setSelectSort] = useState("a-z");
  const [pageNumber, setPageNumber] = useState(1);
  const [showProductList, setShowProductList] = useState([]);
  // const [selectedMinPrice, setSelectedMunPrice] = useState(parseInt(price) || 0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(maxPrice);
  const [currentPath, setCurrentPath] = useState("");

  const { pathname, search } = useLocation();
  const navigate = useNavigate();


  const inputRef = useRef();

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
      // console.log("id: ", id);
      // const dollarsAmount = formatPrice(price);
      const dollarsAmount = price.currentPrice;
      const categoryName = categoryPath[1].name;
    
      return (
        <div
          key={id}
          // key={nanoid()}
          // key={id}
          // to={`/products-hf/${item.id}`}
          className="p-4 rounded-md flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group border-2 hover:border-2 border-blue-300/10 hover:border-blue-300/40 bg-base-200/80 hover:bg-base-200/90"
          // target="_blank"
        >
          {/* <figure className="px-4 pt-4"> */}
          <img
            src={image}
            alt={imageAlt}
            className="h-[8rem] w-[8rem] rounded-lg sm:h-[10rem] sm:w-[10rem] object-cover group-hover:scale-105 transition duration-300 border-2 border-slate-500/20"
          />
          {/* </figure> */}
          <div className="ml-0 sm:ml-16">
            <h3 className="capitalize font-medium text-base lg:text-lg leading-tight" >{imageAlt.split(',')[0] || ""}<br /> {`${imageAlt.split(',')[1] || ""} ${imageAlt.split(',')[2] || ""}`}</h3>
            <h4 className="capitalize text-md text-success pt-2">
              Home Furnishings
            </h4>
            <h6 className="text-accent pt-2">category: {categoryName}</h6>
            <p
              className="mt-4 px-1 pb-0.5 w-20 border-2 border-secondary/60 hover:border-secondary/80 align-center cursor-pointer text-center rounded bg-secondary/40 hover:bg-secondary/60 text-red-600"
              onClick={() =>
                document.getElementById(`my_modal_${id}`).showModal()
              }
            >
              content
            </p>
          </div>
          <p className="font-medium ml-0 sm:ml-auto text-lg">
            ${dollarsAmount.toFixed(2)}
          </p>
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
    // localStorage.setItem("currentPage", 1);
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
      // setTimeout(() => {
      //   inputRef.search.focus();
      // }, 200);

      // and set it to state
      // console.log("newDataRender.length: ", newDataRender.length);
      // console.log("hfApi.length: ", hfApi.length);
      // this.inputRef.current.focus();
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
      // inputRef.current.focus();
      return true;
    }
  };

  // setSearchArticle("");
  const handleSelectCategory = (event) => {
    setCurrentPage(1);
    // localStorage.setItem("currentPage", 1);
    localStorage.setItem("selectCategory", event.target.value);
    setSelectCategory(getSelectCategoryFromSessionStorage);
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
    // localStorage.setItem("currentPage", 1);
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
    // localStorage.setItem("currentPage", 1);
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

  // console.log("selectedMaxPrice: ", selectedMaxPrice);

  const handleResetButton = () => {
    setCurrentPage(1);
    // localStorage.setItem("currentPage", 1);
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
    // localStorage.setItem("currentPage", 1);
    setArticlesPerPage(event.target.value);
    localStorage.setItem("articlesPerPage", event.target.value);
  };

  // const { search, pathname } = useLocation();

  const paginate = (pageNumber) => {
    // console.log("keyword", search);
    // console.log("pathname", pathname);
    // console.log("location: ", location);
    // localStorage.setItem("currentPage", pageNumber);
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber);
    // setTimeout(() => {
    //   setCurrentPage(getCurrentPageFromSessionStorage);
    // }, 100);

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
  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div className="pb-6">
      <div className="text-base md:text-lg bg-base-200/80 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 items-center">
        <h1 className="stats shadow p-2 text-center rounded-md">{`selected subcategory: ${
          selectCategory || "all"
        }`}</h1>
        <h1 className="stats shadow p-2 text-center rounded-md">{`all product${
          data.length > 1 && "s"
        }: ${data.length}`}</h1>
        <h1 className="stats shadow p-2 text-center rounded-md">{`selected product${
          selectedLength > 1 && "s"
        }:  ${selectedLength} `}</h1>
      </div>
      <div className="bg-base-200/90 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
        {/* <Search
          onChange={handleSearchInput}
          ref={inputRef}
          searchArticle={searchArticle}
        />  */}
        <Search
          onChange={handleSearchInput}
          searchArticle={searchArticle}
          // ref={inputRef}
        />
        <SelectCategory
          onChange={handleSelectCategory}
          selectCategory={selectCategory}
          // ref={inputRef}
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
      <div className="px-2 py-4 sm:p-4 2xl:p-6 grid gap-y-2 sm:gap-y-4">
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
// , inputRef
const Search = ({ onChange, searchArticle }) => {
  // function Search({ onChange, searchArticle, inputRef }) {

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
        // key={"search"}
        // ref={inputRef}
      />
    </>
  );
};

// const SelectCategory = ({ onChange, selectCategory, inputRef }) => {
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
        // key={nanoid()}
        // ref={inputRef}
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
        // key={nanoid()}
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
        // key={nanoid()}
      />
    </>
  );
};

export default ProductsGridHF;
