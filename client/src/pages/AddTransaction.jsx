import AddTransactionForm from "../components/AddTransactionForm";

function AddTransaction({ onBack }) {
  return (
    <div className="main">
      <div className="transaction-header">
        <h1>Add Transaction</h1>
      </div>
      <AddTransactionForm onBack={onBack} />
    </div>
  );
}

export default AddTransaction;
