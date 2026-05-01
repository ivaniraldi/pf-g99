import React from 'react'

export default function HomeResume({ products }) {

    const first3Products = products.slice(0, 3);
  return (
    <section className=' my-4'>
        <h2>Nuestros Productos</h2>
        <div className='row'>
            {
            first3Products ?
            
            
            first3Products.map(product => (
                <div key={product.id} className='col-12 col-md-6 col-lg-4 mb-4'>
                    <div className='card h-100' style={{ cursor: 'pointer' }}>
                        <img src={product.imageUrl} className='card-img-top' alt={product.name} />
                        <div className='card-body d-flex flex-column'>
                            <h5 className='card-title'>{product.name}</h5>
                            <p className='card-text mt-auto'>${product.price}</p>
                        </div> 
                    </div>
                </div>
            )) : <p>Cargando productos...</p>}
        </div>
    </section>
  )
}
