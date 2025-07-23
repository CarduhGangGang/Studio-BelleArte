import { Link } from "react-router-dom"
import { IMAGE } from "../constent/theme"
import CommonBanner2 from "../element/CommonBanner2"
import '../App.css';


const product = [
    { img: IMAGE.produc_item1 },
    { img: IMAGE.produc_item2 },
    { img: IMAGE.produc_item3 },
    { img: IMAGE.produc_item4 },
    { img: IMAGE.produc_item5 },
    { img: IMAGE.produc_item6 },
    { img: IMAGE.produc_item7 },
    { img: IMAGE.produc_item8 },
    { img: IMAGE.produc_item1 },
    { img: IMAGE.produc_item2 },
    { img: IMAGE.produc_item3 },
    { img: IMAGE.produc_item4 },
]


const details = [
    { icon: 'fa text-black fa-gift', title: 'Free shipping on orders $60+', paregraph: 'Order more than 60$ and you will get free shippining Worldwide. More info.' },
    { icon: 'fa text-black fa-plane', title: 'Worldwide delivery', paregraph: 'We deliver to the following countries: USA, Canada, Europe, Australia' },
    { icon: 'fa text-black fa-history', title: '60 days money back guranty!', paregraph: 'Not happy with our product, feel free to return it, we will refund 100% your money!' },
]

const ShopColumn = () => {
    return (
        <>
            <div className="page-content bg-white">
                <CommonBanner2 title={'Shop Columns'} img={IMAGE.banner2} />
                <div className="section-full content-inner">
                    <div className="container">
                        <div className="row">
                            {product.map((item, index) => (
                                <div className="col-lg-3 col-md-6 col-sm-6 wow fadeInUp" key={index}>
                                    <div className="item-box m-b10">
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
                                            <h6 className="item-title font-weight-500"><Link to="/shop-product-details">Checked Short Dress</Link></h6>
                                            <ul className="item-review">
                                                <li><i className="fa fa-star"></i></li>
                                                <li><i className="fa fa-star m-l5"></i></li>
                                                <li><i className="fa fa-star m-l5"></i></li>
                                                <li><i className="fa fa-star-half-o m-l5"></i></li>
                                                <li><i className="fa fa-star-o m-l5"></i></li>
                                            </ul>
                                            <h4 className="item-price"><del>$232</del> <span className="text-primary">$192</span></h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <ShopColumnDescription />

            </div>
        </>
    )
}

export const ShopColumnDescription = () => {
    return (
        <>
            <div className="section-full p-t50 p-b20 bg-gray text-black shop-action">
                <div className="container">
                    <div className="row">
                        {details.map((i, ind) => (
                            <div className="col-lg-4 col-md-4 col-sm-12" key={ind}>
                                <div className="icon-bx-wraper left m-b30">
                                    <div className="icon-md text-black radius">
                                        <i className={i.icon}></i>
                                    </div>
                                    <div className="icon-content">
                                        <h5 className="dlab-tilte font-20">{i.title}</h5>
                                        <p className="font-14">{i.paregraph}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}


export default ShopColumn