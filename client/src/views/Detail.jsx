import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import { CartContext } from '../context/CartContext'
import { Truck, ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react'

export default function Detail() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState(product?.availableSizes?.[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || 'Blanco');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className='py-5 text-center'>
        <h3>Producto no encontrado</h3>
        <button className='premium-button premium-button-primary mt-3' onClick={() => navigate('/gallery')}>
          Volver a la Galería
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    // Optional: Redirect to cart or show success
  }

  return (
    <div className='py-5'>
      <button 
        className='btn btn-link text-dark text-decoration-none mb-4 p-0 d-flex align-items-center gap-2 fw-bold'
        onClick={() => navigate(-1)}
        style={{ fontSize: '0.9rem' }}
      >
        <ArrowLeft size={18} /> Volver
      </button>

      <div className='row g-5'>
        {/* Imagen del Producto */}
        <div className='col-lg-6'>
          <div className='premium-card' style={{ height: 'auto', overflow: 'hidden', borderRadius: '30px' }}>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
            />
          </div>
        </div>

        {/* Info del Producto */}
        <div className='col-lg-6'>
          <div className='ps-lg-4'>
            <span className='badge rounded-pill mb-3' style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '8px 15px', fontWeight: '600' }}>
              {product.category.name}
            </span>
            <h1 className='font-archivo-black' style={{ fontSize: '3rem', marginBottom: '10px', lineHeight: '1.1' }}>{product.name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '25px', fontWeight: '500' }}>{product.brand}</p>
            
            <h2 className='font-archivo-black' style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '30px' }}>
              ${product.price.toFixed(2)}
            </h2>

            <div className='mb-4'>
              <h5 className='fw-bold mb-3' style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>DESCRIPCIÓN</h5>
              <p style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}>
                {product.description || 'Esta prenda ha sido diseñada para ofrecer el máximo confort y estilo. Fabricada con materiales de alta calidad, es ideal para complementar tu look diario con un toque de distinción.'}
              </p>
            </div>

            {/* Selector de Color */}
            <div className='mb-4'>
              <h5 className='fw-bold mb-3' style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>COLOR SELECCIONADO: <span className='text-primary'>{selectedColor.toUpperCase()}</span></h5>
              <div className='d-flex gap-3'>
                {product.colors?.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className='btn p-0 rounded-circle transition-all'
                    style={{ 
                      width: '35px', 
                      height: '35px', 
                      backgroundColor: color === 'Blanco' ? '#fff' : color === 'Negro' ? '#000' : '#4b5563',
                      border: selectedColor === color ? '3px solid var(--primary)' : '1px solid #ddd',
                      boxShadow: selectedColor === color ? '0 0 0 2px #fff' : 'none'
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Selector de Tallas */}
            <div className='mb-4'>
              <h5 className='fw-bold mb-3' style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>TALLA SELECCIONADA: <span className='text-primary'>{selectedSize}</span></h5>
              <div className='d-flex gap-2 flex-wrap'>
                {product.availableSizes?.map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    style={{ 
                      minWidth: '55px', 
                      height: '55px', 
                      border: '2px solid',
                      borderColor: selectedSize === size ? 'var(--primary)' : 'var(--border-color)', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '1rem',
                      backgroundColor: selectedSize === size ? 'rgba(99, 102, 241, 0.05)' : 'white',
                      color: selectedSize === size ? 'var(--primary)' : 'var(--text-main)',
                      transition: '0.2s'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Cantidad y Agregar */}
            <div className='d-flex flex-column flex-sm-row gap-3 mb-5'>
              <div className='d-flex align-items-center justify-content-between border rounded-pill px-3 py-2 bg-white' style={{ minWidth: '140px' }}>
                <button 
                  className='btn btn-link text-dark text-decoration-none p-0'
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={20} />
                </button>
                <span className='fw-bold' style={{ fontSize: '1.2rem' }}>{quantity}</span>
                <button 
                  className='btn btn-link text-dark text-decoration-none p-0'
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <button 
                className='premium-button premium-button-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2' 
                style={{ padding: '15px', fontSize: '1.1rem', borderRadius: '50px' }}
                onClick={handleAddToCart}
              >
                <ShoppingBag size={20} /> Añadir al Carrito
              </button>
            </div>

            <div className='mt-5 p-4 rounded-4 glass' style={{ border: '1px solid rgba(0,0,0,0.05)' }}>
              <div className='d-flex align-items-center gap-3 mb-2'>
                <div className='p-2 rounded-circle' style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}>
                  <Truck size={22} style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: '700' }}>Envío Exprés Disponible</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Recíbelo en 2-4 días hábiles en tu domicilio.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
