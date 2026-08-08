import logo from "../assets/logo.jpeg";

function Sidebar() {
  return (
    <div className="sidebar">
     <div className="sidebar-header">
        <img src={logo} alt="Logo" className="sidebar-logo" />
         <p className="circle-pay">CirclePay</p>
    </div>
    </div>
  )
}

export default Sidebar