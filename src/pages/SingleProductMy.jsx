import { useLoaderData } from "react-router-dom";
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
    console.log("response.data: ", response.data);
    const imageUrl = response.data.image;

    return { product: response.data, imageUrl };
  };

const SingleProductMy = () => {
  const { product } = useLoaderData();
  console.log("product: ", product);
  console.log("typeof product: ", typeof product);
  const { image, typeName, name, price, imageAlt, url } = product;
  // const dollarsAmount = price.currentPrice;
  // const dollarsAmount = price;
  // console.log("product.image: ", product.image);
  const company = "Home Furnishings";
  const [productColor, setProductColor] = useState("unknown");

  const [amount, setAmount] = useState(1);
  const [descript, setDescript] = useState("unknown");
  const [productsColor, setProductsColor] = useState([]);

  // async function scrapeData(listColors) {
  //   try {
  //     const response = await fetch(url, {
  //       // cache: "no-store",
  //       method: "GET",
  //       headers: {
  //         "User-Agent":
  //           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  //         "Accept-Language": "en-US,en;q=0.9",
  //         "Accept-Encoding": "gzip, deflate, br",
  //         Accept:
  //           "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  //         Connection: "keep-alive",
  //       },
  //     });
  //     const html = await response.text();
  //     const parser = new DOMParser();
  //     const doc = parser.parseFromString(html, "text/html");
  //     console.log("doc: ", doc);
  //     const desc = doc.getElementsByClassName(
  //       "pip-product-summary__description"
  //     )[0];
  //     const desc_try = desc.textContent;
  //     console.log("desc_try: ", desc_try);
  //     const colors = doc.getElementsByClassName("pip-image");
  //     for (let i = 0; i < colors.length; i++) {
  //       let colorSrc = colors[i].getAttribute("src");
  //       let color = colorSrc.split("__")[0].split("-").slice(-1);
  //       console.log("color: ", color);
  //       listColors.push(color);
  //     }
  //     setDescript(desc_try);
  //     setProductsColor(listColors);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   scrapeData();
  // }, []);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct = {
    // cartID: product.id + productColor || "unknown",
    cartID: product.id + "unknown",
    productID: product.id,
    image,
    // title: `${typeName} ${name}`,
    // price,
    // company: company || "none",
    productColor: "white",
    amount,
    // description: descript,
    listColors,
    // descript,
  };
  // const srcColor = cartProduct.image.split("__")[0].split("-").slice(-1);

  // console.log("cartProduct.image: ", cartProduct.image);
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
  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
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
          <p className="mt-3 text-xl"></p>
          <p className="mt-6 leading-8 text-justify">no description</p>
          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {listColors.map((color) => {
                // console.log("cartProduct: ", cartProduct);
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color || "DarkOrchid" }}
                    onClick={() => setProductColor(color || "DarkOrchid")}
                  ></button>
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
export default SingleProductMy;
