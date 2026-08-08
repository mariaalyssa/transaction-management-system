import "./App.css";
import Transactions from "./pages/Transactions";
import Sidebar from "./components/Sidebar";
import AddNewBtn from "./components/AddNewBtn";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Transactions />
    </div>
  );
}

export default App;