import { Link } from "react-router-dom";
import Navbar from "../../globals/components/navbar/Navbar";

const Hero = () => {
  return (
    <>
      <Navbar />
      <main className="dark:bg-gray-800 bg-white relative ">
        <div className="bg-white dark:bg-gray-800 flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between relative z-20 py-16">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-start">
            <div className="lg:w-2/5 xl:w-1/3 flex flex-col lg:mr-10 mb-10 lg:mb-0 relative z-20">
              <h1 className="font-bebas-neue uppercase text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                Shop Smart,
                <span className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl">
                  Shop Now.
                </span>
              </h1>
              {/* <span className="w-20 h-2 bg-gray-800 dark:bg-white mt-5"></span> */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-white mt-4">
                Discover a world of high-quality products tailored to your
                needs. Whether it’s fashion, electronics, or home essentials,
                we’ve got it all in one place. Experience seamless shopping with
                fast delivery, secure payments, and exceptional customer
                service.
              </p>
              <div className="flex flex-col sm:flex-row mt-8">
                <Link
                  to="#"
                  className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mb-2 sm:mb-0 sm:mr-4 hover:bg-pink-400"
                >
                  Get started
                </Link>
                <Link
                  to="#"
                  className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md"
                >
                  Read more
                </Link>
              </div>
            </div>
            <div className="lg:w-2/3 xl:w-2/3 xl: flex-shrink-0 rounded-lg bg-gray-300 dark:bg-gray-700 mb-2 lg:mb-0">
              <img
                className="w-full h-full object-center object-cover  lg:h-[70vh]"
                src="https://media.gq.com/photos/661fd9db1077287a12a6a909/3:2/w_1011,h_674,c_limit/air-jordan-1-banned.jpg"
                alt="Image"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Hero;
