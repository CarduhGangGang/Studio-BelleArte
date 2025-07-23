import { useEffect, useState } from "react";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "15px", // mais para baixo (antes estava 30px)
            right: "12px",  // mais à direita (antes estava 30px)
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 1000,
          }}
          aria-label="Voltar ao topo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="black"
            viewBox="0 0 24 24"
          >
            <path d="M12 4l-6 6h4v6h4v-6h4z" />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollTopButton;
