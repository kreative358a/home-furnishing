import { useEffect } from "react";
import { nanoid } from "nanoid";
// import text from "../assets/furnishings-store.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
// const url = "/products?featured=true";
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
const text = "HOME-FURNISHINGS";

const About = () => {
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
        className="mainContent pt-4 lg:mt-2 bg-base-100/15 px-2"
      >
        <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
          <div className="stats bg-primary/80 shadow p-2 text-center">
            <p
              style={{ overflowY: "hidden" }}
              className=" text-3xl sm:text-4xl lg:text-6xl font-bold tracking-widest p-2"
            >
              WE LOVE
            </p>
          </div>
          <div className="stats bg-primary/80 shadow p-2 text-center">
            <p
              style={{ overflowY: "hidden" }}
              translate="no"
              className=" text-3xl sm:text-4xl lg:text-6xl font-bold tracking-widest p-2"
            >
              {text}
            </p>
          </div>
        </div>
        <div className=" text-justify text-base sm:text-lg">
          <p
            className="mt-4 leading-6 max-w-2xl mx-auto rounded-md px-4 py-2 bg-base-200/60 hover:bg-base-200/80"
            //  style={{ background: "rgba(120, 120, 140, 0.6)", padding: "10px" }}
          >
            <strong>Affordability: </strong>
            <span translate="no"> {text} </span> offers a wide range of stylish
            furniture at competitive prices, making it accessible to many
            consumers.
          </p>
          <p className="mt-4 leading-6 max-w-2xl mx-auto rounded-md px-4 py-2 bg-base-200/60 hover:bg-base-200/80">
            <strong>Modern Design: </strong>
            Our products often feature a sleek, modern aesthetic that appeals to
            a variety of tastes and home styles.
          </p>
          <p className="mt-4 leading-6 max-w-2xl mx-auto rounded-md px-4 py-2 bg-base-200/60 hover:bg-base-200/80">
            <strong>Functionality: </strong>
            Many <span translate="no"> {text} </span> pieces are designed with
            practicality in mind, including space-saving solutions and
            multifunctional furniture, which is especially appealing for smaller
            living spaces.
          </p>
          <p className="mt-4 leading-6 max-w-2xl mx-auto rounded-md px-4 py-2 bg-base-200/60 hover:bg-base-200/80">
            <strong>Customization: </strong>
            <span translate="no"> {text} </span> provides options for
            customization, allowing customers to mix and match different pieces
            and styles to suit their needs.
          </p>
          <p className="mt-4 leading-6 max-w-2xl mx-auto rounded-md px-4 py-2 bg-base-200/60 hover:bg-base-200/80">
            <strong>Easy Assembly: </strong>
            Most <span translate="no"> {text} </span> furniture comes with clear
            instructions for self-assembly, which many people find convenient,
            even if some might find it challenging.
          </p>
          <p className="mt-4 leading-6 max-w-2xl mx-auto rounded-md px-4 py-2 bg-base-200/60 hover:bg-base-200/80">
            <strong>Sustainability: </strong>
            <span translate="no"> {text} </span> has made commitments to
            sustainability, using renewable and recycled materials in many of
            its products, which resonates with environmentally conscious
            consumers.
          </p>
          <p className="mt-4 leading-6 max-w-2xl mx-auto rounded-md px-4 py-2 bg-base-200/60 hover:bg-base-200/80">
            <strong>Shopping Experience: </strong>
            The unique store layout, which guides customers through showrooms
            and encourages exploration, enhances the shopping experience.
          </p>
          <p className="mt-4 leading-6 max-w-2xl mx-auto rounded-md px-4 py-2 bg-base-200/60 hover:bg-base-200/80">
            <strong>Brand Recognition: </strong>
            <span translate="no"> {text} </span> is a well-known brand with a
            strong reputation, which instills confidence in consumers regarding
            quality and customer service.
          </p>
          <p className="mt-4 leading-6 max-w-2xl mx-auto rounded-md px-4 py-2 bg-base-200/60 hover:bg-base-200/80">
            <strong>
              These factors combined make <span translate="no"> {text} </span> a
              popular choice for many individuals looking to furnish their
              homes.
            </strong>
          </p>
        </div>
      </div>
    </>
  );
};
export default About;
