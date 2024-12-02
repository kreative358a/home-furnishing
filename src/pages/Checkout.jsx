import { useSelector } from "react-redux";
import { CheckoutForm, SectionTitle, CartTotals } from "../components";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { CheckoutFormHF } from "../components";
import { nanoid } from "nanoid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
// const url = "/products?featured=true";
import hero1w from "../assets/hero1w.webp";
import hero12w from "../assets/hero12w.webp";
import hero3w from "../assets/hero3w.webp";
import hero4w from "../assets/hero4w.webp";
import hero15w from "../assets/hero15w.webp";
import hero6w from "../assets/hero6w.webp";
import hero7w from "../assets/hero7w.webp";
import hero18w from "../assets/hero18w.webp";
import hero9w from "../assets/hero9w.webp";
import hero10w from "../assets/hero10w.webp";

const carouselImagesWide = [
  hero1w,
  hero12w,
  hero3w,
  hero4w,
  hero15w,
  hero6w,
  hero7w,
  hero18w,
  hero9w,
  hero10w,
];

export const loader = (store) => () => {
  const user = store.getState().userState.user;

  if (!user) {
    toast.warn("You must be logged in to checkout");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const cartTotal = useSelector((state) => state.cartState.cartTotal);
  // if (cartTotal === 0) {
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
          opacity: 0.8,
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
        {cartTotal === 0 ? (
          <SectionTitle text="Your cart is empty" />
        ) : (
          <>
            <SectionTitle text="place your order" />
            <div className="mt-4 grid gap-8 lg:grid-cols-12 bg-base-200/60 rounded-lg p-2 xl:px-8 max-w-2xl md:max-w-4xl lg:max-w-6xl py-4">
              <div className="grid-row lg:col-span-8 px-8 lg:px-2">
                <CheckoutForm />
                {/* <CheckoutFormHF /> */}
              </div>
              <div className="grid-row lg:col-span-4 px-8 lg:px-2">
                <CartTotals />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Checkout;
