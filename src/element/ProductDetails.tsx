import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { IMAGE } from "../constent/theme";
import { useRef, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Link } from "react-router-dom";

const slideImage = [
  { img: IMAGE.produc_item1 },
  { img: IMAGE.produc_item2 },
  { img: IMAGE.produc_item3 },
  { img: IMAGE.produc_item4 },
  { img: IMAGE.produc_item5 },
];

const sizeList = [
  { size: "XS" },
  { size: "LG" },
  { size: "MD" },
  { size: "SM" },
  { size: "Xl" },
];

const colorList = [
  { color: "bg-red" },
  { color: "bg-pink" },
  { color: "bg-yellow" },
  { color: " bg-blue" },
  { color: "bg-green" },
];
const ProductDetails = () => {
  const ref = useRef<SwiperRef | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [count, setCount] = useState(1);
  const [addActive, setActive] = useState(0);
  const [color, setColor] = useState(0);

  function CounterBtn(type: string) {
    switch (type) {
      case "increament":
        setCount((count) => count + 1);
        break;
      case "decreament":
        setCount((count) => (count > 1 ? count - 1 : count));
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className="row m-b30">
        <div className="col-lg-5 col-md-5">
          <div className="product-gallery on-show-slider">
            <Swiper
              id="sync1"
              className="owl-carousel owl-theme owl-btn-center-lr m-b5 owl-btn-1 primary"
              slidesPerView={1}
              ref={ref}
              speed={1200}
              spaceBetween={10}
              thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
              onSwiper={(swiper) => {
                if (ref.current) ref.current.swiper = swiper;
              }}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {slideImage.map((item, ind) => (
                <SwiperSlide className="item" key={ind}>
                  <div className="mfp-gallery">
                    <div className="dlab-box">
                      <img src={item.img} alt="" />
                      {/*<div className="dlab-thum-bx dlab-img-overlay1 ">
                                               <div className="overlay-bx">
                                                    <div className="overlay-icon">
                                                        <Link className="mfp-link" to="images/product/product/item1.jpg" title="Title Come Here">
                                                            <i className="ti-fullscreen"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div> */}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="light-carousel-buttons">
                <div
                  onClick={() => {
                    ref.current?.swiper.slidePrev();
                  }}
                  className="button-prev"
                >
                  <i className="ti-angle-left"></i>
                </div>
                <div
                  onClick={() => {
                    ref.current?.swiper.slideNext();
                  }}
                  className="button-next"
                >
                  <i className="ti-angle-right"></i>
                </div>
              </div>
            </Swiper>
            <Swiper
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              onSwiper={(swiper: any) => {
                setThumbsSwiper(swiper);
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
              id="sync2"
            >
              {slideImage.map((item, ind) => (
                <SwiperSlide className="item" key={ind}>
                  <div className="dlab-media">
                    <img src={item.img} alt="" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="col-lg-7 col-md-7">
          <form method="post" className="cart sticky-top">
            <div className="dlab-post-title ">
              <h4 className="post-title">Marc Jacobs Daisy</h4>
              <p className="m-b10">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took Link
                galley of type and scrambled it to make Link type specimen book.
                It has survived not only five centuries, but also the leap into
                electronic.
              </p>
              <div className="dlab-divider bg-gray tb15">
                <i className="icon-dot c-square"></i>
              </div>
            </div>
            <div className="relative">
              <h3 className="m-tb10">$2,140.00 </h3>
              <div className="shop-item-rating">
                <span className="rating-bx">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i>
                  <i className="fa fa-star-o"></i>
                </span>
                <span>4.5 Rating</span>
              </div>
            </div>
            <div className="shop-item-tage">
              <span>Tags :- </span>
              <Link to="#">Shoes,</Link>
              <Link to="#">Clothing</Link>
              <Link to="#">T-shirts</Link>
            </div>
            <div className="dlab-divider bg-gray tb15">
              <i className="icon-dot c-square"></i>
            </div>
            <div className="row">
              <div className="m-b30 col-lg-6 col-md-7">
                <h6>Product Size</h6>
                <div
                  className="btn-group product-item-size"
                  data-toggle="buttons"
                >
                  {sizeList.map((i, ind) => (
                    <label
                      className={`btn ${addActive === ind ? "active" : ""}`}
                      key={ind}
                      onClick={() => {
                        setActive(ind);
                      }}
                    >
                      <input type="radio" name="options" />
                      {i.size}
                    </label>
                  ))}
                </div>
              </div>
              <div className="m-b30 col-lg-6 col-md-5">
                <h6>Select quantity</h6>
                <div className="quantity btn-quantity style-1">
                  <div className="input-group bootstrap-touchspin">
                    <input
                      id="demo_vertical2"
                      className="form-control"
                      type="text"
                      value={count}
                      name="demo_vertical2"
                      style={{ display: "block", pointerEvents: "none" }}
                    />
                    <span className="input-group-btn-vertical">
                      <button
                        onClick={() => {
                          CounterBtn("increament");
                        }}
                        className="btn btn-default bootstrap-touchspin-up"
                        type="button"
                      >
                        <i className="ti-plus"></i>
                      </button>
                      <button
                        onClick={() => {
                          CounterBtn("decreament");
                        }}
                        className="btn btn-default bootstrap-touchspin-down"
                        type="button"
                      >
                        <i className="ti-minus"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-b30">
              <h6>Select the color</h6>
              <div
                className="btn-group product-item-color"
                data-toggle="buttons"
              >
                {colorList.map((item, index) => (
                  <label
                    onClick={() => [setColor(index)]}
                    className={`btn ${item.color} ${
                      color === index ? "active" : ""
                    }`}
                    key={index}
                  >
                    <input type="radio" name="options" id="option6" />
                  </label>
                ))}
              </div>
            </div>
            <Link to="/shop-cart" className="site-button radius-no">
              <i className="ti-shopping-cart"></i> Add To Cart
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
