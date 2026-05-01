import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Shirt, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '80vh' }}>
      <div className='text-center p-5 glass shadow-lg' style={{ 
        maxWidth: '600px', 
        borderRadius: '50px', 
        border: '1px solid rgba(255,255,255,0.4)',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(15px)'
      }}>
        {/* Visual Element */}
        <div className='position-relative mb-5 d-inline-block'>
          <div className='grad-primary' style={{ 
            width: '180px', 
            height: '180px', 
            borderRadius: '50%', 
            opacity: '0.1', 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 3s infinite'
          }}></div>
          <div className='position-relative' style={{ zIndex: 1 }}>
            <Shirt size={100} strokeWidth={1} style={{ color: 'var(--primary)', opacity: '0.8' }} />
            <Search 
              size={40} 
              className='position-absolute' 
              style={{ bottom: '-10px', right: '-10px', color: 'var(--accent)' }} 
            />
          </div>
        </div>

        {/* Text Content */}
        <h1 className='font-archivo-black mb-3' style={{ fontSize: '6rem', lineHeight: '1', color: 'var(--primary)', letterSpacing: '-5px' }}>
          404
        </h1>
        <h2 className='font-archivo-black mb-3' style={{ fontSize: '1.5rem', textTransform: 'uppercase' }}>
          ¿Te has perdido en el armario?
        </h2>
        <p className='text-muted mb-5 px-md-5' style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          La página que buscas no existe o ha sido movida a otra colección. 
          No te preocupes, ¡todavía tenemos mucha moda para ti!
        </p>

        {/* Actions */}
        <div className='d-flex flex-column flex-sm-row gap-3 justify-content-center'>
          <Link 
            to="/" 
            className='premium-button premium-button-primary d-flex align-items-center justify-content-center gap-2 px-4 py-3'
            style={{ borderRadius: '20px', textDecoration: 'none' }}
          >
            <Home size={18} /> Volver al Inicio
          </Link>
          <Link 
            to="/gallery" 
            className='premium-button premium-button-outline d-flex align-items-center justify-content-center gap-2 px-4 py-3'
            style={{ borderRadius: '20px', textDecoration: 'none' }}
          >
            <ArrowLeft size={18} /> Ver Catálogo
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.2; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}
