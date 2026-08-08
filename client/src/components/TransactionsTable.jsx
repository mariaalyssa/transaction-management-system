import StatusBadge from "./StatusBadge";

function TransactionTable({ transactions }) {
  return (
    <div className="transaction-table-wrapper">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Account Number</th>
            <th>Account Holder</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.transactionDate}</td>
              <td>{transaction.accountNumber}</td>
              <td>{transaction.accountHolderName}</td>
              <td>{Number(transaction.amount).toFixed(2)}</td>
              <td>
                <StatusBadge status={transaction.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;