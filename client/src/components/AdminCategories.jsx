import React, { useState } from 'react'
import { Plus, Pencil, Trash2, Search, Save, X } from 'lucide-react'
import { categories as mockCategories } from '../libs/dataMock'
import { Modal, Form } from 'react-bootstrap'

export default function AdminCategories() {
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleClose = () => {
    setShowModal(false);
    setCurrentCategory(null);
    setFormData({ name: '', description: '' });
  };

  const handleShow = (cat = null) => {
    if (cat) {
      setCurrentCategory(cat);
      setFormData({ name: cat.name, description: cat.description });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (currentCategory) {
      setCategories(categories.map(c => c.id === currentCategory.id ? { ...formData, id: currentCategory.id } : c));
    } else {
      setCategories([...categories, { ...formData, id: categories.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3'>
        <div className='position-relative flex-grow-1' style={{ maxWidth: '400px' }}>
          <Search className='position-absolute top-50 translate-middle-y ms-3 text-muted' size={18} />
          <input 
            type='text' 
            className='premium-input ps-5' 
            placeholder='Buscar categorías...' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: '15px', backgroundColor: '#f8fafc' }}
          />
        </div>
        
        <button 
          className='premium-button premium-button-primary d-flex align-items-center justify-content-center gap-2 px-4 py-2' 
          style={{ borderRadius: '15px', fontSize: '0.9rem' }}
          onClick={() => handleShow()}
        >
          <Plus size={18} /> Nueva Categoría
        </button>
      </div>

      <div className='table-responsive custom-scrollbar'>
        <table className='table table-borderless align-middle' style={{ minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <th className='py-3 ps-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>ID</th>
              <th className='py-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>NOMBRE</th>
              <th className='py-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>DESCRIPCIÓN</th>
              <th className='py-3 text-end pe-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map(cat => (
              <tr key={cat.id} className='admin-table-row' style={{ transition: '0.2s' }}>
                <td className='py-3 ps-3 text-muted' style={{ fontSize: '0.8rem' }}>{cat.id}</td>
                <td className='py-3 fw-bold' style={{ color: 'var(--text-main)' }}>{cat.name}</td>
                <td className='py-3' style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{cat.description}</td>
                <td className='py-3 text-end pe-3'>
                  <div className='d-flex justify-content-end gap-1'>
                    <button 
                      className='btn btn-sm btn-light border p-2 rounded-3 text-primary' 
                      title="Editar"
                      onClick={() => handleShow(cat)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      className='btn btn-sm btn-light border p-2 rounded-3 text-danger' 
                      title="Eliminar"
                      onClick={() => handleDelete(cat.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Category Modal */}
      <Modal show={showModal} onHide={handleClose} centered className='premium-modal'>
        <Modal.Header className='border-0 pt-4 px-4'>
          <Modal.Title className='font-archivo-black' style={{ fontSize: '1.5rem' }}>
            {currentCategory ? 'Editar Categoría' : 'Nueva Categoría'}
          </Modal.Title>
          <button className='btn btn-light rounded-circle p-2' onClick={handleClose}>
            <X size={20} />
          </button>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <Form onSubmit={handleSave}>
            <Form.Group className='mb-3'>
              <Form.Label className='fw-bold small text-muted'>NOMBRE DE LA CATEGORÍA</Form.Label>
              <Form.Control 
                type='text' 
                className='premium-input' 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder='Ej: Calzado'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='fw-bold small text-muted'>DESCRIPCIÓN</Form.Label>
              <Form.Control 
                as='textarea' 
                rows={3}
                className='premium-input' 
                required 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder='¿Qué incluye esta categoría?'
              />
            </Form.Group>
            <div className='d-flex justify-content-end gap-2 mt-4'>
              <button type='button' className='btn btn-light px-4' onClick={handleClose} style={{ borderRadius: '12px' }}>
                Cancelar
              </button>
              <button type='submit' className='premium-button premium-button-primary px-4 d-flex align-items-center gap-2'>
                <Save size={18} /> {currentCategory ? 'Guardar Cambios' : 'Crear Categoría'}
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
