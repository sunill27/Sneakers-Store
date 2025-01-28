import React from "react";
import { Product } from "../types/productTypes";
import { Link } from "react-router-dom";

interface CardProps {
  data: Product;
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <>
      <Link to={`/product/${data.id}`}>
        <section className="py-2 bg-red-100 text-center transform duration-500 hover:-translate-y-2 cursor-pointer flex flex-col items-center">
          <img
            className="w-full h-full object-center object-cover"
            src={data?.imageUrl}
            // src="https://cdn.shopify.com/s/files/1/1626/5391/files/Dior_x_Air_Jordan_1_High.jpg?v=1698768560"
            alt="AirJordan 1"
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
