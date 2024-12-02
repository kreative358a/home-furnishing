import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { nanoid } from "nanoid";

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";
import hero5 from "../assets/hero5.webp";
import hero6 from "../assets/hero6.webp";
import hero7 from "../assets/hero7.webp";
import hero8 from "../assets/hero8.webp";
import hero9 from "../assets/hero9.webp";
import hero10 from "../assets/hero10.webp";

const carouselImagesSmall = [
  hero1,
  hero2,
  hero3,
  hero4,
  hero5,
  hero6,
  hero7,
  hero8,
  hero9,
  hero10,
];

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-4 lg:gap-12 items-center bg-base-200/60 p-4 rounded-lg mx-auto">
      <div className="px-4 mx-auto ">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
          Designed for your shopping pleasure
        </h1>
        <p className="mt-8 w-90% lg:max-w-xl text-lg leading-8 text-justify">
          With the belief that every customer is unique and their time spent
          shopping is very valuable, we wanted to create a unique place with
          unique products for everyone.
        </p>
        <div className="mt-10">
          <Link
            to="/products"
            className="btn btn-primary max-lg:hidden text-lg"
          >
            Our Products
          </Link>
        </div>
      </div>
      <Swiper
        spaceBetween={40}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-[90%] max-w-[34rem] mx-auto h-[28rem] p-4 space-x-4 bg-slate-700 rounded-box lg:w-[34rem] lg:max-w-[100%] lg:h-[38rem]"
      >
        {/* <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-slate-700 rounded-box "> */}
        {carouselImagesSmall.map((image) => {
          return (
            // <div key={image} className="carousel-item">
            <SwiperSlide key={nanoid()} className="">
              <img
                src={image}
                className="rounded-box h-full w-[96%] max-w-[96%] object-cover mx-auto"
              />
            </SwiperSlide>
            // </div>
          );
        })}
        {/* </div> */}
      </Swiper>
    </div>
  );
};
export default Hero;
