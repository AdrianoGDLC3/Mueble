import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'
import AdminProducts from './pages/AdminProducts'
import AdminUsers from './pages/AdminUsers'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:id"
            element={<ProductDetail />}/>
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/products"
            element={<AdminProducts />}
          />
          <Route
            path="/admin/users"
            element={<AdminUsers />}
          />
          <Route
            path="*"
            element={<h2>Página no encontrada (404)</h2>}
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
