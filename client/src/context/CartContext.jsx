import { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity) => {
        const existingItem = cartItems.find(item => item.product.id === product.id);
        if (existingItem) {
            setCartItems(cartItems.map(item => 
                item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            ));
        }
        else {
            setCartItems([...cartItems, { product, quantity }]);
        }
        console.log("Carrito actualizado: ", cartItems);
    }

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.product.id !== productId));
    }

    const clearCart = () => {
        setCartItems([]);
    }


    const updateQuantity = (productId, delta) => { 
        setCartItems(cartItems.map(item =>
            item.product.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };