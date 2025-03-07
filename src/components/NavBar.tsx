import { useContext, useState } from "react";
import { useCart } from "../hooks/useCart";
import { ProductContext } from "../context/ProductContext";
import CartModal from "./CartModal";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const productContext = useContext(ProductContext);
  const [localSearch, setLocalSearch] = useState(""); // Estado local del input
  const location = useLocation();

  if (!productContext) return null;
  const { setSearchTerm } = productContext;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchTerm(localSearch);
  };

  return (
    <nav
      className="navbar navbar-expand-lg py-3 shadow-lg sticky-top"
      style={{ backgroundColor: "#b0f8ff" }}
    >
      <div className="container gap-2">
        {/* Logo y enlaces de navegación */}
        <div className="d-flex align-items-center">
          <Link className="navbar-brand fs-2 fw-bold text-dark me-4" to={"/"}>
            Shopyline
          </Link>

          {/* Enlaces de navegación */}
          <ul className="navbar-nav d-none d-lg-flex">
            <li className="nav-item">
              <Link to="/" className="nav-link fw-semibold">
                Inicio
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/products" className="nav-link fw-semibold">
                Productos
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          {/* Botón del carrito */}
          <button
            className="btn border-black fs-5 position-relative me-3 d-lg-none shadow"
            onClick={() => setShowCart(!showCart)}
          >
            <i className="bi bi-cart"></i>
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </button>
          {/* Botón del carrito y botón de hamburguesa */}
          <div className="d-flex align-items-center ms-auto justify-content-center">
            {/* Botón de hamburguesa para móviles */}
            <button
              className="navbar-toggler shadow border-black"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        {/* Contenido del navbar (colapsable) */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Enlaces de navegación para móviles */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-lg-none">
            <li className="nav-item">
              <Link to="/" className="nav-link fw-semibold">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link fw-semibold">
                Productos
              </Link>
            </li>
          </ul>

          {/* Barra de búsqueda en productos */}
          {location.pathname.includes("/products") && (
            <form
              className="d-flex my-2 my-lg-0 w-100 justify-content-center"
              onSubmit={handleSearch}
            >
              <div
                className="input-group"
                style={{ maxWidth: "500px", width: "100%" }}
              >
                <input
                  className="form-control form-control-sm"
                  type="search"
                  placeholder="Buscar productos..."
                  aria-label="Search"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button className="btn btn-outline-secondary" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          )}
        </div>
        {/* Botón del carrito */}
        <button
            className="btn border-black fs-5 position-relative me-3 d-lg-flex d-none shadow"
            onClick={() => setShowCart(!showCart)}
          >
            <i className="bi bi-cart"></i>
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </button>
      </div>

      {/* Modal del carrito */}
      <CartModal showCart={showCart} setShowCart={setShowCart} />
    </nav>
  );
}

export default NavBar;
