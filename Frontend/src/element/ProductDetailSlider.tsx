import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { IMAGE } from "../constent/theme"
import { Autoplay } from "swiper/modules"
import { useRef } from "react"
import { Link } from "react-router-dom"



const relatedProducts = [
    { img: IMAGE.produc_item1, title: 'Checked Short Dress' },
    { img: IMAGE.produc_item2, title: 'Slim Fit Chinos' },
    { img: IMAGE.produc_item3, title: 'Dark Brown Boots' },
    { img: IMAGE.produc_item4, title: 'Light Blue Denim Dress' },
    { img: IMAGE.produc_item1, title: 'Checked Short Dress' },
    { img: IMAGE.produc_item2, title: 'Slim Fit Chinos' },
    { img: IMAGE.produc_item3, title: 'Dark Brown Boots' },
    { img: IMAGE.produc_item4, title: 'Light Blue Denim Dress' },
]
const ProductDetailSlider = () => {

    const ref = useRef<SwiperRef | null>(null);


    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h5 className="m-b20">Related Products</h5>
                    <Swiper className="img-carousel-content owl-carousel owl-btn-center-lr owl-btn-1 primary"
                        slidesPerView={4}
                        spaceBetween={25}
                        loop={true}
                        speed={1500}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false
                        }}
                        ref={ref}
                        breakpoints={{
                            900: {
                                slidesPerView: 3
                            },
                            500: {
                                slidesPerView: 2
                            },
                            240: {
                                slidesPerView: 1
                            },
                        }}
                    >
                        {relatedProducts.map((item, ind) => (
                            <SwiperSlide className="item" key={ind}>
                                <div className="item-box">
                                    <div className="item-img">
                                        <img src={item.img} alt="" />
                                        <div className="item-info-in">
                                            <ul>
                                                <li><Link to="#"><i className="ti-shopping-cart"></i></Link></li>
                                                <li><Link to="#"><i className="ti-eye"></i></Link></li>
                                                <li><Link to="#"><i className="ti-heart"></i></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="item-info text-center text-black p-a10">
                                        <h6 className="item-title font-weight-500"><Link to="/shop-product-details">{item.title}</Link></h6>
                                        <ul className="item-review">
                                            <li><i className="fa fa-star m-l5"></i></li>
                                            <li><i className="fa fa-star m-l5"></i></li>
                                            <li><i className="fa fa-star m-l5"></i></li>
                                            <li><i className="fa fa-star-half-o m-l5"></i></li>
                                            <li><i className="fa fa-star-o m-l5"></i></li>
                                        </ul>
                                        <h4 className="item-price"><del>$232</del> <span className="text-primary">$192</span></h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div className="light-carousel-buttons">
                            <div onClick={() => { ref.current?.swiper.slidePrev() }} className="button-prev"><i className="ti-angle-left"></i></div>
                            <div onClick={() => { ref.current?.swiper.slideNext() }} className="button-next"><i className="ti-angle-right"></i></div>
                        </div>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default ProductDetailSlider