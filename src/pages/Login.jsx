import { FormInput, SubmitBtn } from "../components";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { customFetchStrapi } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

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

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetchStrapi.post("/auth/local", data);
      console.log("response: ", response);
      store.dispatch(loginUser(response.data));
      toast.success("logged in successfully");
      return redirect("/");
    } catch (error) {
      console.log("error: ", error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetchStrapi.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("guest user login error. please try again");
    }
  };
  // flex justify-center
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
        className="div-scrollbar pt-2 pb-8 sm:pt-6 lg:mt-2 bg-base-100/15 px-2"
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
        <section className="justify-items-center mx-auto">
          {/* <section className="h-screen grid place-items-center"> */}
          <div className="my-12">
            <Link to="/" className="btn btn-secondary text-base sm:text-lg">
              go back home
            </Link>
          </div>
          <Form
            method="POST"
            className="card w-[32rem] max-w-[90%] p-8 bg-base-300/80  shadow-lg flex flex-col gap-y-4 border-2 rounded-md border-secondary/20 hover:border-secondary/40 mx-auto"
          >
            <h4 className="text-center text-3xl font-bold">Login</h4>
            <FormInput type="email" label="email" name="identifier" />
            <FormInput type="password" label="password" name="password" />
            <div className="mt-4">
              <SubmitBtn text="login" />
            </div>
            {/* <button
      type="button"
      className="btn btn-secondary btn-block"
      onClick={loginAsGuestUser}
    >
      guest user
    </button>
    <button
      type="button"
      className="btn btn-secondary btn-block"
      onClick={loginAsGuestUser}
    >
      login
    </button> */}
            <p className="text-center text-base sm:text-lg">
              Not a member yet?{" "}
              <Link
                to="/register"
                className="ml-2 link link-hover link-secondary capitalize"
              >
                register
              </Link>
            </p>
          </Form>
        </section>
      </div>
    </>
  );
};
export default Login;
