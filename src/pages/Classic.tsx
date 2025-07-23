import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"
import CommonBanner2 from "../element/CommonBanner2"
import '../App.css';

const imageBlog = [
    { img: IMAGE.blogPic1 },
    { img: IMAGE.blogPic2 },
    { img: IMAGE.blogPic3 },
    { img: IMAGE.blogPic4 },
    { img: IMAGE.blogPic2 },
    { img: IMAGE.blogPic1 },
]
const Classic = () => {
    return (
        <>
            <div className="page-content bg-white">
                <CommonBanner2 title={'Blog Classic'} img={IMAGE.banner1} />
                <div className="content-area">
                    <div className="container max-w900">
                        {imageBlog.map((item, index) => (
                            <div className="blog-post blog-lg blog-style-1" key={index}>
                                <div className="dlab-post-media dlab-img-effect zoom-slow radius-sm">
                                    <Link to="/blog-details">
                                        <img src={item.img} alt="" />
                                    </Link>
                                </div>
                                <div className="dlab-info">
                                    <div className="dlab-post-meta">
                                        <ul className="d-flex align-items-center">
                                            <li className="post-date">September 18, 2017</li>
                                            <li className="post-author">By <Link to="/blog-details">demongo</Link> </li>
                                            <li className="post-comment"><Link to="/blog-details">5k</Link> </li>
                                        </ul>
                                    </div>
                                    <div className="dlab-post-title ">
                                        <h4 className="post-title font-24">
                                            <Link to="/blog-details">Spring is in the Air and and So Our These Amazing Spa Offers</Link></h4>
                                    </div>
                                    <div className="dlab-post-text">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                            text ever since the 1500s, when an unknown printer took Link galley of type and scrambled it to make Link type specimen book.</p>
                                    </div>
                                    <div className="dlab-post-readmore blog-share">
                                        <Link to="/blog-details" title="READ MORE" rel="bookmark" className="site-button-link border-link black">READ MORE</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Pagination />
                    </div>
                </div>
            </div>
        </>
    )
}

export const Pagination = () => {
    return (
        <>
            <div className="pagination-bx clearfix text-center">
                <ul className="pagination">
                    <li className="previous"><Link to="#"><i className="ti-arrow-left"></i> Prev</Link></li>
                    <li className="active"><Link to="#">1</Link></li>
                    <li><Link to="#">2</Link></li>
                    <li><Link to="#">3</Link></li>
                    <li className="next"><Link to="#">Next <i className="ti-arrow-right"></i></Link></li>
                </ul>
            </div>
        </>
    )
}

export default Classic