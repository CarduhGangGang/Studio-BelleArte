import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"

const HomeBanner = () => {
    return (
        <>
            <div className="section-full banner-wrapper1">
                <div className="banner-inner style-1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-4 col-sm-3 dz-media">
                                <div className="dz-banner-media">
                                    <img src={IMAGE.bnr4} className="main-img" alt="" />
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-8 col-sm-9 dz-content">
                                <div className="banner-content" data-name="nails">
                                    <div className="top-content">
                                        <h1>Be Different with Our <span>Nail Art</span></h1>
                                    </div>
                                    <div className="content-center">
                                        <h5>Creating Unique Style and good mood</h5>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                                    </div>
                                    <div className="banner-button">
                                        <Link to="/about-us" className="site-button button-lg style-1">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeBanner