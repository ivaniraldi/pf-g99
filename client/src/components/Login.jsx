import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const { login } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className='w-100' style={{ maxWidth: '400px' }}>
      <div className='text-center mb-4'>
        <h2 className='font-archivo-black' style={{ fontSize: '2rem', marginBottom: '10px' }}>Bienvenido</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ingresa tus credenciales para continuar</p>
      </div>

      <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
        <div className='position-relative'>
          <Mail className='position-absolute top-50 translate-middle-y ms-3 text-muted' size={18} />
          <input
            type="email"
            className='premium-input ps-5'
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='position-relative'>
          <Lock className='position-absolute top-50 translate-middle-y ms-3 text-muted' size={18} />
          <input
            type="password"
            className='premium-input ps-5'
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className='d-flex justify-content-between align-items-center mb-2 px-1'>
          <div className='d-flex align-items-center gap-2'>
            <input type='checkbox' id='remember' style={{ cursor: 'pointer' }} />
            <label htmlFor='remember' style={{ fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer' }}>Recordarme</label>
          </div>
          <a href='#' style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>¿Olvidaste tu clave?</a>
        </div>

        <button type="submit" className='premium-button premium-button-primary w-100 d-flex align-items-center justify-content-center gap-2 py-3'>
          <LogIn size={20} /> Iniciar Sesión
        </button>
      </form>
    </div>
  )
}
