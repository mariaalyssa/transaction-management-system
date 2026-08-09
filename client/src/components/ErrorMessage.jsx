function ErrorMessage({ showModal, errorType, onOk }) {
  if (!showModal) return null;

  let title;
  let message;

  if (errorType === "accountNumber") {
    title = "Invalid account number";
    message = "Account number must be XXXX-XXXX-XXXX.";
  } 
  
  else if (errorType === "accountHolderName") {
    title = "Invalid account holder name";
    message = "Account holder name must contain letters only.";
  }

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
        <h3 style={{ marginTop: 0, marginBottom: "8px" }}>
          {title}
        </h3>

        <p style={{ marginBottom: "16px" }}>
          {message}
        </p>

        <button
          onClick={onOk}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#e58e8e",
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

export default ErrorMessage;