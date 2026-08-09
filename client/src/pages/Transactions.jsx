import { useEffect, useState } from "react";
import TransactionsTable from "../components/TransactionsTable";
import AddNewBtn from "../components/AddNewBtn";

export default function Transactions({onGoToAdd}) {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const pageSize = 10;
 

  useEffect(() => {
    async function loadTransactions() {
      try {
        const res = await fetch("http://localhost:8080/get-transactions");
        if (!res.ok) {
          throw new Error(`Fetch failed: ${res.status}`);
        }
        const data = await res.json();

     
        const normalized = data.map((transaction) => ({
          ...transaction,
          accountHolderName: transaction.accountHolder,
        }));

        setTransactions(normalized);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    }

    loadTransactions();
  }, []);

  const totalPages = Math.ceil(transactions.length/pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleTransactions = transactions.slice(startIndex, startIndex + pageSize);

  return (
    <div className="main">
     <div className="transaction-header">
        <h1>Transactions</h1>
        /*<AddNewBtn onClick={onGoToAdd}/>
        </div>
      <TransactionsTable transactions={visibleTransactions} />

      <div className="pagination">
        <button
          className="prev"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="next"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}