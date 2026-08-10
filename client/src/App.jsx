import { useEffect, useState } from "react";
import "./App.css";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Sidebar from "./components/Sidebar";
import ResponsiveLayout from "./components/ResponsiveLayout";

function App() {
  const [view, setView] = useState("transactions");
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

  const content =
    view === "transactions" ? (
      <Transactions isCompactLayout={isResponsiveLayout} />
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
          onGoToAdd={() => setView("add")}
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
        onGoToAdd={() => setView("add")}
        onGoToTransactions={() => setView("transactions")}
      />
      {content}
    </div>
  );
}

export default App;