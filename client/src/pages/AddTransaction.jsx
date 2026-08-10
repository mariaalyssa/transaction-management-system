import AddTransactionForm from "../components/AddTransactionForm";

function AddTransaction({ onBack, isCompactLayout = false }) {
  return (
    <div className={`main ${isCompactLayout ? "compact-main" : ""}`}>
      {!isCompactLayout && (
        <div className="transaction-header">
          <h1>Add Transaction</h1>
        </div>
      )}
      <AddTransactionForm onBack={onBack} isCompactLayout={isCompactLayout} />
    </div>
  );
}

export default AddTransaction;
