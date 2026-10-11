import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import Loader from '../components/ui/Loader'
import { getProductById } from '../services/products.service'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    const loadProduct = async () => {
      try {
        const data = await getProductById(id)
        if (!ignore) {
          setProduct(data)
          setError(null)
        }
      } catch {
        if (!ignore) setError('Producto no encontrado.')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadProduct()

    return () => {
      ignore = true
    }
  }, [id])

  if (loading) return <Loader />

  if (error || !product) {
    return (
      <section className="product-detail">
        <div className="product-info">
          <h1>{error ?? 'Producto no encontrado.'}</h1>

          <Link to="/products" className="btn-secondary">
            Volver a productos
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="product-detail">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <span className="category">{product.category}</span>

        <h1>{product.name}</h1>

        <p className="price">
          S/ {Number(product.price).toLocaleString('en-US')}
        </p>

        <p className="description">{product.description}</p>

        <Button>Agregar al carrito</Button>
      </div>
    </section>
  )
}
