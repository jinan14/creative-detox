import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    if (!user) {
      Promise.resolve().then(() => {
        if (cancelled) return;
        setItems([]);
        setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }

    api
      .get("/cart")
      .then(({ data }) => {
        if (!cancelled) setItems(data.items || []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  const addItem = async (artworkId) => {
    const { data } = await api.post("/cart/items", { artworkId });
    setItems(data.items || []);
  };

  const removeItem = async (artworkId) => {
    const { data } = await api.delete(`/cart/items/${artworkId}`);
    setItems(data.items || []);
  };

  const checkout = async () => {
    await api.post("/orders");
    await api.delete("/cart");
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{ items, loading, count: items.length, total, addItem, removeItem, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
