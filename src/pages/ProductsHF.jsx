import {
  Filters,
  FiltersMy,
  FiltersHF,
  PaginationContainer,
  ProductsContainer,
  ProductsContainerMy,
  ProductsContainerHF,
  PaginationContainerHF,
} from "../components";
import { customFetchHF } from "../utils";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
import { nanoid } from "nanoid";

import hero1w from "../assets/hero1w.webp";
import hero12w from "../assets/hero12w.webp";
import hero3w from "../assets/hero3w.webp";
import hero24w from "../assets/hero24w.webp";
import hero5w from "../assets/hero5w.webp";
import hero16w from "../assets/hero16w.webp";
import hero7w from "../assets/hero7w.webp";
import hero27w from "../assets/hero27w.webp";
import hero9w from "../assets/hero9w.webp";
import hero10w from "../assets/hero10w.webp";

const carouselImagesWide = [
  hero1w,
  hero12w,
  hero3w,
  hero27w,
  hero9w,
  hero10w,
  hero24w,
  hero5w,
  hero16w,
  hero7w,
];

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

    // delete params.category;
    // const paramsNew = params.copy();
    // console.log("1. paramsNew: ", paramsNew);
    // delete paramsNew.keyword;
    // console.log("2. paramsNew: ", paramsNew);
    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );

    const products = response.data;
    console.log("products: ", products);

    const total = response.data.length;

    // console.log("1. pageCount", pageCount);
    // console.log("1. page", page);
    // console.log("1. total", total);
    return { products, total, params };
  };

const ProductsHF = () => {
  // const [parameter, setParameter] = useState(getParameterFromLocalStorage);
  // useEffect(() => {
  //   setParameter("sel");
  //   localStorage.setItem("parameter", "&keyword=best-sellers");
  // }, []);

  return (
    <>
      <Swiper
        // spaceBetween={40}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
        style={{
          width: "100%",
          height: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "fixed",
          top: "0px",
          left: 0,
          zIndex: 0,
        }}
      >
        {carouselImagesWide.map((image) => {
          return (
            // <div key={image} className="carousel-item">
            <SwiperSlide key={nanoid()} style={{ opacity: 0.8 }}>
              <img
                src={image}
                // className="rounded-box h-full w-[96%] max-w-[96%] object-cover mx-auto"
                style={{ display: "block", width: "100vw", height: "100vh" }}
              />
            </SwiperSlide>
            // </div>
          );
        })}
      </Swiper>
      <div
        className="productsContent pt-4 pb-8 sm:pt-8 lg:mt-2"
        // style={{
        //   position: "fixed",
        //   zIndex: 9,
        //   minWidth: "100%",
        //   maxHeight: "90%",
        //   maxWidth: "100%",
        //   // minHeight: "100%",
        //   top: "12%",
        //   alignItems: "center",
        //   justifyContent: "center",
        //   flexDirection: "column",
        //   left: 0,
        //   paddingLeft: "20px",
        //   paddingRight: "20px",
        // }}
      >
        <FiltersHF />
        <ProductsContainerHF />
      </div>
    </>
  );
};
export default ProductsHF;
