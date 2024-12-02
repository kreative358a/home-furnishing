import { Outlet, useNavigation } from "react-router-dom";
import { Header, Navbar, Loading } from "../components";
const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        zIndex: 9,
        top: 0,
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Header />
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-4 md:py-8 lg:py-12">
          <Outlet />
        </section>
      )}
    </div>
  );
};
export default HomeLayout;
