import React from 'react'
import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className='grad-primary' style={{
      padding: '80px 40px',
      borderRadius: 'var(--radius-lg)',
      textAlign: 'center',
      color: 'white',
      margin: '80px 0',
      boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Circle */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '20px' }}>
          ¡Descubre nuestras ofertas exclusivas!
        </h2>
        <p style={{
          fontSize: '1.2rem',
          maxWidth: '700px',
          margin: '0 auto 40px',
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          Explora nuestra colección de productos de alta calidad a precios increíbles.
          Suscríbete para recibir promociones especiales y ser el primero en conocer los nuevos lanzamientos.
        </p>
        <Link
          to="/gallery"
          className='premium-button text-decoration-none'
          style={{
            backgroundColor: 'white',
            color: 'var(--primary)',
            padding: '15px 45px',
            fontSize: '1.1rem',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            display: 'inline-block'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Comprar ahora
        </Link>
      </div>
    </section>
  )
}
