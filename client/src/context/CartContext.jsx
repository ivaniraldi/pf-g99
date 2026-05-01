import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {

    // Inicializar desde localStorage si existe
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Guardar en localStorage cada vez que cambie cartItems
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const totalItemsPrice = cartItems.reduce((total, item) => total + item.quantity * (item.product.price || 0), 0);
    const shippingPrice = totalItemsPrice > 500 || totalItemsPrice === 0 ? 0 : 20;
    const totalPrice = totalItemsPrice + shippingPrice;

    const addToCart = (product, quantity, size = 'M', color = 'Blanco') => {
        const existingItemIndex = cartItems.findIndex(item => 
            item.product.id === product.id && 
            item.size === size && 
            item.color === color
        );

        if (existingItemIndex !== -1) {
            const updatedItems = [...cartItems];
            updatedItems[existingItemIndex].quantity += quantity;
            setCartItems(updatedItems);
        }
        else {
            setCartItems([...cartItems, { product, quantity, size, color }]);
        }
    }

    const removeFromCart = (productId, size, color) => {
        setCartItems(cartItems.filter(item => 
            !(item.product.id === productId && item.size === size && item.color === color)
        ));
    }

    const clearCart = () => {
        setCartItems([]);
    }


    const updateQuantity = (productId, size, color, delta) => { 
        setCartItems(cartItems.map(item =>
            (item.product.id === productId && item.size === size && item.color === color) 
            ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
            : item
        ));
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity, totalItemsPrice, shippingPrice, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };