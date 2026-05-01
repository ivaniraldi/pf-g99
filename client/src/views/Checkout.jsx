import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { useNavigate, Link } from 'react-router-dom'
import { PartyPopper, ShieldCheck, ShoppingBag } from 'lucide-react'

export default function Checkout() {
  const { cartItems, totalItemsPrice, shippingPrice, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);

  const total = totalPrice;

  const handleOrder = (e) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (isOrdered) {
    return (
      <div className='py-5 text-center'>
        <div className='glass premium-card p-5 d-inline-block' style={{ maxWidth: '600px' }}>
          <div className='mb-4 d-inline-block p-4 rounded-circle' style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
            <PartyPopper size={80} strokeWidth={1.5} />
          </div>
          <h1 style={{ marginBottom: '20px' }}>¡Pedido Realizado!</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '30px' }}>
            Gracias por tu compra. Hemos enviado un correo de confirmación con los detalles de tu pedido.
          </p>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Cargando...</span>
          </div>
          <p className='mt-3' style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Redirigiendo al inicio...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className='py-5 text-center'>
        <div className='mb-4 d-inline-block p-4 rounded-circle' style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
          <ShoppingBag size={64} strokeWidth={1.5} />
        </div>
        <h2 className='mb-4'>No hay productos para pagar</h2>
        <Link to="/gallery" className='premium-button premium-button-primary text-decoration-none'>
          Ir a la Galería
        </Link>
      </div>
    );
  }

  return (
    <div className='py-5'>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Finalizar Compra</h2>
      
      <div className='row g-5'>
        {/* Formulario */}
        <div className='col-lg-7'>
          <form onSubmit={handleOrder}>
            {/* ... shipping info card ... */}
            {/* OMITTING PREVIOUS CARDS TO KEEP DIFF CLEAN, ASSUMING I SHOULD REPLACE ALL ICONS */}
            <div className='premium-card glass p-4 mb-4'>
              <h4 className='mb-4' style={{ fontSize: '1.25rem' }}>Información de Envío</h4>
              <div className='row g-3'>
                <div className='col-md-6'>
                  <label className='form-label fw-600' style={{ fontSize: '0.85rem' }}>Nombre</label>
                  <input type='text' className='premium-input' required placeholder='Ej: Juan' />
                </div>
                <div className='col-md-6'>
                  <label className='form-label fw-600' style={{ fontSize: '0.85rem' }}>Apellido</label>
                  <input type='text' className='premium-input' required placeholder='Ej: Pérez' />
                </div>
                <div className='col-12'>
                  <label className='form-label fw-600' style={{ fontSize: '0.85rem' }}>Correo Electrónico</label>
                  <input type='email' className='premium-input' required placeholder='juan@ejemplo.com' />
                </div>
                <div className='col-12'>
                  <label className='form-label fw-600' style={{ fontSize: '0.85rem' }}>Dirección de Entrega</label>
                  <input type='text' className='premium-input' required placeholder='Calle, Número, Depto' />
                </div>
                <div className='col-md-6'>
                  <label className='form-label fw-600' style={{ fontSize: '0.85rem' }}>Ciudad</label>
                  <input type='text' className='premium-input' required placeholder='Santiago' />
                </div>
                <div className='col-md-6'>
                  <label className='form-label fw-600' style={{ fontSize: '0.85rem' }}>Teléfono</label>
                  <input type='tel' className='premium-input' required placeholder='+56 9 1234 5678' />
                </div>
              </div>
            </div>

            <div className='premium-card glass p-4'>
              <h4 className='mb-4' style={{ fontSize: '1.25rem' }}>Método de Pago</h4>
              <div className='d-flex flex-column gap-3'>
                <label className='d-flex align-items-center gap-3 p-3 border rounded-3' style={{ cursor: 'pointer' }}>
                  <input type='radio' name='payment' defaultChecked style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                  <div className='d-flex align-items-center gap-2'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' alt='Visa' style={{ height: '12px' }} />
                    <img src='https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' alt='Mastercard' style={{ height: '18px' }} />
                    <span style={{ fontWeight: '600' }}>Tarjeta de Crédito / Débito</span>
                  </div>
                </label>
                <label className='d-flex align-items-center gap-3 p-3 border rounded-3' style={{ cursor: 'pointer', opacity: 0.6 }}>
                  <input type='radio' name='payment' style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} disabled />
                  <div className='d-flex align-items-center gap-2'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' alt='PayPal' style={{ height: '18px' }} />
                    <span style={{ fontWeight: '600' }}>PayPal (Próximamente)</span>
                  </div>
                </label>
              </div>
            </div>

            <button type='submit' className='premium-button premium-button-primary w-100 mt-4' style={{ padding: '18px', fontSize: '1.1rem' }}>
              Confirmar y Pagar ${total.toFixed(2)}
            </button>
          </form>
        </div>

        {/* Resumen */}
        <div className='col-lg-5'>
          <div className='premium-card glass p-4' style={{ position: 'sticky', top: '100px' }}>
            <h4 className='mb-4' style={{ fontSize: '1.25rem' }}>Resumen del Pedido</h4>
            <div className='d-flex flex-column gap-3 mb-4' style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
              {cartItems.map(item => (
                <div key={item.product.id} className='d-flex align-items-center gap-3'>
                  <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                  <div style={{ flexGrow: 1 }}>
                    <p style={{ margin: 0, fontWeight: '600', fontSize: '0.9rem' }}>{item.product.name}</p>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cant: {item.quantity}</p>
                  </div>
                  <span style={{ fontWeight: '700' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className='border-top pt-3'>
              <div className='d-flex justify-content-between mb-2'>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span style={{ fontWeight: '600' }}>${totalItemsPrice.toFixed(2)}</span>
              </div>
              <div className='d-flex justify-content-between mb-2'>
                <span style={{ color: 'var(--text-muted)' }}>Envío</span>
                <span style={{ fontWeight: '600' }}>{shippingPrice === 0 ? 'Gratis' : `$${shippingPrice.toFixed(2)}`}</span>
              </div>
              <div className='d-flex justify-content-between mt-3' style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                <span>Total</span>
                <span style={{ color: 'var(--primary)' }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className='mt-4 p-3 rounded-3 d-flex align-items-center justify-content-center gap-2' style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', fontSize: '0.85rem' }}>
              <ShieldCheck size={18} style={{ color: 'var(--primary)' }} />
              <p className='m-0' style={{ color: 'var(--primary)', fontWeight: '600' }}>
                Compra 100% segura y encriptada
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
