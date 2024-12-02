import { FeaturedProducts, Hero } from "../components";
import { useEffect } from "react";
import { customFetchStrapi } from "../utils";
import { nanoid } from "nanoid";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
// const url = "/products?featured=true";
import hero21w from "../assets/hero21w.webp";
import hero22w from "../assets/hero22w.webp";
import hero23w from "../assets/hero23w.webp";
import hero14w from "../assets/hero14w.webp";
import hero15w from "../assets/hero15w.webp";
import hero16w from "../assets/hero16w.webp";
import hero27w from "../assets/hero27w.webp";
import hero18w from "../assets/hero18w.webp";
import hero9w from "../assets/hero9w.webp";
import hero20w from "../assets/hero20w.webp";
import { Swiper, SwiperSlide } from "swiper/react";
const carouselImagesWide = [
  hero21w,
  hero22w,
  hero23w,
  hero14w,
  hero15w,
  hero16w,
  hero27w,
  hero18w,
  hero9w,
  hero20w,
];

// localStorage.clear();
const url = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetchStrapi(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);

  const products = response.data.data;
  return { products };
};

const Landing = () => {
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
        {/* <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-slate-700 rounded-box "> */}
        {carouselImagesWide.map((image) => {
          return (
            // <div key={image} className="carousel-item">
            <SwiperSlide key={nanoid()} className="bg-base-200/80">
              <img
                src={image}
                // className="rounded-box h-full w-[96%] max-w-[96%] object-cover mx-auto"
                style={{ display: "block", width: "100vw", height: "100vh" }}
              />
            </SwiperSlide>
            // </div>
          );
        })}
        {/* </div> */}
      </Swiper>
      <div
        className="div-scrollbar pt-2 pb-8 sm:pt-6 lg:mt-2 bg-base-200/15 px-2"
        style={{
          position: "fixed",
          zIndex: 8,
          minWidth: "100%",
          minHeight: "90%",
          maxHeight: "90%",
          maxWidth: "100%",
          top: "10.8%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          left: 0,
        }}
      >
        <Hero />
        {/* <FeaturedProducts /> */}
      </div>
    </>
  );
};
export default Landing;
