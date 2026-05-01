import React, { useState } from 'react'
import Login from './../components/Login';
import Register from './../components/Register';

export default function Auth() {

  const [isLogin, setIsLogin] = useState(true)

  return (
    <>
    <div className='m-auto'>

      {isLogin ? <Login /> : <Register />}
    <button className='btn btn-link' onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
    </button>
    </div>
    </>
  )
}
