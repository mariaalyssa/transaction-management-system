import { useEffect, useState } from "react";
import "./App.css";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Sidebar from "./components/Sidebar";
import ResponsiveLayout from "./components/ResponsiveLayout";

function App() {
  const [view, setView] = useState("transactions");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); 
  const [isResponsiveLayout, setIsResponsiveLayout] = useState(
    window.innerWidth <= 1200
  );

  useEffect(() => {
    const onResize = () => {
      setIsResponsiveLayout(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const refreshTransactions = () => setRefreshTrigger((prev) => prev + 1);

  const content =
    view === "transactions" ? (
      <Transactions
        isCompactLayout={isResponsiveLayout}
        onOpenAddModal={openAddModal}
        refreshTrigger={refreshTrigger}
      />
    ) : (
      <AddTransaction
        isCompactLayout={isResponsiveLayout}
        onBack={() => setView("transactions")}
      />
    );

  if (isResponsiveLayout) {
    return (
      <div className="app app-responsive">
        <ResponsiveLayout
          currentView={view}
          onGoToAdd={() => {
            setView("transactions");
            openAddModal();
          }}
          onGoToTransactions={() => setView("transactions")}
          title={view === "transactions" ? "Transactions" : "Add Transaction"}
        >
          {content}
        </ResponsiveLayout>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar
        currentView={view}
        onGoToAdd={() => {
          setView("transactions");
          openAddModal();
        }}
        onGoToTransactions={() => setView("transactions")}
      />
      {content}
      {isAddModalOpen && (
        <div className="modal-backdrop" onClick={closeAddModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={closeAddModal}>
              ×
            </button>
            <AddTransaction
              isCompactLayout={isResponsiveLayout}
              onBack={closeAddModal}
              onSuccess={refreshTransactions}
              isModal
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;