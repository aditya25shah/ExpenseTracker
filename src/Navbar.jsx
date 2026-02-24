import './Navbar.css'
import { useNavigate, useLocation } from 'react-router-dom'

function Navbar() {

  const navigate = useNavigate()
  const location = useLocation()

  const currentPath = location.pathname

  return (
    <div className="nav-wrapper">
      <nav className="glass-nav">
        <div 
          className="logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <b>ExpenseX</b>
        </div>

        <ul className="nav-links">

          {currentPath !== "/dashboard" && (
            <li onClick={() => navigate('/dashboard')}>
              Dashboard
            </li>
          )}

          {currentPath !== "/transactions" && (
            <li onClick={() => navigate('/transactions')}>
              Transactions
            </li>
          )}

          {currentPath !== "/reports" && (
            <li onClick={() => navigate('/reports')}>
              Reports
            </li>
          )}

          {currentPath !== "/profile" && (
            <li onClick={() => navigate('/profile')}>
              Profile
            </li>
          )}

          {currentPath !== "/" && (
            <li onClick={() => navigate('/')}>
              Home
            </li>
          )}

        </ul>
      </nav>
    </div>
  );
}

export default Navbar;