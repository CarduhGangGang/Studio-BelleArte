const TopBar = () => {
  return (
    <div
      style={{
        backgroundColor: "#c6a661",
        color: "#fff",
        fontSize: "14px",
        padding: "6px 0",
      }}
    >
      <div className="container d-flex flex-wrap justify-content-center justify-content-md-start align-items-center gap-3">
        <div>
          <i className="fa fa-phone me-2" />
          +351 918 283 283
        </div>
        <div>
          <i className="fa fa-map-marker me-2" />
          Rua das Amoreiras, nº 145, 4° Esq., 1250-096 Lisboa, Portugal
        </div>
      </div>
    </div>
  );
};

export default TopBar;
