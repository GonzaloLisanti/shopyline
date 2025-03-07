import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Products from "../components/Products";
import { ProductProvider } from "../context/ProductContext";
import Home from "../components/Home";

function IndexRouter() {
  return (
    <ProductProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </ProductProvider>
  );
}

export default IndexRouter;
