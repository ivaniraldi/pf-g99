import { createContext, useEffect, useState, useCallback } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {

    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProducts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/products`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    const getProductById = async (id) => {
        // Try to find in current list first
        const found = products.find(p => p.id === id || p.id === parseInt(id));
        if (found) return found;

        // If not found, fetch from API
        try {
            const response = await fetch(`${API_URL}/products/${id}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error(`Error fetching product ${id}:`, error);
        }
        return null;
    };

    useEffect(() => {
        getProducts();
    }, [getProducts])

    return (
        <ProductContext.Provider value={{ products, loading, getProducts, getProductById }}>
            {children}
        </ProductContext.Provider>
    )
}

export { ProductContext, ProductProvider }