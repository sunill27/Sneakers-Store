import React from "react";
import { Product } from "../types/productTypes";
import { Link } from "react-router-dom";

interface CardProps {
  data: Product;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <>
      {/* <Link to={`/product/${data.id}`}>
        <section className="py-2 bg-purple-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer flex flex-col items-center">
          <img
            className="w-full h-60 object-cover mb-2"
            src={data?.imageUrl}
            // src="https://media.gq.com/photos/58a49dcc96e688570cf2ec47/16:9/w_3277,h_1844,c_limit/Air-Jordan-1-all-star-gotta-shine-03.jpg"
            alt="Air Jordan 1"
          />
          <div className="space-x-1 flex justify-center mt-2"></div>
          <h1 className="text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl mb-2">
            {data?.name}
          </h1>
          <p className="mb-2">{data?.description}</p>
          <h2 className="font-semibold mb-2">{data?.price}</h2>
          <button className="p-2 px-6 bg-purple-500 text-white rounded-md hover:bg-purple-600">
            Add To Cart
          </button>
        </section>
      </Link> */}

      {/* <Link to={`/product/${data.id}`}>
        <section className="py-2 bg-purple-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer flex flex-col items-center">
          <img
            className="w-full h-60 object-cover mb-2"
            // src="https://media.blackandwhite-ff.com/10000/7f7a3724-bf7a-44f8-9771-51ab81fae2ce_000-top-hero.jpg"
            alt="Dior x Air Jordan 1"
          />
          <div className="space-x-1 flex justify-center mt-2"></div>
          <h1 className="text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl mb-2">
            {data?.name}
          </h1>
          <p className="mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            incidunt!
          </p>
          <h2 className="font-semibold mb-2">$39.99</h2>
          <button className="p-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600">
            Add To Cart
          </button>
        </section>
      </Link> */}
      <Link to={`/product/${data.id}`}>
        <section className="py-2 bg-red-100 text-center transform duration-500 hover:-translate-y-2 cursor-pointer flex flex-col items-center">
          <img
            className="w-full h-full object-center object-cover"
            src={data?.imageUrl}
            // src="https://cdn.shopify.com/s/files/1/1626/5391/files/Dior_x_Air_Jordan_1_High.jpg?v=1698768560"
            alt="Air Jordan 1"
          />
          <div className="space-x-1 flex justify-center mt-2"></div>
          <h1 className="text-xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl mb-2">
            {data?.name}
          </h1>
          <p className="mb-2">{data?.description}</p>
          <h2 className="font-semibold mb-2">Rs. {data?.price}</h2>
          <button className="p-2 px-6 bg-red-500 text-white rounded-md hover:bg-red-600">
            Add To Cart
          </button>
        </section>{" "}
      </Link>
    </>
  );
};

export default Card;
