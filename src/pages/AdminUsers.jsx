import { useEffect, useState } from 'react'
import { UserForm } from './Register'
import Loader from '../components/ui/Loader'
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../services/users.service'

function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="products-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Fecha de nacimiento</th>
            <th>Provincia</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="5">No hay usuarios registrados.</td>
            </tr>
          )}

          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{(user.birthDate ?? '').slice(0, 10)}</td>
              <td>{user.province}</td>
              <td>
                <button className="btn-edit" onClick={() => onEdit(user)}>
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(user)}
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

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  // null = modo creación | usuario = modo edición
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data)
      } catch {
        setMessage({
          type: 'error',
          text: 'No se pudieron cargar los usuarios.',
        })
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const handleSubmit = async (data) => {
    try {
      if (selectedUser) {
        const updated = await updateUser(selectedUser.id, {
          ...selectedUser,
          ...data,
        })
        setUsers((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        )
        setSelectedUser(null)
        setMessage({ type: 'success', text: 'Usuario actualizado.' })
      } else {
        const created = await createUser(data)
        setUsers((prev) => [...prev, created])
        setMessage({ type: 'success', text: 'Usuario creado.' })
      }
      return true
    } catch {
      setMessage({
        type: 'error',
        text: 'No se pudo guardar el usuario.',
      })
      return false
    }
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
    setMessage(null)
    document
      .getElementById('user-form')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDelete = async (user) => {
    if (!window.confirm(`¿Eliminar a "${user.name}"?`)) return

    try {
      await deleteUser(user.id)
      setUsers((prev) => prev.filter((item) => item.id !== user.id))
      if (selectedUser?.id === user.id) setSelectedUser(null)
      setMessage({ type: 'success', text: 'Usuario eliminado.' })
    } catch {
      setMessage({
        type: 'error',
        text: 'No se pudo eliminar el usuario.',
      })
    }
  }

  return (
    <section className="admin-products">
      <div className="admin-header">
        <h1>Administración de Usuarios</h1>

        <p>Gestiona los usuarios registrados en la tienda.</p>
      </div>

      {message && (
        <p className={`message message-${message.type}`}>
          {message.text}
        </p>
      )}

      <div className="table-section">
        <h2>Usuarios Registrados</h2>

        {loading ? (
          <Loader />
        ) : (
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <div className="form-section" id="user-form">
        <h2>{selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>

        <UserForm
          selectedUser={selectedUser}
          submitText={selectedUser ? 'Actualizar Usuario' : 'Guardar Usuario'}
          onSubmit={handleSubmit}
          onCancel={() => setSelectedUser(null)}
        />
      </div>
    </section>
  )
}
