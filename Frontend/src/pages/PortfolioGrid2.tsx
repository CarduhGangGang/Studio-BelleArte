import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IMAGE } from "../constent/theme";
import CommonBanner from "../element/CommonBanner";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import '../App.css';

// Galeria com imagens do theme
const galleryItems = [
  { img: IMAGE.galleryImg1, category: "Haircuts", title: "Corte Fade" },
  { img: IMAGE.galleryImg2, category: "Haircuts", title: "Undercut Moderno" },
  { img: IMAGE.galleryImg3, category: "Beard", title: "Barba Modelada" },
  { img: IMAGE.galleryImg4, category: "Coloring", title: "Reflexos Loiraços" },
  { img: IMAGE.galleryImg5, category: "Haircuts", title: "Clássico Italiano" },
  { img: IMAGE.galleryImg6, category: "Beard", title: "Full Beard Trim" },
];

const categories = ["All", "Haircuts", "Beard", "Coloring"];

const PortfolioGrid2 = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState(galleryItems);

  useEffect(() => {
    document.body.setAttribute("data-theme-color", "color_1");
  }, []);

  const filterGallery = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setImages(galleryItems);
    } else {
      setImages(galleryItems.filter((item) => item.category === category));
    }
  };

  return (
    <div className="page-content bg-white">
      {/* Banner superior */}
      <CommonBanner
        title="Portfólio Masculino"
        image="https://images.pexels.com/photos/5322206/pexels-photo-5322206.jpeg"
      />

      {/* Introdução da Galeria */}
      <div className="section-full content-inner bg-light">
        <div className="container text-center">
          <p className="lead text-muted max-w-2xl mx-auto">
            A nossa galeria é o reflexo daquilo que fazemos com paixão: transformar cada corte numa expressão única de estilo e identidade.
            Explora os visuais que marcaram os nossos clientes — cortes icónicos, barbas de impacto e colorações que definem atitude.
            Descobre a arte da transformação masculina.
          </p>
        </div>
      </div>

      {/* Filtros Bootstrap */}
      <div className="container text-center mb-4">
        <ul className="nav justify-content-center flex-wrap gap-2">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`btn btn-outline-dark rounded-pill px-3 ${activeCategory === cat ? "active" : ""}`}
              onClick={() => filterGallery(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Grid da galeria com LightGallery */}
      <div className="container">
        <LightGallery plugins={[lgThumbnail, lgZoom]} speed={500}>
          <div className="row g-4">
            {images.map((item, index) => (
              <div className="col-sm-6 col-md-4" key={index}>
                <a href={item.img}>
                  <div className="card border-0 shadow-sm h-100">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="card-img-top"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center">
                      <h6 className="mb-0">{item.title}</h6>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </LightGallery>
      </div>
    </div>
  );
};

export default PortfolioGrid2;
