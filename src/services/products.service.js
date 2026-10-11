const BASE_URL = 'https://6ac82af075a4ce3fe7227e31.mockapi.io/'

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) throw new Error('Error al obtener products')
  return res.json()
}

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error('Error al obtener el registro')
  return res.json()
}

export const createProduct = async (data) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al crear el registro')
  return res.json()
}

export const updateProduct = async (id, data) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al actualizar el registro')
  return res.json()
}

export const deleteProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Error al eliminar el registro')
  return res.json()
}
