import { Link, useNavigate } from "react-router-dom";
import Footer from "../../globals/components/footer/Footer";
import Navbar from "../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteCartItem, updateCartItem } from "../../store/cartSlice";
import { resetOrderStatus } from "../../store/orderSlice";
import { useEffect } from "react";

const Cart = () => {
  const { items } = useAppSelector((state) => state.carts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (productId: string) => {
    dispatch(deleteCartItem(productId));
  };

  const handleUpdate = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleDelete(productId);
    } else {
      dispatch(updateCartItem(productId, quantity));
    }
  };

  const totalItemInCarts = items.reduce(
    (total, item) => (item?.quantity ?? 0) + total,
    0
  );
  const totalPriceInCarts = items.reduce(
    (total, item) =>
      (item?.Product?.price ?? 0) * (item?.quantity ?? 0) + total,
    0
  );

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty! Please add items before checking out.");
      return;
    }
    dispatch(resetOrderStatus()); // Reset previous order status before navigating
    navigate("/checkout");
  };

  // Reset order status when Cart component loads
  useEffect(() => {
    dispatch(resetOrderStatus());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 px-4">
        <div className="flex flex-wrap sm:flex-nowrap shadow-md my-10">
          <div className="w-full sm:w-3/4 bg-white p-3 sm:px-5 sm:py-5">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                Products: {items.length} items
              </h2>
            </div>

            {items.length > 0 &&
              items.map((item) => {
                const product = item?.Product ?? {};
                const productId = product?.id ?? "";
                const productImage = product?.imageUrl ?? "";
                const productName = product?.name ?? "Unknown Product";
                const productCategory =
                  product?.Category?.name ?? "Unknown Category";
                const productPrice = product?.price ?? 0;
                const productDescription =
                  product?.description ?? "No description available";

                return (
                  <div
                    key={productId}
                    className="md:flex items-stretch py-8 border-t border-gray-50"
                  >
                    <div className="md:w-4/12 2xl:w-1/4 w-full">
                      <img
                        src={productImage}
                        alt={productName}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                      <p className="text-base font-black leading-none text-gray-800 mt-4">
                        {productName}
                      </p>
                      <div className="flex items-center justify-between w-full">
                        <p className="text-xs leading-3 font-bold text-gray-800 md:pt-0 pt-2">
                          Category: {productCategory}
                        </p>
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleUpdate(productId, item?.quantity - 1)
                            }
                            className="border rounded-md py-2 px-4 mr-2"
                          >
                            -
                          </button>
                          <span className="text-center w-8">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdate(productId, item?.quantity + 1)
                            }
                            className="border rounded-md py-2 px-4 ml-2"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="text-xs leading-3 font-semibold text-gray-600 pt-2">
                        {productDescription}
                      </p>
                      <p className="text-xs leading-3 text-gray-600 font-semibold py-4">
                        Color: Black
                      </p>
                      <p className="w-full md:w-96 text-xs leading-3 text-gray-600">
                        Composition: 100% calf leather
                      </p>
                      <div className="flex items-center justify-between pt-5">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDelete(productId)}
                            className="p-2 px-6 ml-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-base font-black leading-none text-gray-800">
                          Rs. {productPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

            <Link
              to="/"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
          <div
            id="summary"
            className="w-full sm:w-1/4 md:w-1/2 bg-gray-100 p-6 sm:px-8 sm:py-10"
          >
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-5 mb-5">
              <span className="font-semibold text-sm uppercase">Items:</span>
              <span>{totalItemInCarts}</span>
            </div>
            <div className="flex justify-between mt-5 mb-5">
              <span className="font-semibold uppercase text-sm">
                Sub Total:
              </span>
              <span> Rs. {totalPriceInCarts.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-5 mb-5">
              <span className="font-semibold uppercase text-sm">
                Shipping Cost :
              </span>
              <span>Rs. 100.00</span>
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total Price:</span>
                <span>Rs. {(totalPriceInCarts + 100).toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className={`bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full ${
                  items.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={items.length === 0}
              >
                CheckOut
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
