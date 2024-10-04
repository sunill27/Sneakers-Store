import { useEffect } from "react";
import Card from "../../globals/components/card/Card";
import Footer from "../../globals/components/footer/Footer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Hero from "./Hero";
import { fetchProducts } from "../../store/productSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { product, status } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  console.log(fetchProducts());
  return (
    <>
      <Hero />
      <div>
        <div className="flex items-center justify-center w-full">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Top Products
          </h1>
        </div>

        <div className="w-full">
          <section className="container w-full mx-auto p-0 md:py-2">
            <section className="p-2 md:p-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4 items-start justify-center">
              {product.length > 0 &&
                product.map((pd) => {
                  return <Card key={pd.id} data={pd} />;
                })}
            </section>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
