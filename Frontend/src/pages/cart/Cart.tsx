import { Link } from "react-router-dom";
import Footer from "../../globals/components/footer/Footer";
import Navbar from "../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteCartItem, updateCartItem } from "../../store/cartSlice";

const Cart = () => {
  const { items } = useAppSelector((state) => state.carts);
  const dispatch = useAppDispatch();
  const handleDelete = (productId: string) => {
    dispatch(deleteCartItem(productId));
  };

  const handleUpdate = (productId: string, quantity: number) => {
    dispatch(updateCartItem(productId, quantity));
  };

  const totalItemInCarts = items.reduce(
    (total, item) => item?.quantity + total,
    0
  );
  const totalPriceInCarts = items.reduce(
    (total, item) => item?.Product?.price * item?.quantity + total,
    0
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 px-4">
        <div className="flex flex-wrap sm:flex-nowrap shadow-md my-10">
          <div className="w-full sm:w-3/4 bg-white p-3 sm:px-5 sm:py-5">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                Products:{items.length} items
              </h2>
            </div>

            {items.length > 0 &&
              items.map((item) => {
                return (
                  <div
                    key={item?.Product?.id}
                    className="md:flex items-stretch py-8 border-t border-gray-50"
                  >
                    <div className="md:w-4/12 2xl:w-1/4 w-full">
                      <img
                        src={item?.Product?.imageUrl}
                        alt="Product Image"
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                      <p className="text-base font-black leading-none text-gray-800 mt-4">
                        {item?.Product?.name}
                      </p>
                      <div className="flex items-center justify-between w-full">
                        <p className="text-xs leading-3 font-bold text-gray-800 md:pt-0 pt-2">
                          Category: {item?.Product?.Category?.name}
                        </p>
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleUpdate(
                                item?.Product?.id,
                                item?.quantity - 1
                              )
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
                              handleUpdate(
                                item?.Product?.id,
                                item?.quantity + 1
                              )
                            }
                            className="border rounded-md py-2 px-4 ml-2"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="text-xs leading-3 font-semibold text-gray-600 pt-2">
                        {item?.Product?.description}
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
                            onClick={() => {
                              handleDelete(item?.Product?.id);
                            }}
                            className="p-2 px-6 ml-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-base font-black leading-none text-gray-800">
                          Rs. {item?.Product?.price}
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
              <span> {totalPriceInCarts}</span>
            </div>
            <div className="flex justify-between mt-5 mb-5">
              <span className="font-semibold uppercase text-sm">
                Shipping Cost :
              </span>
              <span> {100}</span>
            </div>

            {/* <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Promo Code
              </label>
              <input
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase w-full">
              Apply
            </button> */}
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total Price:</span>
                <span> {totalPriceInCarts + 100}</span>
              </div>

              <Link to="/checkout">
                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                  CheckOut
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
