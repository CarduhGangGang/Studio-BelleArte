import { IMAGE } from "../constent/theme";
import CommonBanner2 from "../element/CommonBanner2";
import ProductContent from "../element/ProductContent";
import ProductDetailSlider from "../element/ProductDetailSlider";
import ProductDetails from "../element/ProductDetails";
import { ShopColumnDescription } from "./ShopColumn";
import '../App.css';

const ShopProductDetails = () => {
  return (
    <>
      <div className="page-content bg-white">
        <CommonBanner2 title={"Product Details"} img={IMAGE.banner2} />
        <div className="section-full content-inner bg-white">
          <div className="container woo-entry">
            <ProductDetails />
            <ProductContent />
            <ProductDetailSlider />
          </div>
        </div>
        <ShopColumnDescription />
      </div>
    </>
  );
};

export default ShopProductDetails;
