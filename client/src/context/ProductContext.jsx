import { createContext, useEffect, useState } from "react";
import { productsMock } from './../libs/dataMock';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);


    const getProducts = async()=>{
        setProducts(productsMock);
    }

    useEffect(()=>{

        getProducts();
    },[])

  return (
    <ProductContext.Provider value={{getProducts, products}}>
        {children}
    </ProductContext.Provider>
    )
}

export { ProductContext, ProductProvider }