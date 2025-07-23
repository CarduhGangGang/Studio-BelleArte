import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"
import CommonBanner2 from "../element/CommonBanner2"
import { useState } from "react"
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import '../App.css';




const blogGallery = [
    { img: IMAGE.image_galleryPic1, categery: "Haircuts" },
    { img: IMAGE.image_galleryPic2, categery: "Coloring" },
    { img: IMAGE.image_galleryPic3, categery: "Massage" },
    { img: IMAGE.image_galleryPic4, categery: "Haircuts" },
    { img: IMAGE.image_galleryPic5, categery: "Highlights" },
    { img: IMAGE.image_galleryPic6, categery: "Massage" },
    { img: IMAGE.image_galleryPic7, categery: "Coloring" },
    { img: IMAGE.image_galleryPic8, categery: "Coloring" },
    { img: IMAGE.image_galleryPic9, categery: "Makeup" },
    { img: IMAGE.image_galleryPic1, categery: "Haircuts" },
    { img: IMAGE.image_galleryPic2, categery: "Coloring" },
    { img: IMAGE.image_galleryPic3, categery: "Massage" },
]
const PortfolioGrid3 = () => {

    const [addActive, setActive] = useState('All');
    const [images, setImages] = useState(blogGallery)
    function filterBtn(categery: string) {
        setActive(categery);
        const updeteItem = blogGallery.filter((ele) => {
            return ele.categery === categery
        })
        setImages(updeteItem);

    }
    return (
        <div className="page-content bg-white">
            <CommonBanner2 title={'Portfolio Grid 4'} img={IMAGE.banner2} />
            <div className="content-block">
                <div className="section-full content-inner-2 portfolio-box">
                    <div className="container">
                        <div className="section-head text-black text-center m-b20">
                            <h2 className="text-primary m-b10">Our Portfolio</h2>
                            <div className="dlab-separator-outer m-b0">
                                <div className="dlab-separator text-primary style-icon"><i className="flaticon-spa text-primary"></i></div>
                            </div>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.</p>
                        </div>

                        <div className="site-filters style1 clearfix center">
                            <ul className="filters" data-toggle="buttons">
                                <li onClick={() => { filterBtn('All'); setImages(blogGallery) }} className={`btn ${addActive === 'All' ? 'active' : ''}`}><Link to="#"><span>All</span></Link></li>
                                <li onClick={() => { filterBtn('Haircuts') }} className={`btn ${addActive === 'Haircuts' ? 'active' : ''}`}><Link to="#"><span>Haircuts</span></Link></li>
                                <li onClick={() => { filterBtn('Coloring') }} className={`btn ${addActive === 'Coloring' ? 'active' : ''}`}><Link to="#"><span>Coloring</span></Link></li>
                                <li onClick={() => { filterBtn('Makeup') }} className={`btn ${addActive === 'Makeup' ? 'active' : ''}`}><Link to="#"><span>Makeup</span></Link></li>
                                <li onClick={() => { filterBtn('Massage') }} className={`btn ${addActive === 'Massage' ? 'active' : ''}`}><Link to="#"><span>Massage</span></Link></li>
                                <li onClick={() => { filterBtn('Highlights') }} className={`btn ${addActive === 'Highlights' ? 'active' : ''}`}><Link to="#"><span>Highlights</span></Link></li>
                            </ul>
                        </div>
                        <div className="clearfix">
                            <div className="masonry-box-container-2">
                                <LightGallery
                                    speed={500}
                                    plugins={[lgThumbnail, lgZoom]}
                                >
                                    {images.map((item, index) => (
                                        <Link className="figure" to={item.img} key={index}>
                                            <div className="dlab-box dlab-gallery-box" key={index}>
                                                <div className="dlab-media dlab-img-overlay1 dlab-img-effect">
                                                    <img src={item.img} alt="" />
                                                    <div className="overlay-bx">
                                                        <div className="overlay-icon image-over-icon">
                                                            <span className="mfp-link">
                                                                <i className="ti-fullscreen"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                    ))}
                                </LightGallery>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioGrid3