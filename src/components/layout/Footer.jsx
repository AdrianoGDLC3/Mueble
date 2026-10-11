export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">Ecommerce</h3>

          <p>
            Tu tienda online de confianza para encontrar los mejores
            productos.
          </p>
        </div>

        <div className="footer-section">
          <h3>Redes Sociales</h3>

          <div className="social-links">
            <a href="#">LinkedIn</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Contacto</h3>

          <p>- adri@gmail.com</p>
          <p>- +51 999 999 999</p>
          <p>- Lima, Perú</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Adri´s reservados</p>
      </div>
    </footer>
  )
}
