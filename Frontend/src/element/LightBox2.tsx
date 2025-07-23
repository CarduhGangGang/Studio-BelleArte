import { useState } from "react";
import { Link } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';




const gallery = [
    { img: IMAGE.gallery_massonaryImg1, categery: 'Haircuts' },
    { img: IMAGE.gallery_massonaryImg4, categery: 'Highlights' },
    { img: IMAGE.gallery_massonaryImg5, categery: 'Haircuts' },
    { img: IMAGE.gallery_massonaryImg2, categery: 'Coloring' },
    { img: IMAGE.gallery_massonaryImg3, categery: 'Highlights' },
    { img: IMAGE.gallery_massonaryImg6, categery: 'Coloring' },
]
const LightBox2 = () => {

    const [addActive, setActive] = useState('All');
    const [imageItem, setItem] = useState(gallery)

    const LightBoxBtn = (items: string) => {
        const updateItem = gallery.filter((ele) => {
            return ele.categery === items
        })
        setItem(updateItem)
        setActive(items)
    }
    return (
        <>
            <div className="section-full content-inner">
                <div className="container">
                    <div className="section-head text-black text-center m-b20">
                        <h2 className="text-primary m-b10">Light Box Masonry</h2>
                        <div className="dlab-separator-outer m-b0">
                            <div className="dlab-separator text-primary style-icon">
                                <i className="flaticon-spa text-primary"></i></div>
                        </div>
                        <p className="m-b0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.</p>
                    </div>
                    <div className="section-content">
                        <div className="site-filters style1 clearfix center">
                            <ul className="filters2" data-toggle="buttons">
                                <li className={`btn ${addActive === 'All' ? 'active' : ''}`} onClick={() => { LightBoxBtn('All'); setItem(gallery) }}>
                                    <Link to="#"><span>All</span></Link>
                                </li>
                                <li className={`btn ${addActive === 'Haircuts' ? 'active' : ''}`} onClick={() => { LightBoxBtn('Haircuts') }}>
                                    <Link to="#"><span>Haircuts</span></Link>
                                </li>
                                <li className={`btn ${addActive === 'Coloring' ? 'active' : ''}`} onClick={() => { LightBoxBtn('Coloring') }}>
                                    <Link to="#"><span>Coloring</span></Link>
                                </li>
                                <li className={`btn ${addActive === 'Highlights' ? 'active' : ''}`} onClick={() => { LightBoxBtn('Highlights') }}>
                                    <Link to="#"><span>Highlights</span></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="masonry-box-container">
                            <LightGallery
                                speed={500}
                                plugins={[lgThumbnail, lgZoom]}
                            >
                                {imageItem.map((item, index) => (

                                    <Link className="figure" to={item.img} key={index}>
                                        <div className="dlab-box dlab-gallery-box">
                                            <div className="dlab-thum dlab-img-overlay1 dlab-img-effect zoom-slow">
                                                <img src={item.img} />
                                                <div className="overlay-bx">
                                                    <div className="overlay-icon">
                                                        <span className="icon-bx-xs check-km">
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
            </div >
        </>
    )
}

export default LightBox2