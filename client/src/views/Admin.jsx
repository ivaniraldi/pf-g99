import React, { useState } from 'react'
import { Package, Tag, Users, ShoppingBag } from 'lucide-react'
import AdminProducts from '../components/AdminProducts'
import AdminCategories from '../components/AdminCategories'
import AdminUsers from '../components/AdminUsers'
import AdminOrders from '../components/AdminOrders'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products');

  const menuItems = [
    { id: 'products', label: 'Productos', icon: <Package size={18} /> },
    { id: 'categories', label: 'Categorías', icon: <Tag size={18} /> },
    { id: 'users', label: 'Usuarios', icon: <Users size={18} /> },
    { id: 'orders', label: 'Pedidos', icon: <ShoppingBag size={18} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'products': return <AdminProducts />;
      case 'categories': return <AdminCategories />;
      case 'users': return <AdminUsers />;
      case 'orders': return <AdminOrders />;
      default: return <AdminProducts />;
    }
  };

  return (
    <div className=''>
      <div className='mb-2'>
        <h1 className='font-archivo-black' style={{ fontSize: '2.5rem', marginBottom: '0px' }}>Panel de Administración</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Gestiona el catálogo, usuarios y pedidos de tu tienda.</p>
      </div>

      <div className='row g-4'>
        {/* Navigation - Tabs on mobile, Sidebar on desktop */}
        <div className='col-lg-3'>
          <div className='premium-card glass border-0 shadow-sm' style={{ 
            padding: '20px', 
            position: 'sticky', 
            top: '100px', 
            borderRadius: '20px',
            transform: 'none',
            transition: 'none'
          }}>
            <div className='d-flex flex-row flex-lg-column gap-2 overflow-auto pb-2 pb-lg-0 custom-scrollbar'>
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className='btn border-0 d-flex align-items-center gap-3 px-4 py-3 text-start transition-all whitespace-nowrap'
                  style={{
                    borderRadius: '15px',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    backgroundColor: activeTab === item.id ? 'var(--primary)' : 'transparent',
                    color: activeTab === item.id ? 'white' : 'var(--text-muted)',
                    boxShadow: activeTab === item.id ? '0 8px 20px rgba(99, 102, 241, 0.3)' : 'none',
                    minWidth: 'fit-content',
                    flex: '0 0 auto'
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className='col-lg-9'>
          <div className='premium-card glass border-0 shadow-sm' style={{
            padding: '30px',
            borderRadius: '25px',
            minHeight: '500px',
            transform: 'none',
            transition: 'none'
          }}>
            <div className='mb-4 pb-3 border-bottom d-flex align-items-center justify-content-between'>
              <h3 className='m-0' style={{ fontWeight: '800', fontSize: '1.5rem' }}>
                {menuItems.find(i => i.id === activeTab)?.label}
              </h3>
              <div className='badge bg-light text-primary border px-3 py-2 rounded-pill' style={{ fontSize: '0.8rem' }}>
                Sistema Activo
              </div>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
