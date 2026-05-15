import React, { useEffect, useState, useContext } from 'react'
import { Plus, Pencil, Trash2, Search, Filter, Save, X, Loader2 } from 'lucide-react'
import { GlobalContext } from '../context/GlobalContext'
import { Modal, Form } from 'react-bootstrap'

export default function AdminProducts() {
  const { token } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    description: '',
    categoryId: '',
    slug: '',
    material: ''
  });

  const handleClose = () => {
    setShowModal(false);
    setCurrentProduct(null);
    setFormData({ name: '', brand: '', price: 0, stock: 0, imageUrl: '', description: '', categoryId: '', slug: '', material: '' });
  };

  const handleShow = (product = null) => {
    if (product) {
      setCurrentProduct(product);
      setFormData({
        ...product,
        categoryId: product.category?.id || '',
        imageUrl: product.imageUrl || (product.images && product.images[0]) || ''
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = currentProduct ? 'PUT' : 'POST';
    const url = currentProduct ? `${API_URL}/products/${currentProduct.id}` : `${API_URL}/products`;

    // Ensure slug is generated if missing
    const payload = {
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        images: [formData.imageUrl]
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        await fetchProducts();
        handleClose();
      } else {
        const err = await response.json();
        alert(`Error: ${err.message}`);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        const response = await fetch(`${API_URL}/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          setProducts(products.filter(p => p.id !== id));
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };


  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3'>
        <div className='d-flex align-items-center gap-3 flex-grow-1' style={{ maxWidth: '400px' }}>
          <div className='position-relative flex-grow-1'>
            <Search className='position-absolute top-50 translate-middle-y ms-3 text-muted' size={18} />
            <input 
              type='text' 
              className='premium-input ps-5' 
              placeholder='Buscar productos...' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: '15px', backgroundColor: '#f8fafc' }}
            />
          </div>
          <button className='btn btn-light rounded-circle p-2 border shadow-sm'>
            <Filter size={18} />
          </button>
        </div>
        
        <button 
          className='premium-button premium-button-primary d-flex align-items-center justify-content-center gap-2 px-4 py-2' 
          style={{ borderRadius: '15px', fontSize: '0.9rem' }}
          onClick={() => handleShow()}
        >
          <Plus size={18} /> Nuevo Producto
        </button>
      </div>

      <div className='table-responsive custom-scrollbar'>
        <table className='table table-borderless align-middle'>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <th className='py-3 ps-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px', width: '40%' }}>PRODUCTO</th>
              <th className='py-3 text-muted fw-bold text-center' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>CATEGORÍA</th>
              <th className='py-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>PRECIO</th>
              <th className='py-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>STOCK</th>
              <th className='py-3 text-end pe-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(p => (
              <tr key={p.id} className='admin-table-row' style={{ transition: '0.2s' }}>
                <td className='py-3 ps-3'>
                  <div className='d-flex align-items-center gap-3'>
                    <div className='position-relative flex-shrink-0'>
                      <img src={p.imageUrl} alt={p.name} style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }} />
                    </div>
                    <div className='text-truncate' style={{ maxWidth: '200px' }}>
                      <p className='text-truncate' style={{ margin: 0, fontWeight: '700', color: 'var(--text-main)' }}>{p.name}</p>
                      <p className='text-truncate' style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.brand}</p>
                    </div>
                  </div>
                </td>
                <td className='py-3 text-center'>
                  <span className='px-2 py-1 rounded-pill' style={{ backgroundColor: 'rgba(99, 102, 241, 0.08)', color: 'var(--primary)', fontSize: '0.7rem', fontWeight: '700' }}>
                    {p.category.name}
                  </span>
                </td>
                <td className='py-3 fw-bold' style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>${Number(p.price).toFixed(2)}</td>
                <td className='py-3'>
                  <div className='d-flex align-items-center gap-2'>
                    <div className='d-none d-md-block' style={{ width: '35px', height: '5px', backgroundColor: '#eee', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.min(p.stock, 100)}%`, height: '100%', backgroundColor: p.stock < 50 ? 'var(--accent)' : 'var(--primary)' }}></div>
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: p.stock < 50 ? 'var(--accent)' : 'var(--text-muted)' }}>{p.stock}</span>
                  </div>
                </td>
                <td className='py-3 text-end pe-3'>
                  <div className='d-flex justify-content-end gap-1'>
                    <button 
                      className='btn btn-sm btn-light border p-2 rounded-3 text-primary' 
                      title="Editar"
                      onClick={() => handleShow(p)}
                    >
                      <Pencil size={15} />
                    </button>
                    <button 
                      className='btn btn-sm btn-light border p-2 rounded-3 text-danger' 
                      title="Eliminar"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      <Modal show={showModal} onHide={handleClose} centered size="lg" className='premium-modal'>
        <Modal.Header className='border-0 pt-4 px-4'>
          <Modal.Title className='font-archivo-black' style={{ fontSize: '1.5rem' }}>
            {currentProduct ? 'Editar Producto' : 'Nuevo Producto'}
          </Modal.Title>
          <button className='btn btn-light rounded-circle p-2' onClick={handleClose}>
            <X size={20} />
          </button>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <Form onSubmit={handleSave}>
            <div className='row g-3'>
              <div className='col-md-6'>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small text-muted'>NOMBRE DEL PRODUCTO</Form.Label>
                  <Form.Control 
                    type='text' 
                    className='premium-input' 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder='Ej: Camiseta Básica Algodón'
                  />
                </Form.Group>
              </div>
              <div className='col-md-6'>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small text-muted'>SLUG (URL)</Form.Label>
                  <Form.Control 
                    type='text' 
                    className='premium-input' 
                    required 
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder='ej-camiseta-basica'
                  />
                </Form.Group>
              </div>
              <div className='col-md-6'>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small text-muted'>MARCA</Form.Label>
                  <Form.Control 
                    type='text' 
                    className='premium-input' 
                    required 
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder='Ej: ADL'
                  />
                </Form.Group>
              </div>
              <div className='col-md-6'>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small text-muted'>CATEGORÍA</Form.Label>
                  <Form.Select 
                    className='premium-input' 
                    required 
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    style={{ appearance: 'auto' }}
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className='col-md-4'>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small text-muted'>PRECIO ($)</Form.Label>
                  <Form.Control 
                    type='number' 
                    step='0.01'
                    className='premium-input' 
                    required 
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </Form.Group>
              </div>
              <div className='col-md-4'>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small text-muted'>STOCK</Form.Label>
                  <Form.Control 
                    type='number' 
                    className='premium-input' 
                    required 
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </Form.Group>
              </div>
              <div className='col-md-4'>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small text-muted'>MATERIAL</Form.Label>
                  <Form.Control 
                    type='text' 
                    className='premium-input' 
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder='Ej: Algodón'
                  />
                </Form.Group>
              </div>
              <div className='col-12'>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small text-muted'>URL DE LA IMAGEN</Form.Label>
                  <Form.Control 
                    type='text' 
                    className='premium-input' 
                    required 
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder='https://images.unsplash.com/...'
                  />
                </Form.Group>
              </div>
              <div className='col-12'>
                <Form.Group className='mb-3'>
                  <Form.Label className='fw-bold small text-muted'>DESCRIPCIÓN</Form.Label>
                  <Form.Control 
                    as='textarea' 
                    rows={3}
                    className='premium-input' 
                    required 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder='Detalles del producto...'
                  />
                </Form.Group>
              </div>
            </div>

            <div className='d-flex justify-content-end gap-2 mt-4'>
              <button type='button' className='btn btn-light px-4' onClick={handleClose} style={{ borderRadius: '12px' }}>
                Cancelar
              </button>
              <button type='submit' className='premium-button premium-button-primary px-4 d-flex align-items-center gap-2'>
                <Save size={18} /> {currentProduct ? 'Guardar Cambios' : 'Crear Producto'}
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
