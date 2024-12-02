import { useSelector } from "react-redux";
import { CartItemsList, SectionTitle, CartTotals } from "../components";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
// const url = "/products?featured=true";
import hero1w from "../assets/hero1w.webp";
import hero22w from "../assets/hero22w.webp";
import hero3w from "../assets/hero3w.webp";
import hero4w from "../assets/hero4w.webp";
import hero25w from "../assets/hero25w.webp";
import hero6w from "../assets/hero6w.webp";
import hero7w from "../assets/hero7w.webp";
import hero26w from "../assets/hero26w.webp";
import hero9w from "../assets/hero9w.webp";
import hero10w from "../assets/hero10w.webp";

const carouselImagesWide = [
  hero25w,
  hero6w,
  hero7w,
  hero26w,
  hero1w,
  hero22w,
  hero3w,
  hero4w,
  hero9w,
  hero10w,
];

const Cart = () => {
  const user = useSelector((state) => state.userState.user);

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  // if (numItemsInCart === 0) {
  //   return <SectionTitle text="Your cart is empty" />;
  // }

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
        className="div-scrollbar pt-2 pb-8 sm:pt-6 lg:mt-2 bg-base-200/15 px-2"
        style={{
          position: "fixed",
          zIndex: 8,
          minWidth: "100%",
          minHeight: "90%",
          maxHeight: "90%",
          maxWidth: "100%",
          top: "11.4%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          left: 0,
        }}
      >
        {numItemsInCart === 0 ? (
          <SectionTitle text="Your cart is empty" />
        ) : (
          <>
            <SectionTitle text="Shopping Cart" />
            <div className="mt-8 grid gap-8 lg:grid-cols-12 bg-base-200/60 rounded-lg p-4 xl:p-8">
              <div className="lg:col-span-8">
                <CartItemsList />
              </div>
              <div className="lg:col-span-4 lg:pl-4">
                <CartTotals />
                {user ? (
                  <Link
                    to="/checkout"
                    className="btn btn-primary btn-block mt-8 text-sm sm:text-base"
                  >
                    proceed to checkout
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="btn btn-primary btn-block mt-8 text-sm sm:text-base"
                  >
                    please login
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Cart;
