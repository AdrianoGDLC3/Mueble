import productImage from '../assets/images/producto1.jpg'
import userImage from '../assets/images/user.jpg'

export default function About() {
  return (
    <>
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Acerca de Nosotros</h1>

          <p>
            Creamos espacios únicos con muebles que combinan diseño,
            comodidad y calidad para cada hogar.
          </p>
        </div>
      </section>

      <section className="about-company">
        <div className="about-text">
          <h2>Nuestro Proyecto</h2>

          <p>
            Este ecommerce fue desarrollado con el objetivo de ofrecer
            una experiencia moderna para la compra de muebles en línea.
            Los clientes pueden explorar diferentes categorías, conocer
            los productos y encontrar opciones ideales para su hogar u
            oficina.
          </p>

          <p>
            El proyecto fue desarrollado utilizando HTML5 y CSS3
            siguiendo el enfoque Mobile First y principios de diseño
            responsive.
          </p>
        </div>

        <div className="about-image">
          <img src={productImage} alt="Muebles modernos" />
        </div>
      </section>

      <section className="company-quote">
        <blockquote>
          "Diseñamos espacios que inspiran, muebles que acompañan tu
          vida."
        </blockquote>
      </section>

      <section className="developer-section">
        <h2>Desarrollador</h2>

        <div className="developer-card">
          <img
            src={userImage}
            alt="Desarrollador"
            className="developer-avatar"
          />

          <h3>Adriano Guzman de la Cruz</h3>

          <p>Estudiando de desarrollo web y creador de esta web</p>

          <div className="developer-contact">
            <p>📧 adri@gmail.com</p>
            <p>+51 999 999 999</p>
          </div>
        </div>
      </section>
    </>
  )
}
