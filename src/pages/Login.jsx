import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '../components/ui/Button'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <section className="register">
      <div className="register-header">
        <h1>Iniciar sesión</h1>

        <p>Ingresa con tu cuenta para continuar con tus compras.</p>
      </div>

      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'El correo es obligatorio',
            })}
          />
          {errors.email && (
            <span className="form-error">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group form-group-full">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'La contraseña es obligatoria',
            })}
          />
          {errors.password && (
            <span className="form-error">{errors.password.message}</span>
          )}
        </div>

        <div className="form-actions">
          <Button type="submit">Iniciar sesión</Button>
        </div>
      </form>

      <p className="form-link">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </section>
  )
}
