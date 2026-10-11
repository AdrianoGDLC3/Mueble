import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/ui/Button'
import ProductTable from '../components/products/ProductTable'
import Loader from '../components/ui/Loader'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/products.service'


const categories = [
  'Sala',
  'Silla',
  'Habitacion',
  'Dormitorio',
  'Comedor',
  'Oficina',
  'Baño',
]

const emptyValues = {
  name: '',
  price: '',
  description: '',
  image: '',
  category: categories[0],
}

function ProductForm({ selectedProduct, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: emptyValues })
  useEffect(() => {
    reset(
      selectedProduct
        ? {
            name: selectedProduct.name,
            price: selectedProduct.price,
            description: selectedProduct.description,
            image: selectedProduct.image,
            category: selectedProduct.category,
          }
        : emptyValues
    )
  }, [selectedProduct, reset])

  const submit = async (data) => {
    const ok = await onSubmit(data)
    if (ok) reset(emptyValues)
  }

  return (
    <form
      id="product-form"
      className="admin-form"
      onSubmit={handleSubmit(submit)}
    >
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'El nombre es obligatorio' })}
        />
        {errors.name && (
          <span className="form-error">{errors.name.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="price">Precio</label>
        <input
          id="price"
          type="number"
          step="any"
          {...register('price', {
            required: 'El precio es obligatorio',
            min: { value: 0, message: 'El precio no puede ser negativo' },
          })}
        />
        {errors.price && (
          <span className="form-error">{errors.price.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          {...register('description', {
            required: 'La descripción es obligatoria',
          })}
        ></textarea>
        {errors.description && (
          <span className="form-error">{errors.description.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="image">Imagen (URL)</label>
        <input
          id="image"
          type="text"
          {...register('image', { required: 'La imagen es obligatoria' })}
        />
        {errors.image && (
          <span className="form-error">{errors.image.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          {...register('category', {
            required: 'La categoría es obligatoria',
          })}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="form-error">{errors.category.message}</span>
        )}
      </div>

      <div className="form-actions">
        <Button type="submit" disabled={isSubmitting}>
          {selectedProduct ? 'Actualizar Producto' : 'Guardar Producto'}
        </Button>

        {selectedProduct && (
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  // null = modo creación | producto = modo edición
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch {
        setMessage({
          type: 'error',
          text: 'No se pudieron cargar los productos.',
        })
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const handleSubmit = async (data) => {
    const payload = { ...data, price: Number(data.price) }

    try {
      if (selectedProduct) {
        const updated = await updateProduct(selectedProduct.id, {
          ...selectedProduct,
          ...payload,
        })
        setProducts((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        )
        setSelectedProduct(null)
        setMessage({ type: 'success', text: 'Producto actualizado.' })
      } else {
        const created = await createProduct({
          ...payload,
          createdAt: new Date().toISOString(),
        })
        setProducts((prev) => [...prev, created])
        setMessage({ type: 'success', text: 'Producto creado.' })
      }
      return true
    } catch {
      setMessage({
        type: 'error',
        text: 'No se pudo guardar el producto.',
      })
      return false
    }
  }

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setMessage(null)
    document
      .getElementById('product-form')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDelete = async (product) => {
    if (!window.confirm(`¿Eliminar "${product.name}"?`)) return

    try {
      await deleteProduct(product.id)
      setProducts((prev) => prev.filter((item) => item.id !== product.id))
      if (selectedProduct?.id === product.id) setSelectedProduct(null)
      setMessage({ type: 'success', text: 'Producto eliminado.' })
    } catch {
      setMessage({
        type: 'error',
        text: 'No se pudo eliminar el producto.',
      })
    }
  }

  return (
    <section className="admin-products">
      <div className="admin-header">
        <h1>Administración de Productos</h1>

        <p>Gestiona el catálogo de muebles del ecommerce.</p>
      </div>

      {message && (
        <p className={`message message-${message.type}`}>
          {message.text}
        </p>
      )}

      <div className="table-section">
        <h2>Productos Registrados</h2>

        {loading ? (
          <Loader />
        ) : (
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <div className="form-section">
        <h2>{selectedProduct ? 'Editar Producto' : 'Nuevo Producto'}</h2>

        <ProductForm
          selectedProduct={selectedProduct}
          onSubmit={handleSubmit}
          onCancel={() => setSelectedProduct(null)}
        />
      </div>
    </section>
  )
}
