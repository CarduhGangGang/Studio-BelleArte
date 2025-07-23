import { useState } from "react"
import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme";
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';



const lightGallery1 = [
    { img: IMAGE.lightGalleryPic1, categery: 'Haircuts' },
    { img: IMAGE.lightGalleryPic2, categery: 'Coloring' },
    { img: IMAGE.lightGalleryPic3, categery: 'Highlights' },
    { img: IMAGE.lightGalleryPic4, categery: 'Highlights' },
    { img: IMAGE.lightGalleryPic5, categery: 'Haircuts' },
    { img: IMAGE.lightGalleryPic6, categery: 'Coloring' },
]
const LightBox1 = () => {
    const [addActive, setActive] = useState('All');
    const [item, setItem] = useState(lightGallery1);
    const LightBoxBtn = (action: string) => {
        let updeteItem = lightGallery1.filter((ele) => {
            return ele.categery === action
        })
        setItem(updeteItem)
        setActive(action);
    }
    return (
        <>
            <div className="section-full content-inner">
                <div className="container">
                    <div className="section-head text-black text-center m-b20">
                        <h2 className="text-primary m-b10">Light Box Grid</h2>
                        <div className="dlab-separator-outer m-b0">
                            <div className="dlab-separator text-primary style-icon"><i className="flaticon-spa text-primary"></i></div>
                        </div>
                        <p className="m-b0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.</p>
                    </div>
                    <div className="section-content">
                        <div className="site-filters style1 clearfix center">
                            <ul className="filters1" data-toggle="buttons">
                                <li className={`btn ${addActive === 'All' ? 'active' : ''}`} onClick={() => { LightBoxBtn('All'); setItem(lightGallery1) }}>
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
                        <LightGallery
                            speed={500}
                            plugins={[lgThumbnail, lgZoom]}
                            elementClassNames="row dlab-gallery-listing gallery-grid-4 m-lr0 lightgallery"
                        >
                            {item.map((item, index) => (
                                <Link to={item.img} className="image-1 card-container col-lg-4 col-md-4 col-sm-6" key={index}>
                                    <div className="dlab-box dlab-gallery-box">
                                        <div className="dlab-thum dlab-img-overlay1 dlab-img-effect zoom-slow">
                                            <img src={item.img} alt="" />
                                            <div className="overlay-bx">
                                                <div className="overlay-icon">
                                                    <span data-exthumbimage="images/gallery/thumb/lightgallery/pic1.jpg" className="icon-bx-xs check-km">
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
        </>
    )
}

export default LightBox1