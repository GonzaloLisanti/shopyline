import { Route, Routes } from "react-router-dom";
import NavBar from "../conponents/NavBar";
import Home from "../conponents/Home";
import { ProductProvider } from "../context/ProductContext";

function IndexRouter() {
  return (
    <ProductProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ProductProvider>
  );
}

export default IndexRouter;
