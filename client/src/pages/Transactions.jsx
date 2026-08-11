import { useEffect, useState } from "react";
import TransactionsTable from "../components/TransactionsTable";
import Filter from "../components/Filter";
import Search from "../components/Search";
import AddTransactionBtn from "../components/AddTransactionBtn";

export default function Transactions({ isCompactLayout = false }) {
  const [transactions, setTransactions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;

  const baseUrl = "http://localhost:8080"

  useEffect(() => {
    async function loadTransactions() {
      try {
        const trimmedQuery = searchQuery.trim();
        let endpoint = `${baseUrl}/transactions`;

        if (trimmedQuery) {``
          endpoint = `${baseUrl}/get-transactions/search?accountHolder=${encodeURIComponent(trimmedQuery)}`;
        } else if (selectedStatus !== "All") {
          endpoint = `${baseUrl}/get-transactions/${selectedStatus.toLowerCase()}`;
        }

        const res = await fetch(endpoint);
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
  }, [baseUrl, searchQuery, selectedStatus]);

  const totalPages = Math.ceil(transactions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleTransactions = transactions.slice(startIndex, startIndex + pageSize);

  return (
    <div className={`main ${isCompactLayout ? "compact-main" : ""}`}>
      <div className={`transaction-header ${isCompactLayout ? "compact" : ""}`}>
        {!isCompactLayout && <h1>Transactions</h1>}
      <div className="transaction-controls">
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AddTransactionBtn onClick={() => {}} />
        <Filter
          selectedFilter={selectedStatus}
          onFilterChange={setSelectedStatus}
        />
      </div>
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