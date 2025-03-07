import React from "react";
import Carrusel from "./Carrusel";
import FeaturedProducts from "./FeaturedProducts";

const Home: React.FC = () => {
  return (
    <div>
      <div className="text-center display-4 mt-3">Shopyline</div>
      <Carrusel />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
