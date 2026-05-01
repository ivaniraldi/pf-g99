import React from 'react'
import { CheckCircle, ShieldCheck, Truck, Star } from 'lucide-react';

export default function About() {
  const values = [
    { icon: <CheckCircle className='text-primary' size={24} />, title: "Alta Calidad", desc: "Materiales premium seleccionados para durar." },
    { icon: <ShieldCheck className='text-primary' size={24} />, title: "Pago Seguro", desc: "Tus transacciones están protegidas en todo momento." },
    { icon: <Truck className='text-primary' size={24} />, title: "Envío Rápido", desc: "Entregamos tu moda favorita en tiempo récord." },
  ];

  return (
    <section className='py-5'>
      <div className='row g-5 align-items-center mb-5'>
        <div className='col-lg-6'>
          <div className='d-flex align-items-center gap-2 mb-3'>
            <Star size={16} fill="var(--primary)" color="var(--primary)" />
            <span className='fw-bold text-primary text-uppercase' style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>Nuestra Esencia</span>
          </div>
          <h1 className='font-archivo-black' style={{ fontSize: '3rem', marginBottom: '25px', lineHeight: '1.1' }}>
            Elevando tu Estilo <br/><span className='text-primary'>Día tras Día.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            En ADLShirts, no solo vendemos ropa; creamos experiencias de moda que empoderan a las personas. Nuestra misión es fusionar la comodidad del algodón premium con diseños que marcan tendencia, todo bajo un compromiso inquebrantable con la sostenibilidad y la transparencia.
          </p>
          <div className='row g-4 mt-4'>
            {values.map((v, i) => (
              <div key={i} className='col-sm-4'>
                <div className='mb-2'>{v.icon}</div>
                <h6 className='fw-bold mb-1' style={{ fontSize: '0.9rem' }}>{v.title}</h6>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='col-lg-6 position-relative'>
          <div className='premium-card glass p-2 position-relative z-1' style={{ borderRadius: '40px', transform: 'rotate(-2deg)' }}>
            <img 
              className='w-100' 
              style={{ maxHeight: "500px", objectFit: "cover", borderRadius: '35px' }} 
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1170&auto=format&fit=crop" 
              alt="Fashion selection" 
            />
          </div>
          {/* Decorative elements */}
          <div className='position-absolute top-50 start-50 translate-middle w-100 h-100' style={{ 
            backgroundColor: 'var(--primary)', 
            opacity: 0.1, 
            borderRadius: '50%', 
            filter: 'blur(100px)',
            zIndex: 0 
          }}></div>
        </div>
      </div>
    </section>
  )
}
