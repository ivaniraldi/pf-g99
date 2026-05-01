import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cartItems, updateQuantity } = useContext(CartContext);

  const changeQuantity = (productId, delta) => {
    updateQuantity(productId, delta);
  };
  console.log("Estos son los items en el carrito: ", JSON.stringify(cartItems)); // [{"product":{"id":"p_102","name":"Polo Azul Marino","description":"Polo clásico en color azul marino.","price":29.99,"brand":"Urban Shirt","category":{"id":"c_02","name":"Polo"},"availableSizes":["M","L"],"colors":["Azul marino"],"stock":45,"imageUrl":"https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","images":["/images/polo-azul.jpg"]},"quantity":1},{"product":{"id":"p_103","name":"Polo Azul Marino","description":"Polo clásico en color azul marino.","price":29.99,"brand":"Urban Shirt","category":{"id":"c_02","name":"Polo"},"availableSizes":["M","L"],"colors":["Azul marino"],"stock":45,"imageUrl":"https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","images":["/images/polo-azul.jpg"]},"quantity":2}]
  return (
    <div className='row'>
      <div className="col-md-8">
        <div className='d-flex flex-column gap-3'>
          {cartItems.length > 0 ? cartItems.map(item => (
            <div key={item.product.id} className='border p-3 d-flex justify-content-between align-items-center'>
              <div className='d-flex align-items-center gap-3'>
                <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                <div>
                  <h5>{item.product.name}</h5>
                  <p>${item.product.price.toFixed(2)} x {item.quantity}</p>
                </div>
              </div>
              <div>
                <p><strong>Total: ${(item.product.price * item.quantity).toFixed(2)}</strong></p>
                <div>
                  <button className='btn btn-sm btn-secondary me-2' onClick={() => changeQuantity(item.product.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button className='btn btn-sm btn-secondary ms-2' onClick={() => changeQuantity(item.product.id, 1)}>+</button>
                </div>
              </div>
            </div>
          )) : <p>Tu carrito está vacío.</p>}

        </div>
      </div>
      <div className="col-md-4"></div>
    </div>
  )
}
