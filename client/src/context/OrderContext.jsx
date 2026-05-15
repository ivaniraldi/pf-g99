import { createContext, useState, useContext, useCallback } from "react";
import { GlobalContext } from "./GlobalContext";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const { token, user } = useContext(GlobalContext);
    const [orders, setOrders] = useState([]);
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    const createOrder = async (orderData) => {
        if (!token) return { success: false, message: "Debes iniciar sesión para comprar" };
        
        try {
            const response = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: user?.id,
                    ...orderData
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setOrders(prev => [...prev, data]);
                return { success: true, data };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Order error:", error);
            return { success: false, message: "Error al procesar el pedido" };
        }
    }

    const getUserOrders = useCallback(async () => {
        if (!token) {
            setOrders([]);
            return;
        }
        try {
            const response = await fetch(`${API_URL}/orders`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }, [token, API_URL]);

    return (
        <OrderContext.Provider value={{ createOrder, getUserOrders, orders }}>
            {children}
        </OrderContext.Provider>
    )
}

export { OrderContext, OrderProvider }

