import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Eye, RefreshCcw, Download, Search, X, Package, Truck, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react'
import { GlobalContext } from '../context/GlobalContext'
import { Modal, Form } from 'react-bootstrap'

export default function AdminOrders() {
  const { token } = useContext(GlobalContext);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [API_URL, token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleClose = () => {
    setShowModal(false);
    setCurrentOrder(null);
  };

  const handleShow = async (order) => {
    try {
      const response = await fetch(`${API_URL}/orders/${order.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const fullOrder = await response.json();
        setCurrentOrder(fullOrder);
      } else {
        setCurrentOrder(order);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setCurrentOrder(order);
    }
    setShowModal(true);
  };


  const handleUpdateStatus = async (newStatus) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/orders/${currentOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        await fetchOrders();
        handleClose();
      }
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setLoading(false);
    }
  };


  const getStatusStyle = (status) => {
    switch (status) {
      case 'processing': return { bg: 'rgba(245, 158, 11, 0.1)', text: '#d97706' };
      case 'shipped': return { bg: 'rgba(59, 130, 246, 0.1)', text: '#2563eb' };
      case 'delivered': return { bg: 'rgba(34, 197, 94, 0.1)', text: '#16a34a' };
      case 'cancelled': return { bg: 'rgba(239, 68, 68, 0.1)', text: '#dc2626' };
      default: return { bg: '#f1f5f9', text: '#64748b' };
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'processing': return 'En Proceso';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const filteredOrders = orders.filter(o => 
    String(o.id).includes(searchTerm) ||
    String(o.userId || o.user_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3'>
        <div className='position-relative flex-grow-1' style={{ maxWidth: '400px' }}>
          <Search className='position-absolute top-50 translate-middle-y ms-3 text-muted' size={18} />
          <input 
            type='text' 
            className='premium-input ps-5' 
            placeholder='Buscar por ID de orden o usuario...' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: '15px', backgroundColor: '#f8fafc' }}
          />
        </div>
        
        <button className='premium-button premium-button-outline d-flex align-items-center justify-content-center gap-2 px-4 py-2' style={{ borderRadius: '15px', fontSize: '0.9rem' }}>
          <Download size={18} /> Exportar
        </button>
      </div>

      <div className='table-responsive custom-scrollbar'>
        <table className='table table-borderless align-middle'>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <th className='py-3 ps-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px', width: '20%' }}>ORDEN ID</th>
              <th className='py-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>CLIENTE</th>
              <th className='py-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>FECHA</th>
              <th className='py-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>TOTAL</th>
              <th className='py-3 text-muted fw-bold text-center' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>ESTADO</th>
              <th className='py-3 text-end pe-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {[...filteredOrders].reverse().map(o => {
              const style = getStatusStyle(o.status);
              return (
                <tr key={o.id} className='admin-table-row' style={{ transition: '0.2s' }}>
                  <td className='py-3 ps-3 fw-bold' style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>
                    #{String(o.id).padStart(5, '0')}
                  </td>
                  <td className='py-3 text-truncate' style={{ fontWeight: '600', maxWidth: '120px', fontSize: '0.85rem' }}>{o.userId || o.user_id}</td>
                  <td className='py-3' style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {new Date(o.placedAt || o.placed_at).toLocaleDateString()}
                  </td>
                  <td className='py-3 fw-bold' style={{ fontSize: '0.9rem' }}>${parseFloat(o.total).toFixed(2)}</td>

                  <td className='py-3 text-center'>
                    <span className='px-2 py-1 rounded-pill d-inline-block text-center' style={{ 
                      backgroundColor: style.bg, 
                      color: style.text,
                      fontSize: '0.65rem',
                      fontWeight: '700',
                      minWidth: '80px'
                    }}>
                      {getStatusLabel(o.status)}
                    </span>
                  </td>
                  <td className='py-3 text-end pe-3'>
                    <div className='d-flex justify-content-end gap-1'>
                      <button 
                        className='btn btn-sm btn-light border p-2 rounded-3 text-primary' 
                        title="Ver Detalle"
                        onClick={() => handleShow(o)}
                      >
                        <Eye size={15} />
                      </button>
                      <button 
                        className='btn btn-sm btn-light border p-2 rounded-3 text-secondary' 
                        title="Actualizar Estado"
                        onClick={() => handleShow(o)}
                      >
                        <RefreshCcw size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      <Modal show={showModal} onHide={handleClose} centered className='premium-modal'>
        <Modal.Header className='border-0 pt-4 px-4'>
          <Modal.Title className='font-archivo-black' style={{ fontSize: '1.5rem' }}>
            Detalle de la Orden
          </Modal.Title>
          <button className='btn btn-light rounded-circle p-2' onClick={handleClose}>
            <X size={20} />
          </button>
        </Modal.Header>
        <Modal.Body className='p-4'>
          {currentOrder && (
            <div>
              <div className='premium-card p-3 mb-4' style={{ 
                backgroundColor: '#f8fafc',
                transform: 'none',
                transition: 'none'
              }}>
                <div className='row g-3'>
                  <div className='col-6'>
                    <p className='small text-muted fw-bold mb-1'>ORDEN ID</p>
                    <p className='fw-bold text-primary'>#{String(currentOrder.id).padStart(5, '0')}</p>
                  </div>
                  <div className='col-6'>
                    <p className='small text-muted fw-bold mb-1'>FECHA</p>
                    <p className='fw-bold'>{new Date(currentOrder.placedAt || currentOrder.placed_at).toLocaleString()}</p>
                  </div>
                  <div className='col-6'>
                    <p className='small text-muted fw-bold mb-1'>CLIENTE ID</p>
                    <p className='fw-bold'>{currentOrder.userId || currentOrder.user_id}</p>
                  </div>
                  <div className='col-6'>
                    <p className='small text-muted fw-bold mb-1'>TOTAL PAGADO</p>
                    <p className='fw-bold text-success' style={{ fontSize: '1.2rem' }}>${parseFloat(currentOrder.total).toFixed(2)}</p>
                  </div>

                </div>
              </div>

              <div className='mb-4'>
                <h6 className='fw-bold mb-3 small text-muted'>PRODUCTOS</h6>
                <div className='d-flex flex-column gap-2'>
                  {currentOrder.items?.map((item, idx) => (
                    <div key={idx} className='d-flex justify-content-between align-items-center p-2 rounded-3 border-bottom'>
                      <div>
                        <p className='m-0 fw-bold' style={{ fontSize: '0.85rem' }}>{item.name}</p>
                        <p className='m-0 text-muted' style={{ fontSize: '0.75rem' }}>Cant: {item.quantity} | Talla: {item.size}</p>
                      </div>
                      <p className='m-0 fw-bold' style={{ fontSize: '0.85rem' }}>${parseFloat(item.price || item.unit_price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h6 className='fw-bold mb-3 small text-muted'>ESTADO DE ENVÍO</h6>

              <div className='d-grid gap-2'>
                {[
                  { id: 'processing', label: 'En Proceso', icon: <Package size={18} />, color: '#d97706' },
                  { id: 'shipped', label: 'Enviado', icon: <Truck size={18} />, color: '#2563eb' },
                  { id: 'delivered', label: 'Entregado', icon: <CheckCircle size={18} />, color: '#16a34a' },
                  { id: 'cancelled', label: 'Cancelado', icon: <AlertTriangle size={18} />, color: '#dc2626' }
                ].map(status => (
                  <button 
                    key={status.id}
                    className='btn btn-light border text-start p-3 d-flex align-items-center justify-content-between'
                    onClick={() => handleUpdateStatus(status.id)}
                    style={{ 
                      borderRadius: '12px', 
                      backgroundColor: currentOrder.status === status.id ? `${status.color}10` : 'transparent',
                      borderColor: currentOrder.status === status.id ? status.color : '#eee',
                      color: currentOrder.status === status.id ? status.color : 'inherit'
                    }}
                  >
                    <div className='d-flex align-items-center gap-3'>
                      {status.icon}
                      <span className='fw-bold'>{status.label}</span>
                    </div>
                    {currentOrder.status === status.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: status.color }}></div>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  )
}
