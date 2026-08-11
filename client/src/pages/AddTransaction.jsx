import AddTransactionForm from "../components/AddTransactionForm";

function AddTransaction({ onBack, onSuccess, isCompactLayout = false, isModal = false }) {
  const content = (
    <>
      {!isCompactLayout && !isModal && (
        <div className="transaction-header">
          <h1>Add Transaction</h1>
        </div>
      )}
      <AddTransactionForm
        onBack={onBack}
        onSuccess={onSuccess}
        isCompactLayout={isCompactLayout}
      />
    </>
  );

  if (isModal) {
    return <div className="modal-form-shell">{content}</div>;
  }

  return <div className={`main ${isCompactLayout ? "compact-main" : ""}`}>{content}</div>;
}

export default AddTransaction;
