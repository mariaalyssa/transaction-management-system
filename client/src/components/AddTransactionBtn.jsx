function AddTransactionBtn({ onClick = () => {} }) {
  return (
    <button type="button" className="add-transaction-btn" onClick={onClick}>
      Add Transaction
    </button>
  );
}

export default AddTransactionBtn;
