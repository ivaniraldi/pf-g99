import React from "react";
import { Link } from "react-router-dom";
import { Globe, Share2, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-5 pb-4 mt-5 border-top bg-white">
      <div className="container">
        <div className="row g-5 mb-5">
          {/* Brand & Newsletter */}
          <div className="col-lg-4 col-md-12">
            <h4 className="font-archivo-black mb-3" style={{ letterSpacing: '-1px', fontSize: '1.8rem' }}>
              ADL<span className="text-primary">SHIRTS</span>
            </h4>
            <p className="text-muted mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '350px' }}>
              Redefiniendo la moda contemporánea con piezas atemporales y calidad excepcional. Únete a nuestra newsletter para ofertas exclusivas.
            </p>
            <div className="newsletter-box position-relative" style={{ maxWidth: '350px' }}>
              <input 
                type="email" 
                placeholder="Tu email" 
                className="premium-input w-100 ps-3 pe-5" 
                style={{ height: '50px', borderRadius: '15px' }}
              />
              <button className="position-absolute end-0 top-0 h-100 px-3 bg-primary text-white border-0" style={{ borderRadius: '0 15px 15px 0' }}>
                <Mail size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Links Group */}
          <div className="col-lg-5 col-md-12">
            <div className="row">
              <div className="col-6 col-md-4">
                <h6 className="fw-bold mb-4 text-dark text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Tienda</h6>
                <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.9rem' }}>
                  <li><Link to="/gallery" className="text-muted text-decoration-none hover-primary">Novedades</Link></li>
                  <li><Link to="/gallery" className="text-muted text-decoration-none hover-primary">Hombre</Link></li>
                  <li><Link to="/gallery" className="text-muted text-decoration-none hover-primary">Mujer</Link></li>
                  <li><Link to="/gallery" className="text-muted text-decoration-none hover-primary">Ofertas</Link></li>
                </ul>
              </div>
              <div className="col-6 col-md-4">
                <h6 className="fw-bold mb-4 text-dark text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Compañía</h6>
                <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.9rem' }}>
                  <li><Link to="/about" className="text-muted text-decoration-none hover-primary">Nosotros</Link></li>
                  <li><a href="#" className="text-muted text-decoration-none hover-primary">Sostenibilidad</a></li>
                  <li><a href="#" className="text-muted text-decoration-none hover-primary">Prensa</a></li>
                  <li><a href="#" className="text-muted text-decoration-none hover-primary">Carreras</a></li>
                </ul>
              </div>
              <div className="col-12 col-md-4 mt-4 mt-md-0">
                <h6 className="fw-bold mb-4 text-dark text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Soporte</h6>
                <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '0.9rem' }}>
                  <li><a href="#" className="text-muted text-decoration-none hover-primary">Ayuda</a></li>
                  <li><a href="#" className="text-muted text-decoration-none hover-primary">Envíos</a></li>
                  <li><a href="#" className="text-muted text-decoration-none hover-primary">Devoluciones</a></li>
                  <li><a href="#" className="text-muted text-decoration-none hover-primary">Contacto</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Socials & Info */}
          <div className="col-lg-3 col-md-12 text-lg-end">
            <h6 className="fw-bold mb-4 text-dark text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Síguenos</h6>
            <div className="d-flex gap-3 justify-content-lg-end mb-4">
              {[Globe, Share2, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" className="btn-social text-primary border rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>hola@adlshirts.com</p>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>+34 912 345 678</p>
          </div>
        </div>

        <div className="pt-4 border-top d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} ADLShirts. Todos los derechos reservados.
          </p>
          <div className="d-flex gap-4">
            <a href="#" className="text-muted text-decoration-none" style={{ fontSize: '0.8rem' }}>Privacidad</a>
            <a href="#" className="text-muted text-decoration-none" style={{ fontSize: '0.8rem' }}>Términos</a>
            <a href="#" className="text-muted text-decoration-none" style={{ fontSize: '0.8rem' }}>Cookies</a>
          </div>
        </div>
      </div>

      <style>{`
        .btn-social {
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
        }
        .btn-social:hover {
          background: var(--primary);
          color: white !important;
          transform: translateY(-5px);
          border-color: var(--primary) !important;
        }
        .hover-primary:hover {
          color: var(--primary) !important;
          padding-left: 8px;
          transition: 0.3s ease;
        }
      `}</style>
    </footer>
  );
}
