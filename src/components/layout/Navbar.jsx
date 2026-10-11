import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import userImage from '../../assets/images/user.jpg'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo" onClick={closeMenu}>
          Ecommerce
        </Link>

        <button
          className="menu-toggle"
          aria-label="Abrir menú"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={closeMenu}>
            Principal
          </NavLink>
          <NavLink to="/products" onClick={closeMenu}>
            Productos
          </NavLink>
          <NavLink to="/register" onClick={closeMenu}>
            Registro
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            Acerca de
          </NavLink>
          <NavLink to="/admin/products" onClick={closeMenu}>
            Admin Productos
          </NavLink>
          <NavLink to="/admin/users" onClick={closeMenu}>
            Admin Usuarios
          </NavLink>
        </div>

        <div className="user-area">
          <img src={userImage} alt="Usuario" className="avatar" />

          <button className="cart-btn">🛒</button>

          <Link to="/login" className="login-btn" onClick={closeMenu}>
            Login
          </Link>
        </div>
      </nav>
    </header>
  )
}
