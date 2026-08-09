import logo from "../assets/logo.jpeg";

function Sidebar({ onGoToAdd, onGoToTransactions }) {
  return (
    <div className="sidebar">

      <div className="sidebar-header">
        <img
          src={logo}
          alt="CirclePay Logo"
          className="sidebar-logo"
        />

        <span className="circle-pay">
          CirclePay
        </span>
      </div>


      <nav className="sidebar-nav">

        <button type="button" className="sidebar-item active" onClick={onGoToTransactions}>
          <span>Transactions</span>
        </button>

        <button type="button" className="sidebar-item active" onClick={onGoToAdd}>
          <span>Add Transaction</span>
        </button>

        <a href="/export" className="sidebar-item active">
          <span>Export to PDF</span>
        </a>

      </nav>

    </div>
  );
}

export default Sidebar;