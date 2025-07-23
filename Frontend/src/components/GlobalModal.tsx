// components/GlobalModal.tsx
const GlobalModal = ({ show, onClose, title, children }: any) => {
  if (!show) return null;

  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div
        className="modal-content bg-white p-4 rounded shadow"
        style={{ maxWidth: "1000px", width: "95%", maxHeight: "95vh", overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">{title}</h4>
          <button className="btn btn-sm btn-danger" onClick={onClose}>
            Fechar
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default GlobalModal;
