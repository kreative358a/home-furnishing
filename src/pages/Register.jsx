import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect } from "react-router-dom";
import { customFetchStrapi } from "../utils";
import { toast } from "react-toastify";

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

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetchStrapi.post("/auth/local/register", data);
    toast.success("account created successfully");
    return redirect("/login");
  } catch (error) {
    console.log("error: ", error);
    const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check your credentials";
    toast.error(errorMessage);
    return null;
  }
};
// peter.parker@avengers.xxx
const Register = () => {
  return (
    // <section className="h-screen grid place-items-center">
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
        className="mainContent pt-0  lg:mt-2 bg-base-100/15 px-2"
        // style={{
        //   position: "fixed",
        //   zIndex: 8,
        //   minWidth: "100%",
        //   minHeight: "90%",
        //   maxHeight: "90%",
        //   maxWidth: "100%",
        //   top: "10.8%",
        //   alignItems: "center",
        //   justifyContent: "center",
        //   flexDirection: "column",
        //   left: 0,
        // }}
      >
        <section className="justify-items-center mx-auto">
          <div className="my-6 2xl:my-10">
            <Link
              to="/"
              className="btn btn-secondary  text-base sm:text-lg xl:text-xl"
            >
              go back home
            </Link>
          </div>
          <Form
            method="POST"
            className="card w-[32rem] max-w-[90%] p-8 bg-base-300/80  shadow-lg flex flex-col gap-y-4 border-2 rounded-md border-secondary/20 hover:border-secondary/40 mx-auto"
          >
            <h4 className="text-center text-3xl font-bold">Register</h4>
            <FormInput type="text" label="username" name="username" />
            <FormInput type="email" label="email" name="email" />
            <FormInput type="password" label="password" name="password" />
            <div className="mt-4">
              <SubmitBtn text="register" />
            </div>
            <p className="text-center text-base sm:text-lg">
              Already a member?
              <Link
                to="/login"
                className="ml-2 link link-hover link-secondary capitalize"
              >
                login
              </Link>
            </p>
          </Form>
        </section>
      </div>
    </>
  );
};

export default Register;
