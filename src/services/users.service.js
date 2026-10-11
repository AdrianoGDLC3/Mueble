const BASE_URL = 'https://6ac82af075a4ce3fe7227e31.mockapi.io/'

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`)
  if (!res.ok) throw new Error('Error al obtener users')
  return res.json()
}

export const getUserById = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}`)
  if (!res.ok) throw new Error('Error al obtener el registro')
  return res.json()
}

export const createUser = async (data) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al crear el registro')
  return res.json()
}

export const updateUser = async (id, data) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al actualizar el registro')
  return res.json()
}

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Error al eliminar el registro')
  return res.json()
}
