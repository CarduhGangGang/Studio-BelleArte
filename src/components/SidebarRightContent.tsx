import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"

import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const imageBlog = [
    { img: IMAGE.recent_blogPic1, title: 'The Correct Order to Apply Your Skincare Products' },
    { img: IMAGE.recent_blogPic2, title: 'Introducing Clare’s Newest Spa Hotel: The Killaloe...' },
    { img: IMAGE.recent_blogPic3, title: 'The Well Spa in Waterford Debuts Outdoor Summer Spa' },
]
const sidebarBlog = [
    { img: IMAGE.gallery_smallPic1 },
    { img: IMAGE.gallery_smallPic2 },
    { img: IMAGE.gallery_smallPic3 },
    { img: IMAGE.gallery_smallPic4 },
    { img: IMAGE.gallery_smallPic5 },
    { img: IMAGE.gallery_smallPic6 },
]
const SidebarRightContent = () => {
    return (
        <>
            <div className="col-lg-4 col-md-5 col-sm-12 sticky-top">
                <BlogRightContent />
            </div>
        </>
    )
}

export const BlogRightContent = () => {
    return (
        <>
            <aside className="side-bar">
                <div className="widget">
                    <h6 className="widget-title style-1">Search</h6>
                    <div className="search-bx style-1">
                        <form role="search" method="post">
                            <div className="input-group">
                                <input name="text" className="form-control" placeholder="Enter your keywords..." type="text" />
                                <span className="input-group-btn">
                                    <button type="button" className="fa fa-search text-primary"></button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="widget recent-posts-entry">
                    <h6 className="widget-title style-1">Recent Posts</h6>
                    <div className="widget-post-bx">
                        {imageBlog.map((item, index) => (

                            <div className="widget-post clearfix" key={index}>
                                <div className="dlab-post-media">
                                    <img src={item.img} width="200" height="143" alt="" />
                                </div>
                                <div className="dlab-post-info">
                                    <div className="dlab-post-header">
                                        <h6 className="post-title"><Link to="/blog-details">{item.title}</Link></h6>
                                    </div>
                                    <div className="dlab-post-meta">
                                        <ul className="d-flex align-items-center">
                                            <li className="post-date">Sep 18, 2017</li>
                                            <li className="post-comment"><Link to="/blog-details">5k</Link> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="widget widget_gallery gallery-grid-3">
                    <h6 className="widget-title style-1">Our Gallery</h6>
                    <ul>
                        <LightGallery
                            speed={500}
                            plugins={[lgThumbnail, lgZoom]}
                        >
                            {sidebarBlog.map((item, index) => (
                                <Link to={item.img} key={index} style={{ display: 'unset' }}>
                                    <li>
                                        <div className="dlab-post-thum">
                                            <samp className="dlab-img-overlay1 dlab-img-effect zoom-slow">
                                                <img src={item.img} alt="" />
                                            </samp>
                                        </div>
                                    </li>
                                </Link>

                            ))}
                        </LightGallery>
                    </ul>
                </div>
                <div className="widget widget_archive">
                    <h6 className="widget-title style-1">Categories List</h6>
                    <ul>
                        <li><Link to="#">aciform</Link></li>
                        <li><Link to="#">championship</Link></li>
                        <li><Link to="#">chastening</Link></li>
                        <li><Link to="#">clerkship</Link></li>
                        <li><Link to="#">disinclination</Link></li>
                    </ul>
                </div>
                <div className="widget widget-newslatter">
                    <h6 className="widget-title style-1">Newsletter</h6>
                    <div className="news-box">
                        <p>Enter your e-mail and subscribe to our newsletter.</p>
                        <form className="dzSubscribe" action="script/mailchamp.php" method="post">
                            <div className="dzSubscribeMsg"></div>
                            <div className="input-group">
                                <input name="dzEmail" type="email" className="form-control" placeholder="Your Email" />
                                <button type="button" className="site-button btn-block radius-no">Subscribe Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SidebarRightContent