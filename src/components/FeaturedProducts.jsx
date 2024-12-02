// import ProductsGrid from "./ProductsGrid";
// import SectionTitle from "./SectionTitle";
// import ProductsContainerMy from "./ProductsContainerMy";
// import ProductsContainer from "./ProductsContainer";
// import PaginationContainer from "./PaginationContainer";

// const FeaturedProducts = () => {
//   return (
//     <div className="pt-24">
//       <SectionTitle text="featured products" />
//       {/* <ProductsGrid /> */}
//       <ProductsContainer />
//       <PaginationContainer />
//     </div>
//   );
// };
// export default FeaturedProducts;

import ProductsGrid from "./ProductsGrid";
import SectionTitle from "./SectionTitle";

const FeaturedProducts = () => {
  return (
    <div className="pt-24">
      <SectionTitle text="featured products" />
      <ProductsGrid />
    </div>
  );
};
export default FeaturedProducts;
