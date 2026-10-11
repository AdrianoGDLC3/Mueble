const formatDate = (value) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('es-PE')
}

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="products-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="6">No hay productos registrados.</td>
            </tr>
          )}

          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.name} />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{formatDate(product.createdAt)}</td>
              <td>S/ {Number(product.price).toLocaleString('en-US')}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() => onEdit(product)}
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(product)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
