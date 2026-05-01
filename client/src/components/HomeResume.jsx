import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'
import { Link } from 'react-router-dom'
import { TrendingUp, ArrowRight, Sparkles } from 'lucide-react'

export default function HomeResume() {
  const { products } = useContext(ProductContext);
  const trendingProducts = products.slice(0, 3); // Get first 3 for the resume

  return (
    <section className='py-5'>
      <div className='container'>
        <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3'>
          <div>
            <div className='d-flex align-items-center gap-2 mb-2'>
              <TrendingUp size={20} className='text-primary' />
              <span className='fw-bold text-primary text-uppercase' style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>Tendencias 2026</span>
            </div>
            <h2 className='font-archivo-black' style={{ fontSize: '3rem', margin: 0, lineHeight: '1' }}>
              LO MÁS <span className='text-primary'>DESEADO.</span>
            </h2>
          </div>
          <Link to="/gallery" className='text-decoration-none fw-bold d-flex align-items-center gap-2 transition-all hover-primary' style={{ color: 'var(--text-main)' }}>
            Ver toda la colección <ArrowRight size={20} />
          </Link>
        </div>

        <div className='row g-4'>
          {trendingProducts.map((p, i) => (
            <div key={p.id} className='col-lg-4 col-md-6'>
              <div className='trend-card position-relative overflow-hidden' style={{ borderRadius: '30px', height: '500px', cursor: 'pointer' }}>
                <img 
                  src={p.imageUrl} 
                  alt={p.name} 
                  className='w-100 h-100 transition-all trend-image' 
                  style={{ objectFit: 'cover' }} 
                />
                
                {/* Overlay */}
                <div className='position-absolute bottom-0 start-0 w-100 p-4 z-1 text-white gradient-overlay'>
                  <div className='d-flex align-items-center gap-2 mb-2'>
                    <Sparkles size={14} fill="currentColor" className='text-warning' />
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.9)' }}>Tendencia Actual</span>
                  </div>
                  <h4 className='font-archivo-black m-0' style={{ fontSize: '2rem', lineHeight: '1', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>{p.name.toUpperCase()}</h4>
                  <div className='d-flex justify-content-between align-items-center mt-4 pt-2'>
                    <div className='d-flex flex-column'>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>PRECIO</span>
                      <p className='m-0 fw-bold' style={{ fontSize: '1.6rem', color: '#fff', letterSpacing: '-0.5px' }}>${p.price.toFixed(2)}</p>
                    </div>
                    <Link to={`/detail/${p.id}`} className='premium-button bg-white text-dark border-0 rounded-pill px-4 py-2 fw-bold shadow-lg' style={{ fontSize: '0.85rem' }}>
                      Explorar
                    </Link>
                  </div>
                </div>

                {/* Hot Badge */}
                {i === 0 && (
                  <div className='position-absolute top-0 start-0 m-4 px-3 py-2 rounded-3 text-white glass-badge' style={{ 
                    fontWeight: '800', 
                    fontSize: '0.7rem', 
                    zIndex: 2,
                    letterSpacing: '1px'
                  }}>
                    HOT 🔥
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trend-card .trend-image {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .trend-card:hover .trend-image {
          transform: scale(1.05);
        }
        .gradient-overlay {
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 30%, transparent 100%);
          transition: 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .trend-card:hover .gradient-overlay {
          padding-bottom: 50px !important;
        }
        .glass-badge {
          background: rgba(255, 107, 107, 0.8);
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .hover-primary:hover {
          color: var(--primary) !important;
          transform: translateX(5px);
        }
      `}</style>
    </section>
  )
}
