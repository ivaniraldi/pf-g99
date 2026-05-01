import React, { useState } from 'react'
import { Pencil, Trash2, UserPlus, Shield, Search, Save, X } from 'lucide-react'
import { usersMock } from '../libs/dataMock'
import { Modal, Form } from 'react-bootstrap'

export default function AdminUsers() {
  const [users, setUsers] = useState(usersMock);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  const handleClose = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleShow = (user) => {
    setCurrentUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...formData } : u));
    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3'>
        <div className='position-relative flex-grow-1' style={{ maxWidth: '400px' }}>
          <Search className='position-absolute top-50 translate-middle-y ms-3 text-muted' size={18} />
          <input 
            type='text' 
            className='premium-input ps-5' 
            placeholder='Buscar usuarios...' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ borderRadius: '15px', backgroundColor: '#f8fafc' }}
          />
        </div>
        
        <button className='premium-button premium-button-primary d-flex align-items-center justify-content-center gap-2 px-4 py-2' style={{ borderRadius: '15px', fontSize: '0.9rem' }}>
          <UserPlus size={18} /> Invitar Usuario
        </button>
      </div>

      <div className='table-responsive custom-scrollbar'>
        <table className='table table-borderless align-middle' style={{ minWidth: '700px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <th className='py-3 ps-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>USUARIO</th>
              <th className='py-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>ROL</th>
              <th className='py-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>FECHA REGISTRO</th>
              <th className='py-3 text-end pe-3 text-muted fw-bold' style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u.id} className='admin-table-row' style={{ transition: '0.2s' }}>
                <td className='py-3 ps-3'>
                  <div className='d-flex align-items-center gap-3'>
                    <div className='grad-primary' style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '12px', 
                      color: 'white', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      boxShadow: '0 4px 10px rgba(99, 102, 241, 0.2)'
                    }}>
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontWeight: '700', color: 'var(--text-main)' }}>{u.name}</p>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className='py-3'>
                  <span className={`px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1`} style={{ 
                    backgroundColor: u.role === 'admin' ? 'rgba(99, 102, 241, 0.1)' : '#f1f5f9', 
                    color: u.role === 'admin' ? 'var(--primary)' : 'var(--text-muted)',
                    fontSize: '0.7rem',
                    fontWeight: '700'
                  }}>
                    {u.role === 'admin' && <Shield size={10} />}
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td className='py-3' style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  28/04/2026
                </td>
                <td className='py-3 text-end pe-3'>
                  <div className='d-flex justify-content-end gap-1'>
                    <button 
                      className='btn btn-sm btn-light border p-2 rounded-3 text-primary' 
                      title="Editar Rol"
                      onClick={() => handleShow(u)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      className='btn btn-sm btn-light border p-2 rounded-3 text-danger' 
                      title="Eliminar Usuario"
                      onClick={() => handleDelete(u.id)}
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

      {/* User Modal */}
      <Modal show={showModal} onHide={handleClose} centered className='premium-modal'>
        <Modal.Header className='border-0 pt-4 px-4'>
          <Modal.Title className='font-archivo-black' style={{ fontSize: '1.5rem' }}>
            Gestionar Usuario
          </Modal.Title>
          <button className='btn btn-light rounded-circle p-2' onClick={handleClose}>
            <X size={20} />
          </button>
        </Modal.Header>
        <Modal.Body className='p-4'>
          <Form onSubmit={handleSave}>
            <Form.Group className='mb-3'>
              <Form.Label className='fw-bold small text-muted'>NOMBRE COMPLETO</Form.Label>
              <Form.Control 
                type='text' 
                className='premium-input' 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label className='fw-bold small text-muted'>CORREO ELECTRÓNICO</Form.Label>
              <Form.Control 
                type='email' 
                className='premium-input' 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label className='fw-bold small text-muted'>ROL DEL SISTEMA</Form.Label>
              <Form.Select 
                className='premium-input' 
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                style={{ appearance: 'auto' }}
              >
                <option value="user">USER</option>
                <option value="admin">ADMIN</option>
              </Form.Select>
            </Form.Group>
            <div className='d-flex justify-content-end gap-2 mt-2'>
              <button type='button' className='btn btn-light px-4' onClick={handleClose} style={{ borderRadius: '12px' }}>
                Cancelar
              </button>
              <button type='submit' className='premium-button premium-button-primary px-4 d-flex align-items-center gap-2'>
                <Save size={18} /> Guardar Cambios
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
