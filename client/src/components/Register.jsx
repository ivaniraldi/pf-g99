import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

export default function Register() {
  const { register } = useContext(GlobalContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div className='w-100' style={{ maxWidth: '400px' }}>
      <div className='text-center mb-4'>
        <h2 className='font-archivo-black' style={{ fontSize: '2rem', marginBottom: '10px' }}>Crea tu Cuenta</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Únete a la comunidad de ADLShirts hoy mismo</p>
      </div>

      <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
        <div className='position-relative'>
          <User className='position-absolute top-50 translate-middle-y ms-3 text-muted' size={18} />
          <input
            type="text"
            className='premium-input ps-5'
            placeholder="Nombre completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className='position-relative'>
          <Mail className='position-absolute top-50 translate-middle-y ms-3 text-muted' size={18} />
          <input
            type="email"
            className='premium-input ps-5'
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className='position-relative'>
          <Lock className='position-absolute top-50 translate-middle-y ms-3 text-muted' size={18} />
          <input
            type="password"
            className='premium-input ps-5'
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '5px' }}>
          Al registrarte, aceptas nuestros <a href='#' style={{ color: 'var(--primary)', fontWeight: '600' }}>Términos y Condiciones</a>.
        </p>

        <button type="submit" className='premium-button premium-button-primary w-100 d-flex align-items-center justify-content-center gap-2 py-3'>
          <UserPlus size={20} /> Registrarse Ahora
        </button>
      </form>
    </div>
  )
}
