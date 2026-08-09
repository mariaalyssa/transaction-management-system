import { useState } from "react";
import "./App.css";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Sidebar from "./components/Sidebar";

function App() {
  const [view, setView] = useState("transactions");

  return (
    <div className="app">
      <Sidebar
        onGoToAdd={() => setView("add")}
        onGoToTransactions={() => setView("transactions")}
      />
      {view === "transactions" ? (
        <Transactions />
      ) : (
        <AddTransaction onBack={() => setView("transactions")} />
      )}
    </div>
  );
}

export default App;