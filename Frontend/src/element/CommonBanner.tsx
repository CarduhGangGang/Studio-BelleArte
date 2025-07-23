import { Link } from "react-router-dom";

interface CommonBannerProps {
  image: string;
  title: string;
}

const CommonBanner = ({ image, title }: CommonBannerProps) => {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const hasImage = image && image.trim() !== "";
  const imageUrl = hasImage
    ? image.startsWith("http")
      ? image
      : `${API_BASE.replace(/\/$/, "")}/${image.replace(/^\/+/, "")}`
    : null;

  return (
    <div className="dlab-bnr-inr position-relative" style={{ minHeight: "300px" }}>
      {hasImage && (
        <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.6)",
            zIndex: 0,
          }}
        />
      )}

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="dlab-bnr-inr-entry text-center py-5">
          <h1 className="fw-bold text-white">{title}</h1>
          <div className="breadcrumb-row">
            <ul className="list-inline text-white">
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
