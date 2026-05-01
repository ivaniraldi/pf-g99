import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, 1);
  }

  return (
    <div className='premium-card'>
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <Link to={`/detail/${product.id}`}>
          <img 
            src={product.imageUrl} 
            alt={product.name}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Link>
        <div style={{ 
          position: 'absolute', 
          top: '12px', 
          right: '12px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          color: 'var(--primary)'
        }}>
          {product.category.name}
        </div>
      </div>
      
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h5 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>{product.name}</h5>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>{product.brand}</p>
        
        <div style={{ marginTop: 'auto' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>
            ${product.price.toFixed(2)}
          </p>
          
          <div className='d-flex gap-2'>
            <button 
              className='premium-button premium-button-primary' 
              style={{ flexGrow: 2, fontSize: '0.9rem' }}
              onClick={handleAddToCart}
            >
              Agregar
            </button>
            <Link 
              to={`/detail/${product.id}`}
              className='premium-button premium-button-outline text-decoration-none text-center'
              style={{ flexGrow: 1, fontSize: '0.9rem', padding: '10px' }}
            >
              Detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
