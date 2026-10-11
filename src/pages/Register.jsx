import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '../components/ui/Button'
import { createUser } from '../services/users.service'


const emptyValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthDate: '',
  province: ''
}
export function UserForm({
  selectedUser = null,
  submitText = 'Registrarme',
  onSubmit,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: emptyValues })

  useEffect(() => {
    reset(
      selectedUser
        ? {
            name: selectedUser.name ?? '',
            email: selectedUser.email ?? '',
            password: selectedUser.password ?? '',
            confirmPassword: selectedUser.password ?? '',
            birthDate: (selectedUser.birthDate ?? '').slice(0, 10),
            province: selectedUser.province ?? '',
          }
        : emptyValues
    )
  }, [selectedUser, reset])

  const submit = async (data) => {
    const ok = await onSubmit({
      name: data.name,
      email: data.email,
      password: data.password,
      birthDate: data.birthDate,
      province: data.province,
    })

    if (ok) reset(emptyValues)
  }

  return (
    <form className="register-form" onSubmit={handleSubmit(submit)}>
      <div className="form-group">
        <label htmlFor="name">Nombre Completo</label>
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
        <label htmlFor="email">Correo Electrónico</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'El correo es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Ingresa un correo válido',
            },
          })}
        />
        {errors.email && (
          <span className="form-error">{errors.email.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'Debe tener al menos 6 caracteres',
            },
          })}
        />
        {errors.password && (
          <span className="form-error">{errors.password.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Repetir Contraseña</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword', {
            required: 'Repite la contraseña',
            validate: (value) =>
              value === watch('password') || 'Las contraseñas no coinciden',
          })}
        />
        {errors.confirmPassword && (
          <span className="form-error">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="birthDate">Fecha de Nacimiento</label>
        <input
          id="birthDate"
          type="date"
          {...register('birthDate', {
            required: 'La fecha de nacimiento es obligatoria',
          })}
        />
        {errors.birthDate && (
          <span className="form-error">{errors.birthDate.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="province">Provincia</label>
        <select
          id="province"
          {...register('province', { required: 'Selecciona una provincia' })}
        >
          <option value="">Seleccione una opción</option>
          <option value="lima">Lima</option>
          <option value="arequipa">Arequipa</option>
          <option value="cusco">Cusco</option>
          <option value="trujillo">Trujillo</option>
          <option value="piura">Piura</option>
        </select>
        {errors.province && (
          <span className="form-error">{errors.province.message}</span>
        )}
      </div>

      <div className="form-actions">
        <Button type="submit" disabled={isSubmitting}>
          {submitText}
        </Button>

        {onCancel && (
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}

export default function Register() {
  const [message, setMessage] = useState(null)

  const handleRegister = async (data) => {
    try {
      await createUser(data)
      setMessage({
        type: 'success',
        text: '¡Cuenta creada con éxito!',
      })
      return true
    } catch {
      setMessage({
        type: 'error',
        text: 'No se pudo crear la cuenta. Inténtalo de nuevo.',
      })
      return false
    }
  }

  return (
    <section className="register">
      <div className="register-header">
        <h1>Crear Cuenta</h1>

        <p>
          Regístrate para acceder a promociones, guardar favoritos y
          realizar compras de manera más rápida.
        </p>
      </div>

      {message && (
        <p className={`message message-${message.type}`}>
          {message.text}
        </p>
      )}

      <UserForm submitText="Registrarme" onSubmit={handleRegister} />

      <p className="form-link">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </section>
  )
}
