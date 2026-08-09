function SuccessModal({ showModal, onOk }) {
  if (!showModal) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "24px 28px",
          borderRadius: "10px",
          minWidth: "280px",
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: "8px" }}>Success!</h3>
        <p style={{ marginBottom: "16px" }}>Transaction successfully added.</p>
        <button
          onClick={onOk}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#1976d2",
            color: "white",
            cursor: "pointer",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;