import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';
import { User, ShoppingBag, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

export default function Profile() {
  const { user } = useContext(GlobalContext);

  if (!user) return <div className='py-5 text-center'>Cargando perfil...</div>;

  return (
    <div className='py-5'>
      {/* Header Perfil */}
      <div className='premium-card glass mb-5' style={{ padding: '40px', borderBottom: '4px solid var(--primary)' }}>
        <div className='d-flex align-items-center gap-4'>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: 'var(--grad-primary)', 
            backgroundColor: 'var(--primary)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '2.5rem',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: 'var(--shadow-md)'
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>{user.name}</h2>
            <div className='d-flex align-items-center gap-2 mt-1'>
              <Mail size={14} style={{ color: 'var(--text-muted)' }} />
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>{user.email}</p>
            </div>
            <span className='badge rounded-pill mt-3' style={{ backgroundColor: 'var(--primary)', padding: '8px 15px' }}>
              Miembro Premium
            </span>
          </div>
        </div>
      </div>

      <div className='row g-4'>
        {/* Información Personal */}
        <div className="col-lg-4">
          <div className='premium-card glass h-100' style={{ padding: '30px' }}>
            <h4 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <User size={22} style={{ color: 'var(--primary)' }} /> Mi Información
            </h4>
            <div className='d-flex flex-column gap-3'>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 5px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={12} /> TELÉFONO
                </p>
                <p style={{ fontWeight: '600', margin: 0 }}>{user.phone || 'No especificado'}</p>
              </div>
              <hr style={{ margin: '5px 0', opacity: 0.1 }} />
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 5px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={12} /> DIRECCIÓN
                </p>
                <p style={{ fontWeight: '600', margin: 0 }}>
                  {user.address ? (
                    <>
                      {user.address.street}, {user.address.city}<br />
                      {user.address.postalCode}, {user.address.country}
                    </>
                  ) : (
                    'Dirección no especificada'
                  )}
                </p>
              </div>
              <button className='premium-button premium-button-outline w-100 mt-3'>
                Editar Datos
              </button>
            </div>
          </div>
        </div>

        {/* Historial de Órdenes */}
        <div className="col-lg-8">
          <div className='premium-card glass h-100' style={{ padding: '30px' }}>
            <h4 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShoppingBag size={22} style={{ color: 'var(--primary)' }} /> Historial de Órdenes
            </h4>
            
            {user.orders && user.orders.length > 0 ? (
              <div className='table-responsive'>
                <table className='table table-hover align-middle'>
                  <thead>
                    <tr style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <th>ORDEN ID</th>
                      <th>FECHA</th>
                      <th>TOTAL</th>
                      <th>ESTADO</th>
                      <th>ACCIÓN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.orders.map(order => (
                      <tr key={order.id} style={{ fontSize: '0.9rem' }}>
                        <td className='fw-bold'>#{order.id.slice(-6)}</td>
                        <td>30/04/2026</td>
                        <td className='fw-bold'>${order.total.toFixed(2)}</td>
                        <td>
                          <span className={`badge rounded-pill ${order.status === 'delivered' ? 'bg-success' : 'bg-warning'}`} style={{ padding: '6px 12px' }}>
                            {order.status === 'delivered' ? 'Entregada' : 'En proceso'}
                          </span>
                        </td>
                        <td>
                          <button className='btn btn-sm btn-light rounded-pill px-3 border d-flex align-items-center gap-1'>
                            Ver detalle <ChevronRight size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='text-center py-5'>
                <div className='mb-4 d-inline-block p-4 rounded-circle' style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', color: 'var(--text-muted)' }}>
                  <ShoppingBag size={48} strokeWidth={1.5} />
                </div>
                <p style={{ color: 'var(--text-muted)' }}>Aún no has realizado ninguna compra.</p>
                <button className='premium-button premium-button-primary mt-2'>Explorar Tienda</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
