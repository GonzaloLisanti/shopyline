import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

function FilterBar() {
  const context = useContext(ProductContext);
  const [minPrice, setMinPrice] = useState<number>(0);

  if (!context) return null;

  const { setPriceRange, setCategory, setSortOrder } = context;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = parseInt(e.target.value);
    setMinPrice(newMinPrice);
    setPriceRange([newMinPrice, Infinity]);
  };

  return (
    <div
      className="container mt-2 d-flex flex-wrap justify-content-between align-items-center gap-2 w-100 fw-bold"
      style={{ maxWidth: "900px", margin: "auto" }}
    >
      <span className="w-100 text-center text-md-start">Filtrar por:</span>

      {/* Filtro por Categoría */}
      <select
        className="form-select text-dark border-dark rounded-pill py-1 px-2 flex-grow-1"
        style={{
          backgroundColor: "#ebfdff",
          minWidth: "120px",
          maxWidth: "200px",
        }}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Todas las categorías</option>
        <option value="men's clothing">Ropa de hombre</option>
        <option value="women's clothing">Ropa de mujer</option>
        <option value="electronics">Electrónica</option>
        <option value="jewelery">Joyería</option>
      </select>

      {/* Filtro por Precio */}
      <div
        className="d-flex flex-column text-center"
        style={{ maxWidth: "200px" }}
      >
        <label className="fw-bold" style={{ fontSize: "0.9rem" }}>
          Desde: ${minPrice}
        </label>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          className="form-range mt-1"
          style={{ maxWidth: "100%" }}
          value={minPrice}
          onChange={handlePriceChange}
        />
      </div>

      {/* Ordenar por */}
      <select
        className="form-select text-dark border-dark rounded-pill py-1 px-2 flex-grow-1"
        style={{
          backgroundColor: "#ebfdff",
          minWidth: "120px",
          maxWidth: "200px",
        }}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="default">Ordenar</option>
        <option value="asc">Menor precio</option>
        <option value="desc">Mayor precio</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </div>
  );
}

export default FilterBar;
