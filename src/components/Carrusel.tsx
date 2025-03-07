import { useState } from "react";


const Carrusel: React.FC = () => {
    const imagenes = [
        "/images/RopaYpiso.jpg",
        "/images/Camisas.jpg",
        "/images/RopaMujer.jpg",
        "/images/Monitores.jpg",
        "/images/Joyeria.jpg",
      ];
    
      // Estado para controlar la imagen activa
      const [activeIndex, setActiveIndex] = useState(0);
    
      // Función para cambiar el índice activo
      const handleSelect = (index: number) => {
        setActiveIndex(index);
      };
    
      return (
        <div className="container my-4">
          <div
            id="carouselExampleIndicators"
            className="carousel slide carousel-fade mx-auto shadow carousel-dark"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            style={{
              maxWidth: "90vw",
              maxHeight: "80vh",
              border: "1px solid lightskyblue",
              borderRadius: "10px",
            }}
          >
            {/* Indicadores */}
            <div className="carousel-indicators">
              {imagenes.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  className={index === activeIndex ? "active" : ""}
                  aria-current={index === activeIndex ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => handleSelect(index)} // Cambio al hacer clic en un indicador
                ></button>
              ))}
            </div>
    
            {/* Imágenes del carrusel */}
            <div className="carousel-inner">
              {imagenes.map((src, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === activeIndex ? "active" : ""}`}
                >
                  <img
                    src={src}
                    className="d-block w-100"
                    alt={`Slide ${index + 1}`}
                    style={{
                      aspectRatio: "16 / 6",
                      objectFit: "cover",
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              ))}
            </div>
    
            {/* Botones de navegación */}
            <button
              className="carousel-control-prev text-dark"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
              onClick={() => handleSelect((activeIndex - 1 + imagenes.length) % imagenes.length)}
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
              onClick={() => handleSelect((activeIndex + 1) % imagenes.length)}
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      );
}

export default Carrusel;