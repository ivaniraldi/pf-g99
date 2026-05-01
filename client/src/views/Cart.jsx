import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalItemsPrice, shippingPrice, totalPrice } = useContext(CartContext);


  const subtotal = totalItemsPrice;
  const shipping = shippingPrice;
  const total = totalPrice;

  return (
    <div className=''>
      <div className='d-flex justify-content-between align-items-end mb-2'>
        <div>
          <h2 style={{ margin: 0, fontSize: '2.5rem' }}>Tu Carrito</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>
            {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu lista
          </p>
        </div>
        {cartItems.length > 0 && (
          <button
            className='btn btn-link text-danger text-decoration-none p-0 d-flex align-items-center gap-2'
            onClick={() => { if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) clearCart(); }}
            style={{ fontSize: '0.9rem', fontWeight: '600' }}
          >
            <Trash2 size={16} /> Vaciar carrito
          </button>
        )}
      </div>

      <div className='row g-5'>
        {/* Lista de productos */}
        <div className="col-lg-8">
          <div className='d-flex flex-column gap-4'>
            {cartItems.length > 0 ? cartItems.map(item => (
              <div key={item.product.id} className='premium-card glass' style={{ padding: '20px' }}>
                <div className='row align-items-center'>
                  <div className='col-3 col-md-2'>
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />
                  </div>
                  <div className='col-9 col-md-4'>
                    <h5 style={{ margin: 0, fontSize: '1.1rem' }}>{item.product.name}</h5>
                    <div className='d-flex gap-2 mt-2'>
                      <span className='badge bg-light text-muted border px-2 py-1' style={{ fontSize: '0.7rem' }}>Talle: {item.size}</span>
                      <span className='badge bg-light text-muted border px-2 py-1' style={{ fontSize: '0.7rem' }}>Color: {item.color}</span>
                    </div>
                    <p style={{ fontWeight: 'bold', marginTop: '10px', color: 'var(--primary)', margin: 0 }}>${item.product.price.toFixed(2)}</p>
                  </div>

                  <div className='col-5 col-md-3 mt-3 mt-md-0'>
                    <div className='d-flex align-items-center justify-content-center border rounded-pill p-1' style={{ maxWidth: '120px', margin: '0 auto' }}>
                      <button
                        className='btn btn-sm btn-link text-dark text-decoration-none p-0'
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, -1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 'bold' }}>{item.quantity}</span>
                      <button
                        className='btn btn-sm btn-link text-dark text-decoration-none p-0'
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className='col-4 col-md-2 mt-3 mt-md-0 text-end'>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Subtotal</p>
                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className='col-3 col-md-1 mt-3 mt-md-0 text-end'>
                    <button
                      className='btn btn-outline-danger border-0 rounded-circle p-2'
                      onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                      title="Eliminar producto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className='text-center py-5 position-relative overflow-hidden' style={{ 
                borderRadius: '40px', 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {/* Decorative background icons */}
                <ShoppingCart className='position-absolute' size={200} style={{ opacity: 0.03, top: '-50px', left: '-50px', transform: 'rotate(-15deg)' }} />
                <ShoppingBag className='position-absolute' size={150} style={{ opacity: 0.03, bottom: '-30px', right: '-40px', transform: 'rotate(20deg)' }} />

                <div className='mb-4 d-inline-flex p-4 rounded-circle bg-white shadow-sm' style={{ color: 'var(--primary)', position: 'relative' }}>
                  <ShoppingCart size={50} strokeWidth={1.5} />
                  <div className='position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger p-2' style={{ width: '15px', height: '15px' }}></div>
                </div>
                
                <h2 className='font-archivo-black mb-3' style={{ fontSize: '2.5rem', color: 'var(--text-main)' }}>TU CARRITO <span className='text-primary'>DESCANSA.</span></h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '450px', margin: '0 auto 35px', lineHeight: '1.6' }}>
                  Parece que aún no has encontrado tu prenda ideal. <br /> ¡Nuestra nueva colección te está esperando!
                </p>
                
                <Link to="/gallery" className='premium-button premium-button-primary text-decoration-none px-5 py-3 d-flex align-items-center gap-3' style={{ borderRadius: '50px', fontSize: '1.1rem', boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)' }}>
                  Explorar Colección <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="col-lg-4">
          <div className='premium-card glass' style={{ padding: '30px', position: 'sticky', top: '20px' }}>
            <h4 style={{ marginBottom: '25px', fontSize: '1.5rem' }}>Resumen del Pedido</h4>

            <div className='d-flex justify-content-between mb-3'>
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span style={{ fontWeight: '600' }}>${subtotal.toFixed(2)}</span>
            </div>

            <div className='d-flex justify-content-between mb-3'>
              <span style={{ color: 'var(--text-muted)' }}>Envío Estimado</span>
              <span style={{ fontWeight: '600' }}>
                {shipping > 0 ? `$${shipping.toFixed(2)}` : 'Gratis'}
              </span>
            </div>

            <div className='d-flex justify-content-between mb-3' style={{ fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Impuestos</span>
              <span style={{ fontWeight: '600' }}>Calculados al pagar</span>
            </div>

            <hr style={{ margin: '20px 0', borderColor: 'var(--border-color)', opacity: 0.5 }} />

            <div className='d-flex justify-content-between mb-4'>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Total Final</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                ${total.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              className={`premium-button premium-button-primary w-100 text-decoration-none text-center ${cartItems.length === 0 ? 'disabled' : ''}`}
              style={{ padding: '15px', fontSize: '1.1rem', pointerEvents: cartItems.length === 0 ? 'none' : 'auto', opacity: cartItems.length === 0 ? 0.5 : 1 }}
            >
              Continuar al Pago
            </Link>

            <div className='mt-4 p-3 rounded-3' style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', fontSize: '0.85rem' }}>
              <p style={{ margin: 0, color: 'var(--primary)', fontWeight: '600' }}>
                ✨ Envío gratis en pedidos superiores a $500
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" style={{ height: '20px', margin: '0 10px', opacity: 0.6 }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" style={{ height: '12px', margin: '0 10px', opacity: 0.6 }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{ height: '15px', margin: '0 10px', opacity: 0.6 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
