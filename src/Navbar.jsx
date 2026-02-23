import './Navbar.css'

function Navbar() {
  return (
    <div className="nav-wrapper">
      <nav className="glass-nav">
        <div className="logo"><b>ExpenseX</b></div>
        <ul className="nav-links">
          <li>Dashboard</li>
          <li>Transactions</li>
          <li>Reports</li>
          <li>Profile</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;