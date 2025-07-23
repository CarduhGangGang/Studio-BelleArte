import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"

const OurClient = () => {
    return (
        <>
            <div className="col-lg-5 m-b30 align-self-center">
                <div className="dis-tbl-cell  m-b30">
                    <h2 className="m-t0 m-b10">Why Our Clients Choose Us </h2>
                    <h6 className="fw7 m-b15">We are the leading beauty salon in LA providing high-quality hairdressing, makeup, and skin care services to everyone.</h6>
                    <ul className="list-angle-right">
                        <li>fully focused on accessibility</li>
                        <li>Based on modern design concept</li>
                        <li>impressive and attractive design with graceful features</li>
                        <li>More creative with smoothness and flexibility </li>
                        <li>Unlimited power and customization possibilities</li>
                    </ul>
                    <Link to="/about-us" className="site-button m-r15">About US <i className="ti-arrow-right m-l10"></i></Link>
                    <Link to="/about-us" className="site-button-secondry ">Read More <i className="ti-arrow-right m-l10"></i></Link>
                </div>
            </div>
            <div className="col-lg-6 offset-lg-1">
                <div className="img-collage">
                    <div className="coll-1"><img src={IMAGE.collegePic1} alt="" /></div>
                    <div className="coll-2"><img src={IMAGE.collegePic2} alt="" /></div>
                    <div className="coll-3"><img src={IMAGE.collegePic3} alt="" /></div>
                    <div className="coll-4"><img src={IMAGE.collegePic4} alt="" /></div>
                </div>
            </div>
        </>
    )
}

export default OurClient