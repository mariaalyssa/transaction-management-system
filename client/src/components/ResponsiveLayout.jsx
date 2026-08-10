import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

function ResponsiveLayout({
  currentView,
  onGoToAdd,
  onGoToTransactions,
  title,
  children,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [currentView]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isSidebarOpen]);

  return (
    <div className="responsive-layout">
      <header className="responsive-topbar">
        <button
          type="button"
          className="burger-button"
          aria-label="Open navigation"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>

        <h1 className="responsive-page-title">{title}</h1>
      </header>

      <button
        type="button"
        className={`sidebar-overlay ${isSidebarOpen ? "show" : ""}`}
        aria-label="Close navigation"
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={`responsive-sidebar-drawer ${isSidebarOpen ? "open" : ""}`}
        aria-hidden={!isSidebarOpen}
      >
        <Sidebar
          currentView={currentView}
          onGoToAdd={onGoToAdd}
          onGoToTransactions={onGoToTransactions}
        />
      </aside>

      <div className="responsive-content">{children}</div>
    </div>
  );
}

export default ResponsiveLayout;
