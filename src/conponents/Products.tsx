import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { CartProduct } from "../interfaces/CartProduct";

function Products() {
  const productContext = useContext(ProductContext);
  const cartContext = useContext(CartContext);

  if (!productContext) return <p>Error cargando productos...</p>;
  if (!cartContext) return <p>Error cargando carrito...</p>;

  const { filteredProducts, category } = productContext;
  const { addToCart } = cartContext;

  // Mapeo de categorías en inglés a español
  const categoryMap: { [key: string]: string } = {
    "men's clothing": "Ropa de hombre",
    "women's clothing": "Ropa de mujer",
    electronics: "Electrónica",
    jewelery: "Joyería",
  };

  const categoryName = categoryMap[category] || category;

  // Función para renderizar estrellas según el rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Estrellas llenas 🌟
    const halfStar = rating % 1 >= 0.5; // Media estrella ⭐½
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Estrellas vacías ✩

    return (
      <>
        {Array(fullStars).fill(
          <i className="bi bi-star-fill text-warning"></i>
        )}{" "}
        {/* Llenas */}
        {halfStar && <i className="bi bi-star-half text-warning"></i>}{" "}
        {/* Media */}
        {Array(emptyStars).fill(
          <i className="bi bi-star text-secondary"></i>
        )}{" "}
        {/* Vacías */}
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        {category === "" ||
        category.toLowerCase() === "all" ||
        category.toLowerCase() === "todas las categorías"
          ? "Productos"
          : `${categoryName}`}
      </h2>

      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div
                className="card-body rounded-3 d-flex flex-column"
                style={{ backgroundColor: "#c9faff" }}
              >
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text fw-bold">${product.price}</p>

                {/* Rating con Estrellas */}
                <div className="d-flex justify-content-center align-items-center">
                  <span className="text-muted me-2">
                    ({product.rating.rate})
                  </span>
                  {renderStars(product.rating.rate)}
                  <span className="ms-2">({product.rating.count})</span>
                </div>

                {/* Botón alineado abajo */}
                <button
                  className="btn rounded-3 bg-white mt-auto"
                  onClick={() => addToCart({ ...product } as CartProduct)}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
