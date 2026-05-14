import { createContext, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const { token, user } = useContext(GlobalContext);
    const [orders, setOrders] = useState([]);
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

    const createOrder = async (orderData) => {
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
                return { success: true, data };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Order error:", error);
            return { success: false, message: "Error al procesar el pedido" };
        }
    }

    const getUserOrders = async () => {
        if (!token) return;
        try {
            const response = await fetch(`${API_URL}/orders`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    return (
        <OrderContext.Provider value={{ createOrder, getUserOrders, orders }}>
            {children}
        </OrderContext.Provider>
    )
}

export { OrderContext, OrderProvider }
