import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetchStrapi } from "../utils";
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from "../components";
import { removeItem } from "../features/checkout/checkoutSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
// const url = "/products?featured=true";
import hero1w from "../assets/hero1w.webp";
import hero2w from "../assets/hero2w.webp";
import hero13w from "../assets/hero13w.webp";
import hero4w from "../assets/hero4w.webp";
import hero25w from "../assets/hero25w.webp";
import hero6w from "../assets/hero6w.webp";
import hero17w from "../assets/hero17w.webp";
import hero8w from "../assets/hero8w.webp";
import hero19w from "../assets/hero19w.webp";
import hero20w from "../assets/hero20w.webp";

const carouselImagesWide = [
  hero6w,
  hero17w,
  hero8w,
  hero19w,
  hero20w,
  hero1w,
  hero2w,
  hero13w,
  hero4w,
  hero25w,
];

const ordersQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetchStrapi.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn("You must logged in to view orders");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );

      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect("/login");
      return null;
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();
  //   if (meta.pagination.total < 1) {
  //     return <SectionTitle text="please make an order" />;
  //   }
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
          // minHeight: "100%",
          top: "11.4%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          left: 0,
        }}
      >
        {" "}
        {meta.pagination.total < 1 ? (
          <SectionTitle text="please make an order" />
        ) : (
          <>
            <SectionTitle text="Your Orders" />
            <div className="lg:max-w-6xl mx-auto p-4 rounded-md bg-base-200/80 mt-4">
              <OrdersList />
              <ComplexPaginationContainer />
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Orders;
