import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

export default function Hero() {
  const slides = [
    {
      image: "https://images.pexels.com/photos/9558253/pexels-photo-9558253.jpeg",
      title: "Nueva Colección Urbana",
      description: "Descubre el equilibrio perfecto entre estilo y comodidad."
    },
    {
      image: "https://images.pexels.com/photos/11176318/pexels-photo-11176318.jpeg",
      title: "Esenciales de Temporada",
      description: "Prendas diseñadas para destacar en cualquier ocasión."
    }
  ];

  return (
    <div className="hero-container" style={{ margin: '0 -15px', overflow: 'hidden', borderRadius: 'var(--radius-lg)', marginBottom: '60px' }}>
      <Carousel interval={5000} fade indicators={true} controls={true}>
        {slides.map((slide, index) => (
          <Carousel.Item key={index} style={{ height: '550px' }}>
            <div style={{ position: 'relative', height: '100%', width: '100%' }}>
              <img
                className="d-block w-100"
                src={slide.image}
                alt={slide.title}
                style={{ objectFit: 'cover', height: '100%', filter: 'brightness(0.7)' }}
              />
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '0 20px'
              }}>
                <h1 style={{ 
                  fontSize: '3.5rem', 
                  color: 'white', 
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  marginBottom: '20px',
                  maxWidth: '800px'
                }}>
                  {slide.title}
                </h1>
                <p style={{ 
                  fontSize: '1.25rem', 
                  maxWidth: '600px', 
                  marginBottom: '30px',
                  opacity: 0.9 
                }}>
                  {slide.description}
                </p>
                <div className="d-flex gap-3">
                  <Link to="/gallery" className="premium-button premium-button-primary text-decoration-none" style={{ padding: '12px 35px', fontSize: '1rem' }}>
                    Ver Catálogo
                  </Link>
                  <button className="premium-button glass" style={{ color: 'white', padding: '12px 35px', fontSize: '1rem' }}>
                    Saber Más
                  </button>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
