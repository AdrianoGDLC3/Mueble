import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import Loader from '../components/ui/Loader'
import { getProducts } from '../services/products.service'
import bannerImage from '../assets/images/banner.jpg'
import heroImage from '../assets/images/producto1.jpg'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch {
        setError('No se pudieron cargar los productos.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <>
      <section className="banner">
        <img
          src={bannerImage}
          alt="Banner principal"
          className="banner-image"
        />

        <div className="banner-content">
          <h1>Muebles modernos para cada espacio de tu hogar</h1>

          <p>
            Diseños elegantes, materiales de calidad y confort para toda
            la familia.
          </p>

          <Link to="/products" className="btn-primary">
            Ver Catálogo
          </Link>
        </div>
      </section>

      <section className="hero">
        <div className="hero-text">
          <h2>Creamos espacios que inspiran</h2>

          <p>
            Somos una tienda especializada en muebles modernos y
            funcionales para hogares, oficinas y espacios comerciales.
          </p>

          <p>
            Trabajamos con materiales de alta calidad para ofrecer
            productos duraderos y con diseños que se adaptan a cualquier
            estilo.
          </p>

          <Link to="/about" className="btn-primary">
            Conócenos
          </Link>
        </div>

        <div className="hero-image">
          <img src={heroImage} alt="Sala moderna" />
        </div>
      </section>

      <section className="featured-products">
        <h2>Productos Destacados</h2>

        {loading && <Loader />}

        {error && <p className="state-message">{error}</p>}

        {!loading && !error && (
          <div className="products-container">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="features">
        <div className="feature">
          <span className="feature-icon">🚚</span>
          <h3>Envío Gratis</h3>
          <p>En compras seleccionadas.</p>
        </div>

        <div className="feature">
          <span className="feature-icon">🛡️</span>
          <h3>Garantía</h3>
          <p>Hasta 12 meses de garantía.</p>
        </div>

        <div className="feature">
          <span className="feature-icon">💬</span>
          <h3>Soporte</h3>
          <p>Atención personalizada.</p>
        </div>
      </section>
    </>
  )
}
