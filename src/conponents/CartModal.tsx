import { useCart } from "../hooks/useCart";

interface CartModalProps {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
}

function CartModal({ showCart, setShowCart }: CartModalProps) {
  const { cart, removeFromCart, clearCart, incrementItem, decrementItem } =
    useCart();

  if (!showCart) return null; // No renderizar si no está abierto

  return (
    <div
      className="bg-white border rounded shadow p-3"
      style={{
        position: window.innerWidth < 768 ? "fixed" : "absolute", // Fijo en móviles, absoluto en pantallas grandes
        width: window.innerWidth < 768 ? "100%" : "450px", // Ocupará todo el ancho en móviles
        maxWidth: "90vw", // Evita que se expanda demasiado
        right: window.innerWidth < 768 ? "auto" : 0, // Centrado en móviles, a la derecha en pantallas grandes
        left: window.innerWidth < 768 ? "50%" : "auto", // Centrarlo en móviles
        top: window.innerWidth < 768 ? "50%" : "100%", // Centrado en móviles, debajo de la navbar en escritorio
        transform: window.innerWidth < 768 ? "translate(-50%, -50%)" : "none", // Centrado en móviles
        zIndex: 1050,
        maxHeight: "90vh", // Máxima altura del modal
        overflow: "hidden", // Evita que se desborde
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h5 className="text-center">Carrito</h5>

      {cart.length === 0 ? (
        <p className="text-center">El carrito está vacío</p>
      ) : (
        <div
          style={{
            maxHeight: "340px", // Establece un límite al contenido
            overflowY: "auto", // Habilita el scroll vertical cuando sea necesario
          }}
        >
          <ul className="list-group">
            {cart.map((item) => {
              const subtotal = (item.price * item.quantity).toFixed(2);

              return (
                <li key={item.id} className="list-group-item">
                  <div className="d-flex align-items-center w-100">
                    {/* Imagen del producto */}
                    <div className="me-2 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid rounded-circle"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Contenedor principal (Nombre + Precio + Botones) */}
                    <div className="d-flex flex-column flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center w-100">
                        {/* Título del producto */}
                        <h3
                          className="h6 text-truncate"
                          style={{
                            maxWidth: "150px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.title}
                        </h3>

                        {/* Precio */}
                        <p
                          className="m-0 text-end"
                          style={{
                            minWidth: "70px",
                            maxWidth: "100px", // Ajuste para prevenir desbordamiento
                            fontSize: "0.9rem", // Reducimos el tamaño en móviles
                          }}
                        >
                          Unitario: ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Subtotal */}
                      <p className="m-0">Subtotal: ${subtotal}</p>

                      {/* Controles de cantidad + Botón eliminar */}
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <button
                            className="btn btn-sm btn-outline-secondary mx-1"
                            onClick={() => decrementItem(item.id)}
                          >
                            -
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary mx-1 px-3 p-2"
                            disabled
                          >
                            <span className="h6">{item.quantity}</span>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary mx-1"
                            onClick={() => incrementItem(item.id)}
                          >
                            +
                          </button>
                        </div>

                        {/* Botón de eliminar (No debe salirse del contenedor) */}
                        <button
                          className="btn btn-sm btn-outline-danger flex-shrink-0"
                          style={{
                            width: "30px", // Tamaño fijo
                            height: "30px", // Para evitar desbordes
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {cart.length > 0 && (
        <button className="btn btn-danger w-100 mt-3" onClick={clearCart}>
          Vaciar Carrito
        </button>
      )}

      <button
        className="btn btn-secondary w-100 mt-2"
        onClick={() => setShowCart(false)}
      >
        Cerrar
      </button>
    </div>
  );
}

export default CartModal;
