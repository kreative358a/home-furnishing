import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelectHF from "./FormSelectHF";
import FormSelect from "./FormSelect";
import FormSelectDict from "./FormSelectDict";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";
import SectionTitle from "./SectionTitle";
import { useState } from "react";

const FiltersHF = () => {
  const { total, params } = useLoaderData();
  // const { search, keyword, company, category, shipping, order, price } = params;
  const { keyword, category } = params;
  const totalProducts = total;
  // console.log("keyword: ", keyword);
  const [selectedValue, setSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  // const listCategories = [
  //   "best sellers",
  //   "kids-bc003",
  //   "beds-bm003",
  //   "sofas-sectionals-fu003",
  //   "tables-desks-fu004",
  //   "chairs-fu002",
  // ];

  const listCategories = [
    "best sellers",
    "kids",
    "beds",
    "sofas",
    "tables",
    "chairs",
  ];

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    setInputValue(event.target.value);
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // alert(`Submitted value: ${inputValue}`);
  // };
  // onSubmit={handleSubmit}
  // console.log("inputValue", inputValue);
  return (
    <>
      <div className="text-base md:text-lg bg-base-200/80 w-[100%] max-w-[800px]  mx-auto rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 items-center ">
        <h1 className="stats bg-neutral/90 shadow p-2 text-center rounded-md">
          {" "}
          {`category: ${keyword || "best-sellers"}`}{" "}
        </h1>
        <h1 className="stats bg-neutral/90 shadow p-2 text-center rounded-md">{`${totalProducts} product${
          totalProducts > 1 && "s"
        }`}</h1>
      </div>
      <div className="bg-base-200/90 w-[100%] max-w-[800px] mx-auto rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 ">
        <FormSelect
          label="select category"
          name="category"
          list={listCategories}
          size="select-sm"
          //defaultValue={keyword}
          value={selectedValue}
          onChange={handleSelectChange}
          // defaultValue={category}
        />
        <Form>
          {/* SEARCH */}
          <FormInput
            type="search"
            label="search products"
            // name='search'
            name="keyword"
            size="input-sm"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          {/* <FormSelect
            label="select category"
            name="category"
            list={listCategories}
            size="select-sm"
            //defaultValue={keyword}
            value={selectedValue}
            onChange={handleSelectChange}
            // defaultValue={category}
          /> */}
          {/* CATEGORIES */}
          <div className="bg-base-200 w-[100%] mx-auto rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2">
            <button
              type="submit"
              className="btn btn-primary btn-sm text-base"

              // onClick={category.clear()}
            >
              search
            </button>
            <Link to="/products" className="btn btn-accent btn-sm text-base">
              reset
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};
export default FiltersHF;
