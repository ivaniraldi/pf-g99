import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, 1); // Agrega 1 unidad del producto al carrito
  }
  return (
        <Card className='col-md-4'>
      <Card.Img variant="top" src={product.imageUrl} />
      <Card.Body>
        <Card.Title>{product.name} - {product.brand}</Card.Title>
        <Card.Text>
          <span className="badge bg-primary ms-2">{product.category.name}</span>
        </Card.Text>
        <Card.Text>
          <strong>${product.price.toFixed(2)}</strong>
        </Card.Text>
        <div className='d-flex justify-content-between align-items-center'>
        <Button variant="success" className='btn-sm' onClick={handleAddToCart}>
          Agregar al carrito
        </Button>
        <Button variant="primary">Ver detalles</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
