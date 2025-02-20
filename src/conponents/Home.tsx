import FilterBar from "./FilterBar";
import Products from "./Products";

function Home() {
  return (
    <div className="mt-5 text-center">
       <FilterBar />
      <Products/>
    </div>
  );
}

export default Home;
