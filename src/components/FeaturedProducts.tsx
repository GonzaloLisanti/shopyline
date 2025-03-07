import { useProducts } from "../hooks/useProducts";
import { CartProduct } from "../interfaces/CartProduct";
import { Product } from "../interfaces/Products";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const FeaturedProducts: React.FC = () => {
  const { products, loading, error } = useProducts(); // Usamos el hook
  const cartContext = useContext(CartContext);
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!cartContext) return <p>Error cargando carrito...</p>;

  const { addToCart } = cartContext;

  // Ordena los productos por rating en orden descendente
  const sortedProducts = [...products].sort(
    (a, b) => b.rating.rate - a.rating.rate
  );

  // Filtra los primeros 4 productos con mejor rating
  const featuredProducts = sortedProducts.slice(0, 4);

  // Función para renderizar las estrellas del rating
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
    <div className="container my-3">
      <h2 className="text-center display-5 mb-4">Productos Destacados</h2>
      <div className="row">
        {featuredProducts.map((product: Product) => (
          <div className="col-md-3 mb-3" key={product.id}>
            <div className="card mb-4 shadow-sm h-100 d-flex flex-column">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.title}
                style={{ objectFit: "contain", height: "200px" }}
              />
              <div className="card-body d-flex flex-column justify-content-between"  style={{ backgroundColor: "#c9faff" }}>
                <div>
                  <h5 className="card-title">{product.title}</h5>
                </div>

                <div className="mt-auto">
                <div className="d-flex justify-content-center align-items-center">
                    <span className="text-muted fs-5 fw-bold">${product.price}</span>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="text-muted me-2">
                      ({product.rating.rate})
                    </span>
                    {renderStars(product.rating.rate)}
                    <span className="ms-2">({product.rating.count})</span>
                  </div>
                  <button
                    className="btn rounded-3 bg-white mt-2 border w-100"
                    onClick={() => addToCart({ ...product } as CartProduct)}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;