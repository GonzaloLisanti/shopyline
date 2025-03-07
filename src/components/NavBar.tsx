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
    if (!localSearch.trim()) return;
    setSearchTerm(localSearch);
  };

  return (
    <nav
      className="navbar navbar-expand-lg py-3 shadow-lg sticky-top"
      style={{ backgroundColor: "#b0f8ff" }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand fs-2 fw-bold text-dark" href="/">
          Shopyline
        </a>

        {/* Enlaces de Inicio y Productos */}
        <div className="d-flex ms-5">
          <Link to={"/"} className="text-reset">
            <button className="btn me-2">Inicio</button>
          </Link>
          <Link to={"/products"} className="text-reset">
            <button className="btn">Productos</button>
          </Link>
        </div>

        <div className="d-lg-none ms-auto">
          <button
            className="btn border-black fs-5 position-relative"
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

        <button
          className="navbar-toggler ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          {location.pathname.includes("/products") && (
            <form
              className="d-flex justify-content-center mt-2 mt-lg-0 w-100"
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
                  style={{ flex: 1 }}
                />
                <button className="btn btn-outline-secondary" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          )}
          <div className="d-none d-lg-flex ms-lg-3">
            <button
              className="btn border-black fs-5 position-relative"
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
        </div>
      </div>

      <CartModal showCart={showCart} setShowCart={setShowCart} />
    </nav>
  );
}

export default NavBar;
