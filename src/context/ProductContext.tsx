import { createContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../interfaces/Products";

interface FilterContextType {
  products: Product[];
  filteredProducts: Product[];
  setPriceRange: (range: [number, number]) => void;
  setCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
  setSortOrder: (order: string) => void;
  category: string;
  searchTerm: string;
}

export const ProductContext = createContext<FilterContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [category, setCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("default");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Aplicar orden
    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortOrder === "az") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "za") {
      filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(filtered);
  }, [category, priceRange, searchTerm, sortOrder, products]);

  return (
    <ProductContext.Provider
      value={{ products, filteredProducts, setPriceRange, setCategory, category, searchTerm, setSearchTerm, setSortOrder }}
    >
      {children}
    </ProductContext.Provider>
  );
};
