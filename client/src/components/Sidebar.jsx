import logo from "../assets/logo.jpeg";


function Sidebar() {
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

        <a href="/transactions" className="sidebar-item active">
          <span>Transactions</span>
        </a>

        <a href="/add-transaction" className="sidebar-item">
          <span>Add Transaction</span>
        </a>

        <a href="/export" className="sidebar-item">
   
          <span>Export to PDF</span>
        </a>

      </nav>

    </div>
  );
}

export default Sidebar;