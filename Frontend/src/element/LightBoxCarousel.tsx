import React from "react"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { IMAGE } from "../constent/theme"
import { Link } from "react-router-dom"


const lightgalleryThumb = [
    { img: IMAGE.lightGallery_thumbPic1 },
    { img: IMAGE.lightGallery_thumbPic2 },
    { img: IMAGE.lightGallery_thumbPic3 },
    { img: IMAGE.lightGallery_thumbPic4 },
    { img: IMAGE.lightGallery_thumbPic1 },
    { img: IMAGE.lightGallery_thumbPic2 },
    { img: IMAGE.lightGallery_thumbPic3 },
    { img: IMAGE.lightGallery_thumbPic4 },
]
const LightBoxCarousel = () => {

    const swiperElRef = React.useRef<SwiperRef | null>(null);


        // light gallery 
   
    // const gsBgImgSelector = ".swiper-slide img";

    // const dynamicEl = [...document.querySelectorAll(gsBgImgSelector)].map(
    //     (sliderImg) => {
    //         return {
    //             src: sliderImg.src,
    //             thumb: sliderImg.src,
    //             subHtml: "<h4>Image 1 title</h4><p>Image 1 descriptions.</p>"
    //         };
    //     }
    // );

    // console.log(dynamicEl);

//     const dynamicGallery = document.querySelector(".dynamic-gallery-button");

//     const popup = lightGallery(dynamicGallery, {
//         dynamic: true,
//         dynamicEl
//     });

//     console.debug(popup);

//     dynamicGallery.addEventListener("click", () => {
//         popup.openGallery(0);
//     });

//     [...document.querySelectorAll(".swiper-slide")].map((slide, idx) => {
//         slide.addEventListener("click", () => {
//             popup.openGallery(idx);
//         });
//     });
// });

    return (
        <>
            <div className="section-full content-inner">
                <div className="container">
                    <div className="section-head text-black text-center m-b20">
                        <h2 className="text-primary m-b10">Light Box Carousel</h2>
                        <div className="dlab-separator-outer m-b0">
                            <div className="dlab-separator text-primary style-icon"><i className="flaticon-spa text-primary"></i></div>
                        </div>
                        <p className="m-b0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.</p>
                    </div>
                    <div className="section-content text-center" style={{ position: "relative" }}>
                        <Swiper className="owl-carousel img-carousel-content owl-btn-1 primary lightgallery owl-btn-center-lr"
                            slidesPerView={4}
                            spaceBetween={30}
                            speed={1500}
                            ref={swiperElRef}
                            breakpoints={{
                                1000: { slidesPerView: 3 },
                                500: { slidesPerView: 2 },
                                240: { slidesPerView: 1 },
                            }}
                        >
                            {lightgalleryThumb.map((item, index) => (
                                <SwiperSlide className="item" key={index}>
                                    <div className="dlab-box dlab-gallery-box">
                                        <div className="dlab-thum dlab-img-overlay1 dlab-img-effect zoom-slow">
                                            <Link to="#">
                                                <img className="" src={item.img} alt="" />
                                            </Link>
                                            <div className="overlay-bx">
                                                <div className="overlay-icon">
                                                    <span data-exthumbimage="images/gallery/thumb/lightgallery/pic1.jpg" className="icon-bx-xs check-km">
                                                        <i className="ti-fullscreen"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                            <div className="light-carousel-buttons">
                                <div onClick={() => { swiperElRef.current?.swiper.slidePrev() }} className="button-prev"><i className="ti-angle-left"></i></div>
                                <div onClick={() => { swiperElRef.current?.swiper.slideNext() }} className="button-next"><i className="ti-angle-right"></i></div>
                            </div>
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}


export default LightBoxCarousel