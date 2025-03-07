import { useEffect, useState } from "react";
import { Product } from "../interfaces/Products";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // Para manejar el estado de carga
  const [error, setError] = useState<string | null>(null);  // Para manejar errores

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError("Error al obtener productos");
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);  // Solo se ejecuta una vez al montar el componente

  return { products, loading, error };  // Devuelves los productos y los estados de carga/error
};
    