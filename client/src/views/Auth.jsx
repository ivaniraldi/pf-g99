import React, { useState } from 'react'
import Login from './../components/Login';
import Register from './../components/Register';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='d-flex align-items-center justify-content-center py-5' style={{ minHeight: '80vh' }}>
      <div className='premium-card glass border-0 shadow-lg overflow-hidden' style={{ 
        maxWidth: '900px', 
        width: '100%', 
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'row',
        minHeight: '600px'
      }}>
        {/* Left Side - Image/Info (Hidden on small screens) */}
        <div className='col-md-5 d-none d-md-flex flex-column justify-content-between p-5 text-white position-relative' style={{ 
          background: 'linear-gradient(135deg, var(--primary) 0%, #4338ca 100%)',
          overflow: 'hidden'
        }}>
          <div className='position-absolute top-0 start-0 w-100 h-100' style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1074&auto=format&fit=crop)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            opacity: 0.2,
            mixBlendMode: 'overlay'
          }}></div>

          <div className='position-relative z-1'>
            <h1 className='font-archivo-black' style={{ fontSize: '2.5rem', marginBottom: '20px', lineHeight: '1' }}>
              MODA <br/>SIN <br/>LÍMITES.
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Únete a la tienda de ropa más exclusiva y descubre tu estilo único.</p>
          </div>

          <div className='position-relative z-1 mt-auto'>
            <div className='d-flex align-items-center gap-2 mb-2'>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white' }}></div>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>Calidad Premium</p>
            </div>
            <div className='d-flex align-items-center gap-2 mb-2'>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }}></div>
              <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600', opacity: 0.8 }}>Envío Global</p>
            </div>
          </div>
        </div>

        {/* Right Side - Forms */}
        <div className='col-12 col-md-7 p-4 p-lg-5 d-flex flex-column align-items-center justify-content-center bg-white'>
          {isLogin ? <Login /> : <Register />}
          
          <div className='mt-4 pt-3 border-top w-100 text-center' style={{ maxWidth: '400px' }}>
            <button 
              className='btn btn-link text-decoration-none d-flex align-items-center justify-content-center gap-2 m-auto transition-all' 
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.95rem' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {isLogin ? (
                <>¿No tienes cuenta? Regístrate <ArrowRight size={18} /></>
              ) : (
                <><ArrowLeft size={18} /> ¿Ya tienes cuenta? Inicia sesión</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
