import { createContext, useEffect, useState } from "react";
import { productsMock } from './../libs/dataMock';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    const getProducts = async () => {
        // --- MOCK ---
        setProducts(productsMock);

        // --- API ---
        /*
        try {
            const response = await fetch(`${API_URL}/products`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        */
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <ProductContext.Provider value={{ getProducts, products }}>
            {children}
        </ProductContext.Provider>
    )
}

export { ProductContext, ProductProvider }