import "./App.css";
import Transactions from "./pages/Transactions";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Transactions />
    </div>
  );
}

export default App;