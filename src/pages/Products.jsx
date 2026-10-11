import { useEffect, useState } from 'react'
import ProductCard from '../components/ui/ProductCard'
import Loader from '../components/ui/Loader'
import { getProducts } from '../services/products.service'

export default function Products() {
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
    <section className="products-page">
      <aside className="filters">
        <h2>Filtros</h2>

        <div className="filter-group">
          <h3>Categorías</h3>

          <label>
            <input type="checkbox" />
            Sala
          </label>

          <label>
            <input type="checkbox" />
            Dormitorio
          </label>

          <label>
            <input type="checkbox" />
            Comedor
          </label>

          <label>
            <input type="checkbox" />
            Oficina
          </label>
        </div>

        <div className="filter-group">
          <h3>Precio</h3>

          <label>
            <input type="radio" name="price" />
            Menos de S/500
          </label>

          <label>
            <input type="radio" name="price" />
            S/500 - S/1500
          </label>

          <label>
            <input type="radio" name="price" />
            Más de S/1500
          </label>
        </div>
      </aside>

      <div className="products-content">
        {loading && <Loader />}

        {error && <p className="state-message">{error}</p>}

        {!loading && !error && (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
