import React, { useContext } from 'react'
import ProductCard from './ProductCard';
import { CartContext } from '../context/CartContext';

export default function ProductGrid({ products }) {

  let filteredProducts = products; // Aquí puedes aplicar tus filtros a los productos
  return (
    <div className='row'>
      <div className='col-md-3 border p-3'>
          <h4>Filtros</h4>
          <div className='border my-2 p-2'>
          <p>Precio</p>
          <input type="range" />
          </div>
          <div className='border my-2 p-2'>
          <p>Categoria</p>
          <div className='d-flex flex-wrap gap-2' >
            <button className='btn btn-outline-secondary'>Sport</button>
            <button className='btn btn-outline-secondary'>Formal</button>
            <button className='btn btn-outline-secondary'>Casual</button>
          </div>
          </div>
          <div className='border my-2 p-2'>
          <p>Color</p>
          <select className='form-control' name="color" id="">
            <option value="rojo">Rojo</option>
            <option value="azul">Azul</option>
            <option value="verde">Verde</option>
          </select>
          </div>
        </div>
      
      <div className='col-md-9 border p-3 row gap-2 '>
        {filteredProducts? filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        )): <p>No products found.</p>}
      </div>
    </div>
  )
}
