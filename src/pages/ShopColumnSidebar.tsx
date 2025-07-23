import CommonBanner2 from "../element/CommonBanner2";
import { IMAGE } from "../constent/theme";
import { ShopColumnDescription } from "./ShopColumn";
import { Link } from "react-router-dom";
import { useState } from "react";
import MultiRangeSlider from "../element/MultirangeSlider";
import '../App.css';

const product = [
  { img: IMAGE.produc_item1 },
  { img: IMAGE.produc_item2 },
  { img: IMAGE.produc_item3 },
  { img: IMAGE.produc_item4 },
  { img: IMAGE.produc_item5 },
  { img: IMAGE.produc_item6 },
  { img: IMAGE.produc_item7 },
  { img: IMAGE.produc_item8 },
  { img: IMAGE.produc_item1 },
  { img: IMAGE.produc_item2 },
  { img: IMAGE.produc_item3 },
  { img: IMAGE.produc_item4 },
];
const ShopColumnSidebar = () => {
  return (
    <>
      <div className="page-content bg-white">
        <CommonBanner2 title={"Shop Columns Sidebar"} img={IMAGE.banner2} />
        <div className="section-full content-inner">
          <div className="container">
            <div className="row">
              <ShopColumnsAccordian />
              <div className="col-lg-9 col-md-8 col-sm-6 ">
                <div className="row">
                  {product.map((item, index) => (
                    <div
                      className="col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
                      key={index}
                    >
                      <div className="item-box m-b10">
                        <div className="item-img">
                          <img src={item.img} alt="" />
                          <div className="item-info-in center">
                            <ul>
                              <li>
                                <Link to={"#"}>
                                  <i className="ti-shopping-cart"></i>
                                </Link>
                              </li>
                              <li>
                                <Link to={"#"}>
                                  <i className="ti-eye"></i>
                                </Link>
                              </li>
                              <li>
                                <Link to={"#"}>
                                  <i className="ti-heart"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="item-info text-center text-black p-a10">
                          <h6 className="item-title font-weight-500">
                            <Link to="/shop-product-details">
                              Checked Short Dress
                            </Link>
                          </h6>
                          <ul className="item-review">
                            <li>
                              <i className="fa fa-star m-l5"></i>
                            </li>
                            <li>
                              <i className="fa fa-star m-l5"></i>
                            </li>
                            <li>
                              <i className="fa fa-star m-l5"></i>
                            </li>
                            <li>
                              <i className="fa fa-star-half-o m-l5"></i>
                            </li>
                            <li>
                              <i className="fa fa-star-o m-l5"></i>
                            </li>
                          </ul>
                          <h4 className="item-price">
                            <del>$232</del>{" "}
                            <span className="text-primary">$192</span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ShopColumnDescription />
      </div>
    </>
  );
};

const inputCheckBox = [
  { id: "customRadio1", title: "Gap" },
  { id: "customRadio2", title: "Guess" },
  { id: "customRadio3", title: "Lacoste" },
  { id: "customRadio4", title: "Levi's" },
  { id: "customRadio5", title: "Polo" },
  { id: "customRadio6", title: "Gap" },
  { id: "customRadio7", title: "Guess" },
  { id: "customRadio8", title: "Lacoste" },
  { id: "customRadio9", title: "Levi" },
  { id: "customRadio10", title: "Polo" },
];
export const ShopColumnsAccordian = () => {
  const [itemId, setId] = useState(0);
  const [colorOption, setColorOption] = useState(0);

  function accordianBtn(action: number) {
    const show = document.querySelectorAll(".acod-body");
    // console.log(show);

    const collapsed = document.querySelectorAll(".acod-title a");
    show.forEach((ele, ind) => {
      show[action].classList.toggle("show");
      if (ind !== action) {
        ele.classList.remove("show");
      }
    });
    collapsed.forEach((ell, index) => {
      collapsed[action].classList.toggle("collapsed");
      if (index !== action) {
        ell.classList.add("collapsed");
      }
    });
  }

  //select option
  function SelectOptionBtn(id: number) {
    setId(id);
  }

  // select color
  function AddActiveClassBtn(e: number) {
    setColorOption(e);
  }

  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-6 sticky-top">
        <aside className="side-bar shop-categories">
          <div className="widget recent-posts-entry">
            <div
              className="dlab-accordion advanced-search toggle"
              id="accordion1"
            >
              <div className="panel">
                <div className="acod-head">
                  <h5 className="acod-title">
                    <Link
                      className=""
                      onClick={() => {
                        accordianBtn(0);
                      }}
                      to="#"
                    >
                      Product categories
                    </Link>
                  </h5>
                </div>
                <div id="categories" className={`acod-body collapse show`}>
                  <div className="acod-content">
                    <div className="widget widget_services">
                      <ul>
                        <li>
                          <Link to="#">Bags</Link>
                        </li>
                        <li>
                          <Link to="#">Jeans</Link>
                        </li>
                        <li>
                          <Link to="#">Shoes</Link>
                        </li>
                        <li>
                          <Link to="#">Sweaters</Link>
                        </li>
                        <li>
                          <Link to="#">Tops</Link>
                        </li>
                        <li>
                          <Link to="#">Women</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="acod-head">
                  <h5 className="acod-title">
                    <Link
                      className="collapsed"
                      onClick={() => {
                        accordianBtn(1);
                      }}
                      to="#"
                    >
                      Price Range
                    </Link>
                  </h5>
                </div>
                <div id="price-range" className="acod-body collapse">
                  <div className="acod-content">
                    <div className="price-slide-2 range-slider">
                      <div className="price">
                        <MultiRangeSlider
                          min={0}
                          max={1000}
                          // onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                          onChange={({
                            min,
                            max,
                          }: {
                            min: number;
                            max: number;
                          }) => `min = ${min}, max = ${max}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="acod-head">
                  <h5 className="acod-title">
                    <Link
                      className="collapsed"
                      onClick={() => {
                        accordianBtn(2);
                      }}
                      to="#"
                    >
                      color
                    </Link>
                  </h5>
                </div>
                <div id="color" className="acod-body collapse">
                  <div className="acod-content">
                    <h6>Select the color</h6>
                    <div
                      className="btn-group product-item-color"
                      data-toggle="buttons"
                    >
                      <label
                        onClick={() => {
                          AddActiveClassBtn(0);
                        }}
                        className={`btn bg-red ${
                          colorOption === 0 ? "active" : ""
                        }`}
                      >
                        <input
                          name="options"
                          id="option1"
                          defaultChecked
                          type="radio"
                        />
                      </label>
                      <label
                        onClick={() => {
                          AddActiveClassBtn(1);
                        }}
                        className={`btn bg-pink ${
                          colorOption === 1 ? "active" : ""
                        }`}
                      >
                        <input name="options" id="option2" type="radio" />
                      </label>
                      <label
                        onClick={() => {
                          AddActiveClassBtn(2);
                        }}
                        className={`btn bg-yellow ${
                          colorOption === 2 ? "active" : ""
                        }`}
                      >
                        <input name="options" id="option3" type="radio" />
                      </label>
                      <label
                        onClick={() => {
                          AddActiveClassBtn(3);
                        }}
                        className={`btn bg-blue ${
                          colorOption === 3 ? "active" : ""
                        }`}
                      >
                        <input name="options" id="option4" type="radio" />
                      </label>
                      <label
                        onClick={() => {
                          AddActiveClassBtn(4);
                        }}
                        className={`btn bg-green ${
                          colorOption === 4 ? "active" : ""
                        }`}
                      >
                        <input name="options" id="option5" type="radio" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="acod-head">
                  <h5 className="acod-title">
                    <Link
                      className="collapsed"
                      onClick={() => {
                        accordianBtn(3);
                      }}
                      to="#"
                    >
                      Size
                    </Link>
                  </h5>
                </div>
                <div id="size" className="acod-body collapse">
                  <div className="acod-content">
                    <h6>Product Size</h6>
                    <div
                      className="btn-group product-item-size"
                      data-toggle="buttons"
                    >
                      <label
                        onClick={() => {
                          SelectOptionBtn(0);
                        }}
                        className={`btn ${itemId === 0 ? "active" : ""}`}
                      >
                        <input
                          name="options"
                          id="option6"
                          defaultChecked
                          type="radio"
                        />
                        XS
                      </label>
                      <label
                        onClick={() => {
                          SelectOptionBtn(1);
                        }}
                        className={`btn ${itemId === 1 ? "active" : ""}`}
                      >
                        <input name="options" id="option7" type="radio" /> LG
                      </label>
                      <label
                        onClick={() => {
                          SelectOptionBtn(2);
                        }}
                        className={`btn ${itemId === 2 ? "active" : ""}`}
                      >
                        <input name="options" id="option8" type="radio" /> MD
                      </label>
                      <label
                        onClick={() => {
                          SelectOptionBtn(3);
                        }}
                        className={`btn ${itemId === 3 ? "active" : ""}`}
                      >
                        <input name="options" id="option9" type="radio" /> SM
                      </label>
                      <label
                        onClick={() => {
                          SelectOptionBtn(4);
                        }}
                        className={`btn ${itemId === 4 ? "active" : ""}`}
                      >
                        <input name="options" id="option10" type="radio" /> Xl
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="acod-head">
                  <h5 className="acod-title">
                    <Link
                      className="collapsed"
                      onClick={() => {
                        accordianBtn(4);
                      }}
                      to="#"
                    >
                      vendor
                    </Link>
                  </h5>
                </div>
                <div id="vendor" className="acod-body collapse">
                  <div className="acod-content">
                    <div className="product-brand">
                      {inputCheckBox.map((data, ind) => (
                        <div
                          className="custom-control custom-checkbox"
                          key={ind}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={data.id}
                            name={"example1"}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={data.id}
                          >
                            {data.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="acod-head">
                  <h5 className="acod-title">
                    <Link
                      className="collapsed"
                      onClick={() => {
                        accordianBtn(5);
                      }}
                      to="#"
                    >
                      popular tags
                    </Link>
                  </h5>
                </div>
                <div id="tags" className="acod-body collapse">
                  <div className="acod-content">
                    <div className="widget_tag_cloud radius">
                      <div className="tagcloud">
                        {" "}
                        <Link to="#">Design</Link>
                        <Link to={"#"}>User interface</Link>
                        <Link to={"#"}>SEO</Link>
                        <Link to={"#"}>WordPress</Link>
                        <Link to={"#"}>Development</Link>
                        <Link to={"#"}>Joomla</Link>
                        <Link to={"#"}>Design</Link>
                        <Link to={"#"}>User interface</Link>
                        <Link to={"#"}>SEO</Link>
                        <Link to={"#"}>WordPress</Link>
                        <Link to={"#"}>Development</Link>
                        <Link to={"#"}>Joomla</Link>
                        <Link to={"#"}>Design</Link>
                        <Link to={"#"}>User interface</Link>
                        <Link to={"#"}>SEO</Link>
                        <Link to={"#"}>WordPress</Link>
                        <Link to={"#"}>Development</Link>
                        <Link to={"#"}>Joomla</Link>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="acod-head">
                  <h5 className="acod-title">
                    <Link
                      className="collapsed"
                      onClick={() => {
                        accordianBtn(6);
                      }}
                      to="#"
                    >
                      Features
                    </Link>
                  </h5>
                </div>
                <div id="features" className="acod-body collapse">
                  <div className="acod-content">
                    <div className="item-widgets-box">
                      <div className="item-widgets-left">
                        <img src={IMAGE.product_thumbItem1} alt="" />
                      </div>
                      <div className="item-widgets-body text-black">
                        <h6 className="item-title font-weight-500 m-t0">
                          <Link to="/shop-product-details">
                            Dark Brown Boots
                          </Link>
                        </h6>
                        <ul className="item-review text-yellow-light">
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star-half-o"></i>
                          </li>
                          <li>
                            <i className="fa fa-star-o"></i>
                          </li>
                        </ul>
                        <h6 className="item-price m-b0">
                          <del>$232</del>{" "}
                          <span className="text-primary">$192</span>
                        </h6>
                      </div>
                    </div>
                    <div className="item-widgets-box">
                      <div className="item-widgets-left">
                        <img src={IMAGE.product_thumbItem2} alt="" />
                      </div>
                      <div className="item-widgets-body text-black">
                        <h6 className="item-title font-weight-500 m-t0">
                          <Link to="/shop-product-details">
                            Slim Fit Chinos
                          </Link>
                        </h6>
                        <ul className="item-review text-yellow-light">
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star-half-o"></i>
                          </li>
                          <li>
                            <i className="fa fa-star-o"></i>
                          </li>
                        </ul>
                        <h6 className="item-price m-b0">
                          <del>$232</del>{" "}
                          <span className="text-primary">$192</span>
                        </h6>
                      </div>
                    </div>
                    <div className="item-widgets-box">
                      <div className="item-widgets-left">
                        <img src={IMAGE.product_thumbItem3} alt="" />
                      </div>
                      <div className="item-widgets-body text-black">
                        <h6 className="item-title font-weight-500 m-t0">
                          <Link to="/shop-product-details">Green Trousers</Link>
                        </h6>
                        <ul className="item-review text-yellow-light">
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star-half-o"></i>
                          </li>
                          <li>
                            <i className="fa fa-star-o"></i>
                          </li>
                        </ul>
                        <h6 className="item-price m-b0">
                          <del>$232</del>{" "}
                          <span className="text-primary">$192</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default ShopColumnSidebar;
