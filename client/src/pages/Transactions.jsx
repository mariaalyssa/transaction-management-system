const transactions = [
  { transactionDate: "2026-08-08", accountNumber: "1234-5678-9100", accountHolderName: "Belle Burry", amount: 500, status: "Settled" },
  { transactionDate: "2026-08-09", accountNumber: "0987-6544-3210", accountHolderName: "John Doe", amount: 500, status: "Pending" },
  { transactionDate: "2026-08-10", accountNumber: "4567-8907-4477", accountHolderName: "Juan Dela Cruz", amount: 500, status: "Failed" },
];

export default function Transactions() {
  return (
    <div className="main">
      <h1 className="transaction-header">Transactions</h1>
      
    </div>
  );
}

export { transactions };