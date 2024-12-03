import { useLoaderData, useNavigate } from "react-router-dom";
// import { formatPrice, customFetch, generateAmountOptions } from "../utils";
import { customFetchHF, generateAmountOptions } from "../utils";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const singleProductQuery = (id) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () =>
      customFetchHF(
        `/keywordSearch?countryCode=us&languageCode=en&keyword=${id}`
      ),
  };
};

// export const loader = async ({params}) => {
//  const response = await customFetchHF(`products/${params.id}`)
//  return {product: response.data}
//}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    // console.log("response.data: ", response.data);
    const imageUrl = response.data.image;
    const productUrl = response.data.url;

    return { product: response.data };
  };

// const listColors = ["white", "blue", "green"];

const SingleProductHF = () => {
  const { product } = useLoaderData();
  // console.log("product: ", product);
  // console.log("typeof product: ", typeof product);
  const { image, typeName, name, price, imageAlt, url } = product[0];
  const navigate = useNavigate();
  // const dollarsAmount = price.currentPrice;
  // const dollarsAmount = price;
  // console.log("product.image: ", product.image);
  const company = "Home Furnishings";
  const [productColor, setProductColor] = useState("transparent");

  const [amount, setAmount] = useState(1);
  const [descript, setDescript] = useState("unknown");
  const [productsColor, setProductsColor] = useState([]);
  const [colorsReady, setColorsReady] = useState([]);

  const productPrice = price.currentPrice;

  const listColors = [];
  // const listDescript = ["unknown"];

  const product_color = image.split("__")[0].split("-").slice(-1);
  listColors.push(product_color);

  useEffect(() => {
    setProductColor(product_color);
    // console.log("url: ", url);
  }, []);
  let myList = [];
  let mySet = new Set();

  async function scrapeData() {
    try {
      const response = await fetch(url, {
        // cache: "no-store",
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          Connection: "keep-alive",
        },
      });

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      // console.log("doc: ", doc);
      const desc = doc.getElementsByClassName(
        "pip-product-summary__description"
      )[0];
      const desc_try = desc.textContent;

      const colors = doc.getElementsByClassName("pip-image");

      for (let i = 0; i < colors.length; i++) {
        let colorSrc = colors[i]
          .getAttribute("src")
          .split("__")[0]
          .split("-")
          .slice(-1);
        // let color = colorSrc.split("__")[0].split("-").slice(-1);
        // console.log("colorSrc: ", colorSrc);
        myList.push(colorSrc[0]);
        mySet.add(colorSrc[0]);
      }
      setDescript(desc_try);
      setProductsColor(myList);
      setColorsReady(mySet);
      // console.log("desc_try: ", desc_try);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    scrapeData();
  }, []);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    // cartID: product.id + productColor || "unknown",
    cartID: product[0].id + `-${productColor}` || "-neutral",
    productID: product[0].id,
    image,
    title: `${typeName} ${name}`,
    price: productPrice * 100,
    company,
    productColor: productColor || "neutral",
    amount,
  };
  // const srcColor = cartProduct.image.split("__")[0].split("-").slice(-1);

  console.log("cartProduct: ", cartProduct);
  // setProductColor(srcColor);
  // console.log("srcColor: ", srcColor);
  // console.log("cartProduct.price: ", cartProduct.price.currentPrice);

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };
  // const colors = [
  //   `${imageAlt.split(" ")[4] || imageAlt.split(" ")[3]}`,
  //   // variants[0].imageAlt.split(" ")[4] || imageAlt.split(" ")[3] || "",
  //   // variants[1].imageAlt.split(" ")[4] || imageAlt.split(" ")[3] || "",
  // ];
  // colors.push(productsColor)
  // console.log("descript: ", descript);

  console.log("descript: ", descript);
  console.log("productColor: ", productColor);
  console.log("productsColor: ", productsColor);
  console.log("colorsReady: ", colorsReady);
  let newColors = Array.from(colorsReady);
  // listColors.push(newColors);
  console.log(newColors);
  // listColors.push(newColors);
  useEffect(() => {
    // let mySet = new Set(productsColor);
    // console.log('mySet: ', mySet)
    // // setProductsColor(mySet);
  }, []);
  // console.log('mySet: ', mySet)

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products-hf">Products-hf</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <button onClick={() => navigate(-1)} className="btn">
        back home
      </button>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={image}
          alt={imageAlt}
          className="w-full max-w-[540px] max-h-[36rem] object-cover rounded-lg lg:w-full"
        />
        {/* PRODUCT */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{imageAlt}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">price: ${productPrice.toFixed(2)}</p>
          <p className="mt-6 leading-8 text-justify">description: {descript}</p>
          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {newColors.length > 0
                ? newColors.map((color) => {
                    // console.log("cartProduct: ", cartProduct);
                    if (color.startsWith("http")) {
                      return null;
                    } else {
                      return (
                        <>
                          {" "}
                          <button
                            key={color}
                            type="button"
                            style={{
                              backgroundColor: color || "transparent",
                              outline: "2px solid rgba(120, 120, 160, 0.4)",
                            }}
                            className={`badge w-6 h-6 mr-4 box-shadow-around-sm ${
                              color === productColor &&
                              "border-2 border-secondary box-shadow-around-color"
                            }`}
                            onClick={() =>
                              setProductColor(color || "transparent")
                            }
                          ></button>
                          <span className="mb-2 mr-2">{color}</span>
                        </>
                      );
                    }
                  })
                : listColors.map((color) => {
                    // console.log("cartProduct: ", cartProduct);
                    return (
                      <>
                        {" "}
                        <button
                          key={color}
                          type="button"
                          className={`badge w-6 h-6 mr-2 ${
                            color === productColor &&
                            "border-2 border-secondary"
                          }`}
                          style={{ backgroundColor: color || "DarkOrchid" }}
                          onClick={() => setProductColor(color || "DarkOrchid")}
                        ></button>{" "}
                        <br />
                        {color}
                      </>
                    );
                  })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium -tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              id="amount"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(10)}
            </select>
          </div>

          {/* CART BTN */}
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProductHF;
