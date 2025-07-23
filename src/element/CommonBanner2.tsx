import { Link } from "react-router-dom";

interface CommonBannerProps {
  image: string;
  title: string;
}

const CommonBanner = ({ image, title }: CommonBannerProps) => {
  return (
    <div className="dlab-bnr-inr position-relative" style={{ minHeight: "300px" }}>
      {/* Overlay escura sobre a imagem */}
      <div
        className="position-absolute w-100 h-100"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)",
          zIndex: 0,
        }}
      />

      {/* Conteúdo acima da imagem */}
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="dlab-bnr-inr-entry text-center text-white py-5">
          <h1 className="text-white">{title}</h1>
          <div className="breadcrumb-row">
            <ul className="list-inline">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li className="text-white">{title}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
