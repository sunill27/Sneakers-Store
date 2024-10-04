import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect, useState } from "react";
import { resetToken } from "../../../store/authSlice";
import { fetchCartItems } from "../../../store/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  // console.log(user.token);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { items } = useAppSelector((state) => state.carts);
  // console.log(items);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token || !!user.token);
    dispatch(fetchCartItems());
  }, [user.token]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    dispatch(resetToken("token"));
    navigate("/login");
  };

  return (
    <>
      <header className="bg-gray-100 w-full">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center ml-10">
              <img
                src="https://seeklogo.com/images/N/nike-jordan-air-shoe-logo-3F633DDA45-seeklogo.com.png"
                className="w-10 h-10"
              />
              <Link to="/">
                <h2 className="font-bold text-2xl text-purple-600">Store</h2>
              </Link>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              {/* <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      {" "}
                      About{" "}
                    </a>
                  </li>            
                </ul>
              </nav> */}

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 font-semibold hover:text-blue-500">
                  {!isLoggedIn ? (
                    <>
                      <button>
                        <Link to="/login">LogIn</Link>
                      </button>

                      <button className="rounded-md bg-blue-500 px-2 py-2 text-sm font-medium text-white shadow hover:bg-rose-400">
                        <Link to="/register">SignUp</Link>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="relative inline-block">
                        <Link to="/cart">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="10.5" cy="19.5" r="1.5"></circle>
                            <circle cx="17.5" cy="19.5" r="1.5"></circle>
                            {/* <path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z"></path> */}
                            <path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z"></path>
                          </svg>

                          {/* Cart item count */}
                          {items.length > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-500">
                              {items.length}
                            </span>
                          )}
                        </Link>
                      </div>
                      {/* <Link
                        to="/cart"
                        className="text-sm text-gray-900 font-semibold hover:text-blue-500"
                        // className="rounded-md bg-blue-500 px-2 py-2 text-sm font-medium text-white shadow hover:bg-rose-400"
                      >
                        <span>
                          Cart
                          <sup>{items.length}</sup>
                        </span>
                      </Link> */}
                      <Link
                        to="/login"
                        className="text-sm text-gray-900 font-semibold hover:text-blue-500"
                        onClick={handleLogOut}
                        // className="rounded-md bg-blue-500 px-2 py-2 text-sm font-medium text-white shadow hover:bg-rose-400"
                      >
                        <span>LogOut</span>
                      </Link>
                    </>
                  )}
                </div>

                {/* <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
