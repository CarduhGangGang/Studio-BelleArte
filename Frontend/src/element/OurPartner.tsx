import { SVGICON } from "../constent/SvgIcon"

const ourPartnerSvg = [
    { svg: SVGICON.OurPartnerSVG1 },
    { svg: SVGICON.OurPartnerSVG2 },
    { svg: SVGICON.OurPartnerSVG3 },
    { svg: SVGICON.OurPartnerSVG4 },
    { svg: SVGICON.OurPartnerSVG5 },
    { svg: SVGICON.OurPartnerSVG6 },
]

const OurPartner = () => {
    return (
        <>
            <div className="section-full partner-wrapper style-1">
                <div className="container">
                    <div className="section-head text-center style-1">
                        <h2>Our Partners</h2>
                    </div>
                    <div className="row">
                        {ourPartnerSvg.map((item, ind) => (
                            <div className="col-lg-2 col-sm-4 col-6" key={ind}>
                                <div className="dz-logo-box style-1 m-b30">
                                    {item.svg}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurPartner