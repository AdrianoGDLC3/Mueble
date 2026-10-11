import { Link } from 'react-router-dom'
import Button from './Button'

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />

      <span className="category">{product.category}</span>

      <h3>{product.name}</h3>

      <p className="price">
        S/ {Number(product.price).toLocaleString('en-US')}
      </p>

      <div className="card-buttons">
        <Button>Comprar</Button>

        <Link to={`/products/${product.id}`} className="btn-secondary">
          Ver Más
        </Link>
      </div>
    </article>
  )
}
