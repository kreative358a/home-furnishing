import { formatPrice, generateAmountOptions } from "../utils";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperProduct } from "swiper/react";
import { SwiperSlide as SwiperSlideProduct } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { nanoid } from "nanoid";

const ProductsDialogHF = ({ id, product }) => {
  const {
    image,
    contextualImageUrl,
    variants,
    typeName,
    name,
    price,
    imageAlt,
    url,
  } = product;

  const productCurrentPrice = price.currentPrice;
  const listPhotos = [];

  const dictColorPrice = new Object();

  const listColors = [];
  const listColorsCopy = [];

  const company = "Home Furnishings";

  const [amount, setAmount] = useState(1);
  const [descript, setDescript] = useState("unknown");

  // const [colorsReady, setColorsReady] = useState(listColors);
  const [productPhotos, setProductPhotos] = useState(listPhotos);
  const [productPrice, setProductPrice] = useState(productCurrentPrice);
  const [productPrices, setProductPrices] = useState({});
  const [productColors, setProductColors] = useState(listColors);
  const [productColor, setProductColor] = useState("");
  // const productPrice = price.currentPrice;

  // const listDescript = ["unknown"];

  // mySet.add(product_color[0]);

  useEffect(() => {
    const product_color = image.split("__")[0].split("-").slice(-1)[0];
    // console.log("product_color: ", product_color);
    listColors.push(product_color);
    setProductColor(product_color);
  }, []);
  let myList = [];

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

      // const colors = doc.getElementsByClassName("pip-image");

      // for (let i = 0; i < colors.length; i++) {
      //   let colorSrc = colors[i]
      //     .getAttribute("src")
      //     .split("__")[0]
      //     .split("-")
      //     .slice(-1);
      //   // let color = colorSrc.split("__")[0].split("-").slice(-1);
      //   console.log("colorSrc: ", colorSrc);
      //   myList.push(colorSrc[0]);
      //   mySet.add(colorSrc[0]);
      // }
      setDescript(desc_try);
      // setProductsColor(myList);
      // setColorsReady(mySet);
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

  const handleColorClick = (event) => {
    // setProductColor(event.target.value || "transparent");

    setProductColor(event.target.value);
    // console.log("color: ", event.target.value);
    // console.log(
    //   "productPrices[event.target.value]: ",
    //   productPrices[event.target.value]
    // );
    // console.log("productPrices: ", productPrices);
    setProductPrice(productPrices[event.target.value]);
    // setProductPrice(productPrices.color);
    // console.log("productsColor: ", productsColor);
    // console.log("productPrices[color]: ", productPrices[color[0]]);
    // try {

    // } catch (error) {
    //   console.log("productPrices[event.target.value] error: ", error);
    // }
    // console.log(productPrices.color)
  };

  const cartProduct = {
    // cartID: product.id + productColor || "unknown",
    cartID: product.id + `-${productColor}` || "-neutral",
    productID: product.id,
    image,
    title: `${typeName} ${name}`,
    price: productPrice * 100,
    company,
    productColor: productColor || "neutral",
    amount,
  };

  // console.log("cartProduct: ", cartProduct);

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  // console.log("descript: ", descript);
  // console.log("productColor: ", productColor);
  // console.log("productsColor: ", productsColor);

  // const dictColorPrice = {};

  // const listUrlColors = [];
  // listUrlColors =  new Array()
  // const listPhotos = [];
  // const listPhotos = new Array()
  useEffect(() => {
    listPhotos.push(image);
    listPhotos.push(contextualImageUrl);
    let mainColor = image.split("__")[0].split("-").slice(-1);
    // listColors.push(mainColor);
    dictColorPrice[mainColor[0]] = price.currentPrice;
    if (variants) {
      // console.log("variants.length: ", variants.length);
      variants.map((variant) => {
        const { image, contextualImageUrl, url, price } = variant;
        listPhotos.push(image);
        listPhotos.push(contextualImageUrl);
        const colorUrl = image.split("__")[0].split("-").slice(-1)[0];
        listColorsCopy.push(colorUrl);
        dictColorPrice[colorUrl] = price.currentPrice;
      });
    }

    // console.log("dictColorPrice: ", dictColorPrice);

    // console.log("dictColorPrice.keys(): ", dictColorPrice.keys());
    // console.log("listPhotos: ", listPhotos);
    setProductPrices(dictColorPrice);
    setProductColors(Object.keys(dictColorPrice));
    // console.log("dictColorPrice.keys(): ", dictColorPrice.keys());
    // setColorsReady(mySet);
    // console.log(colorsReady);
  }, []);

  useEffect(() => {
    // console.log("colorsReady: ", colorsReady);
  }, []);

  // let newColors = Array.from(colorsReady);
  // setProductsColor(newColors);
  return (
    <dialog id={`my_modal_${id}`} className="modal">
      <div className="modal-box w-[96%] max-w-[96%] sm:w-[90%] sm:max-w-[90%] h-auto">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm text-xl btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        {/* <section> */}
        <div className="w-[100%] max-w[100%] mt-8 mb-4 grid gap-x-1 gap-y-1 sm:gap-y-8 lg:gap-x-8 lg:grid-cols-2 xl:gap-x-12 2xl:gap-x-16">
          {/* IMAGE */}
          {/* <img
              src={image}
              alt={imageAlt}
              className="w-full max-w-[540px] max-h-[36rem] object-cover rounded-lg lg:w-full border-2 border-slate-500/20"
            /> */}
          <div className="w-100% h-auto">
            <SwiperProduct
              spaceBetween={30}
              centeredSlides={true}
              // autoplay={{
              //   delay: 5000,
              //   disableOnInteraction: false,
              // }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              // modules={[Autoplay, Pagination, Navigation]}
              className=" w-[400px] max-w-[96%] h-[100%] max-h-[100%] sm:w-[32rem] lg:h-[32rem] xl:h-[34rem] p-4 space-x-4 bg-slate-700 rounded-box"
            >
              {/* <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-slate-700 rounded-box "> */}
              {productPhotos.map((photo, index) => {
                return (
                  // <div key={image} className="carousel-item">
                  <div className="w-[100%]">
                  <SwiperSlideProduct key={`${photo}-${index}`}>
                    {/* <SwiperSlide key={nanoid()}> */}
                    <img
                      src={photo}
                      className="rounded-box object-cover h-full max-w-[96%] w-[340px] sm:w-[100%] mx-auto"
                    />
                  </SwiperSlideProduct>
                 </div>
                );
              })}
              {/* </div> */}
            </SwiperProduct>
            {/* PRODUCT */}
          </div>
          <div>
            <h1 className="capitalize text-xl sm:text-2xl md-text-3xl font-bold mt-3">
              {imageAlt}
            </h1>
            <h4 className="text-lg sm:text-xl text-info font-bold mt-2">
              {company}
            </h4>
            <p className="mt-3 text-lg sm:text-xl">
              {/* price: ${productPrice.toFixed(2)} */}
              price: ${productPrice}
            </p>
            <p className="mt-6 leading-6 text-justify">
              description: {descript}
            </p>
            {/* COLORS */}
            <div className="mt-6">
              <h4 className="text-md font-medium tracking-wider capitalize">
                colors
              </h4>
              <div className="mt-2">
                {/*  {productsColor.map((color) => { */}
                {productColors.map((color, index) => {
                  // console.log("cartProduct: ", cartProduct);
                  return (
                    <span key={`${color}-${index}`}>
                      <button
                        type="button"
                        style={{
                          backgroundColor: color || "transparent",
                          outline: "2px solid rgba(120, 120, 160, 0.4)",
                        }}
                        className={`badge w-6 h-6 mr-4 box-shadow-around-sm ${
                          color === productColor && "border-2 border-secondary"
                        }`}
                        value={color}
                        onClick={handleColorClick}
                        // value={color}
                        // onClick={() => setProductColor(color || "DarkOrchid")}
                      ></button>
                      <span className="mb-2 mr-4">{color}</span>
                    </span>
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
        {/* </section> */}
      </div>
    </dialog>
  );
};
export default ProductsDialogHF;
