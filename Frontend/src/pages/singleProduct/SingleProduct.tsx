import { useEffect } from "react";
import Navbar from "../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Link, useParams } from "react-router-dom";
import { fetchByProductId, fetchProducts } from "../../store/productSlice";
import { addToCart } from "../../store/cartSlice";
import Footer from "../../globals/components/footer/Footer";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { singleProduct } = useAppSelector((state) => state.products);
  const { product } = useAppSelector((state) => state.products);
  const relatedProducts = product.filter((p: any) => p.id !== id).slice(0, 8);

  useEffect(() => {
    if (id) {
      dispatch(fetchByProductId(id));
    }
    dispatch(fetchProducts());
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (id && singleProduct) {
      dispatch(addToCart(id));
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white dark:bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[400px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={singleProduct?.imageUrl}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-green-600  text-white py-2 px-4 rounded-full font-bold hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {singleProduct?.name}
              </h2>

              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {" "}
                    {singleProduct?.price}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Available Stock:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {" "}
                    {singleProduct?.stock}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Category:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {" "}
                  {singleProduct?.Category.name}
                </span>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Color:
                </span>
                <div className="flex items-center mt-2">
                  <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </span>
                <div className="flex items-center mt-2">
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    S
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    M
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    L
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XL
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XXL
                  </button>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {singleProduct?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <hr className="border-gray-300 dark:border-gray-600 mb-8" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          You may also like
        </h2>

        {/* Related Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <Link to={`/product/${product?.id}`}>
                <img
                  src={product?.imageUrl}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                    {product?.name}
                  </h3>
                  <p className="text-pink-600 font-bold mt-2">
                    Rs. {product?.price}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {singleProduct?.description}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(addToCart(product.id));
                    }}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded-full text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SingleProduct;
