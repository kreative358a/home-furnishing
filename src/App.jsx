// import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  ProductsHF,
  Register,
  SingleProductHF,
} from "./pages";

import { ErrorElement } from "./components";

// loaders
import { loader as landingLoader } from "./pages/Landing";
// import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as singleProductLoaderHF } from "./pages/SingleProductHF";
// import { loader as productsLoader } from "./pages/Products";
import { loader as productsLoaderHF } from "./pages/ProductsHF";
import { loader as checkoutLoader } from "./pages/Checkout";
import { loader as ordersLoader } from "./pages/Orders";

// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./components/CheckoutForm";

import { store } from "./store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          errorElement: <ErrorElement />,
          loader: landingLoader(queryClient),
        },
        // {
        //   path: "products",
        //   element: <Products />,
        //   errorElement: <ErrorElement />,
        //   loader: productsLoader(queryClient),
        // },

        {
          path: "products-hf",
          element: <ProductsHF />,
          errorElement: <ErrorElement />,
          loader: productsLoaderHF(queryClient),
        },

        // {
        //   path: "products/:id",
        //   element: <SingleProduct />,
        //   errorElement: <ErrorElement />,
        //   loader: singleProductLoader(queryClient),
        // },

        {
          path: "products-hf/:id",
          element: <SingleProductHF />,
          errorElement: <ErrorElement />,
          loader: singleProductLoaderHF(queryClient),
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "checkout",
          element: <Checkout />,
          loader: checkoutLoader(store),
          action: checkoutAction(store, queryClient),
        },
        {
          path: "orders",
          element: <Orders />,
          loader: ordersLoader(store, queryClient),
        },

        {
          path: "/login",
          element: <Login />,
          errorElement: <Error />,
          action: loginAction(store),
        },
        {
          path: "/register",
          element: <Register />,
          errorElement: <Error />,
          action: registerAction,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true,
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
    },
  }
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
