import { useState } from "react";
import SuccessModal from "./SuccessModal";
import ErrorMessage from "./ErrorMessage";

function getTodayIso() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isValidAccountNumber(value){
  return  /^\d{4}-\d{4}-\d{4}$/.test(value);
}

function normalizeDateInput(input) {
  if (!input) return "";
  const value = String(input).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  const mdy = value.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
  if (mdy) {
    const [, m, d, y] = mdy;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, "0");
    const d = String(parsed.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  return "";
}

function formatAccountNumber(value) {
  const digits = String(value).replace(/\D/g, "").slice(0, 12);
  return digits.replace(/(.{4})/g, "$1-").replace(/-$/, "");
}

function AddTransactionForm({ onBack }) {
  const [transactionDate, setTransactionDate] = useState(getTodayIso());
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorType, setErrorType] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!accountNumber || !accountHolder || amount === "") {
    setError(
      "Please fill required fields: account number, holder, and amount."
    );
    return;
  }

  
  if (!isValidAccountNumber(accountNumber)) {
    setErrorType("accountNumber");
    setShowErrorMessage(true);
    return;
  }

  
  if (!/^[a-zA-Z\s]+$/.test(accountHolder)) {
    setErrorType("accountHolderName");
    setShowErrorMessage(true);
    return;
  }

  const payload = {
    transactionDate: normalizeDateInput(transactionDate) || undefined,
    accountNumber: formatAccountNumber(accountNumber),
    accountHolder,
    amount: Number(amount),
    status,
  };

  setLoading(true);

  try {
    const res = await fetch("http://localhost:8080/add-new-transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status === 201) {
      setShowSuccess(true);
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body?.error || `Server returned ${res.status}`);
    }
  } catch (err) {
    setError("Network error. Is the server running?");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="add-transaction-container">
      <form onSubmit={handleSubmit}>
        <div className="transaction-form-grid">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="text"
              name="date"
              placeholder="yyyy-mm-dd"
              value={transactionDate}
              onChange={(e) => setTransactionDate(normalizeDateInput(e.target.value))}
              autoComplete="on"
            />
          </div>

          <div className="form-group">
            <label htmlFor="accountHolder">Account Holder</label>
            <input
              id="accountHolder"
              type="text"
              name="accountHolder"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              id="accountNumber"
              type="text"
              name="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(formatAccountNumber(e.target.value))}
              onBlur={() => setShowErrorMessage(!isValidAccountNumber(accountNumber))}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Settled">Settled</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onBack} disabled={loading}>
            Cancel
          </button>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

     <SuccessModal
      showModal={showSuccess}
      onOk={() => {
        setShowSuccess(false);
        onBack();
      }}
    />
    <ErrorMessage
      showModal={showErrorMessage}
      errorType={errorType}
      onOk={() => setShowErrorMessage(false)}
    />
    </div>
  );
}

export default AddTransactionForm;