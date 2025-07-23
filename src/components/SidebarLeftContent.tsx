import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"
import { Pagination } from "../pages/Classic"



const imageBlog = [
    { img: IMAGE.blogPic1 },
    { img: IMAGE.blogPic2 },
    { img: IMAGE.blogPic3 },
    { img: IMAGE.blogPic4 },
    { img: IMAGE.blogPic2 },
    { img: IMAGE.blogPic1 },
]

const SidebarLeftContent = () => {
    return (
        <>

            <div className="col-lg-8 col-md-7 col-sm-12">
                {imageBlog.map((item, index) => (
                    <div className="blog-post blog-lg blog-style-1" key={index}>
                        <div className="dlab-post-media dlab-img-effect zoom-slow radius-sm">
                            <Link to="/blog-details"><img src={item.img} alt="" /></Link>
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
                                <h4 className="post-title font-24"><Link to="/blog-details">Spring is in the Air and and So Our These Amazing Spa Offers</Link></h4>
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
        </>
    )
}

export default SidebarLeftContent