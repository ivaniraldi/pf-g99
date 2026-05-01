import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext';

export default function Profile() {
  const { user } = useContext(GlobalContext);

  console.log("este es el usuario en profile: ", user);
  return (
    <div className='row border p-3'>
      <div className="col-md-4 border p-2">
         <h4>Mis ordenes</h4>
         {user && user.orders ? 
         <div className='d-flex flex-column gap-2'>
          {user.orders.map(order => (
            <div key={order.id} className='border p-2'>
              <p>Orden ID: {order.id}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <p>Estado: {order.status == 'delivered' ? 'Entregada' : 'En proceso'}</p>
            </div>
          ))}
         </div>
          :
          <p>No tienes ordenes aún.</p>}
         
      </div>
      <div className="col-md-8 d-flex flex-column border p-3">
        <div className='border p-2'>
         <h4>Mi info
         </h4>
         <div>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Teléfono:</strong> {user.phone}</p>
          <p><strong>Dirección:</strong> {user.address.street}, {user.address.city}, {user.address.postalCode}, {user.address.country}</p>
         </div>
        </div>
        <div className='border p-2'>
          <h4>Estado de mi última orden: </h4>
          {user && user.orders && user.orders.length > 0 ? (
            <p> Orden número: {user.orders[0].id} <br />
            <span className="badge bg-primary">{user.orders[user.orders.length - 1].status == 'delivered' ? 'Entregada' : 'En proceso'}</span></p>
          ) : (
            <p>No tienes ordenes aún.</p>
          )}
        </div>
      </div>
    </div>
  )
}
