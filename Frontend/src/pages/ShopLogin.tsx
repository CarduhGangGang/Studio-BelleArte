import { useState } from "react"
import { IMAGE } from "../constent/theme"
import CommonBanner2 from "../element/CommonBanner2"
import { Link } from "react-router-dom"
import { ShopColumnDescription } from "./ShopColumn"
import '../App.css';

const ShopLogin = () => {
    const [hide, setHide] = useState(false)
    return (
        <>
            <div className="page-content bg-white">
                <CommonBanner2 title={'Login'} img={IMAGE.banner1} />
                <div className="section-full content-inner shop-account">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h3 className="font-weight-700 m-t0 m-b20">Already Registered?</h3>
                            </div>
                        </div>
                        <div className="row dzseth">
                            <div className="col-lg-6 col-md-12 col-sm-12 m-b30">
                                <div className="p-a30 border-1 seth" style={{ height: '426px ' }}>
                                    <div className="tab-content">
                                        <h4 className="font-weight-700">NEW CUSTOMER</h4>
                                        <p className="font-weight-600">By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</p>
                                        <Link className="site-button m-r5 button-lg radius-no" to="/shop-register">CREATE AN ACCOUNT</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 m-b30">
                                <div className="p-a30 border-1">
                                    <div className="tab-content nav">
                                        <form id="login" className="tab-pane active col-12 p-a0" style={{ display: `${hide === true ? 'none' : "block"}` }}>
                                            <h4 className="font-weight-700">LOGIN</h4>
                                            <p className="font-weight-600">If you have an account with us, please log in.</p>
                                            <div className="form-group">
                                                <label className="font-weight-700">E-MAIL *</label>
                                                <input name="dzName" className="form-control" placeholder="Your Email Id" type="email" />
                                            </div>
                                            <div className="form-group">
                                                <label className="font-weight-700">PASSWORD *</label>
                                                <input name="dzName" className="form-control " placeholder="Type Password" type="password" />
                                            </div>
                                            <div className="text-left">
                                                <button type="button" className="site-button m-r5 button-lg radius-no">login</button>
                                                <Link to={'#'} onClick={() => { setHide(true) }} className="m-l5"><i className="fa fa-unlock-alt"></i> Forgot Password</Link>
                                            </div>
                                        </form>
                                        <form id="forgot-password" className="tab-pane fade show  col-12 p-a0 " style={{ display: `${hide === true ? 'block' : "none"}` }}>
                                            <h4 className="font-weight-700">FORGET PASSWORD ?</h4>
                                            <p className="font-weight-600">We will send you an email to reset your password. </p>
                                            <div className="form-group">
                                                <label className="font-weight-700">E-MAIL *</label>
                                                <input name="dzName" className="form-control" placeholder="Your Email Id" type="email" />
                                            </div>
                                            <div className="text-left">
                                                <Link to={'#'} onClick={() => { setHide(false) }} className="site-button outline gray button-lg radius-no">Back</Link>
                                                <button type="button" className="site-button pull-right button-lg radius-no">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ShopColumnDescription />
            </div>
        </>
    )
}

export default ShopLogin