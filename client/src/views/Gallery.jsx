import React, { useContext } from 'react'
import ProductGrid from './../components/ProductGrid';
import { ProductContext } from '../context/ProductContext';

export default function Gallery() {
  const { products } = useContext(ProductContext);
  console.log("estan llegando nuestros super productos a gallery: ",products);
  return (
    <div>
      <h2>Nuestros productos</h2>
      <p>Aquí puedes encontrar una variedad de productos de alta calidad. Explora nuestra galería para descubrir lo que tenemos para ofrecerte.</p>
      <ProductGrid products={products}/>

    </div>
  )
}
