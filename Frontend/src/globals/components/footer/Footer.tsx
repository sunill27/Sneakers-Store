import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    { label: "Home", path: "/" },
    { label: "Cart", path: "/cart" },
    { label: "MyOrders", path: "/myorder" },
  ];
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Footer Section */}
      <footer className="w-full relative bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white pt-10 mt-10">
        {/* Wave SVG background */}
        <div
          className="absolute -top-12 left-0 w-full h-12"
          style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=...')",
            backgroundSize: "cover",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-5 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 relative z-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-4">
              <Link to="/">
                <img src="/logo.png" alt="Logo" className="h-20" />
              </Link>{" "}
            </div>
            <p className="mb-4 leading-relaxed opacity-90 dark:opacity-90">
              Discover a world of high-quality shoes tailored to your needs.
              Experience seamless shopping with fast delivery, secure payments,
              and exceptional customer service.
            </p>
            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                ["facebook-f", "hover:bg-pink-500"],
                ["instagram", "hover:bg-pink-500"],
                ["twitter", "hover:bg-pink-500"],
                ["youtube", "hover:bg-pink-500"],
              ].map(([icon, hoverClass]) => (
                <Link
                  key={icon}
                  to="#"
                  className={`w-10 h-10 bg-gray-200 dark:bg-gray-500 bg-opacity-20 flex items-center justify-center rounded-full text-gray-900 dark:text-black transition-transform hover:-translate-y-1 ${hoverClass}`}
                >
                  <i className={`fab fa-${icon}`}></i>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl text-pink-600 font-semibold mb-6 border-b-2 border-pink-600 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition text-gray-900 dark:text-white"
                  >
                    <i className="fas fa-chevron-right text-pink-600"></i>{" "}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          {/* <div>
            <h3 className="text-xl text-pink-600 font-semibold mb-6 border-b-2 border-pink-600 pb-2">
              Our Team
            </h3>
            <ul className="space-y-3">
              {[
                "Recording Studio",
                "Theatre Room",
                "Workshop Space",
                "Photoshoot Studio",
                "Event Hosting",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition text-gray-900 dark:text-white"
                  >
                    <i className="fas fa-chevron-right text-pink-600"></i>{" "}
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact Us */}
          <div>
            <h3 className="text-xl text-pink-600 font-semibold mb-6 border-b-2 border-pink-600 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-4 text-gray-900 dark:text-white">
                <i className="fas fa-map-marker-alt text-pink-600 mt-1"></i>
                <div>Kathmandu, Nepal</div>
              </li>
              <li className="flex items-start gap-4 text-gray-900 dark:text-white">
                <i className="fas fa-phone-alt text-pink-600 mt-1"></i>
                <div>
                  <Link
                    to="tel:+91987654321"
                    className="block hover:underline opacity-90 hover:opacity-100 dark:text-white"
                  >
                    +977 1234567890
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-4 text-gray-900 dark:text-white">
                <i className="fas fa-envelope text-pink-600 mt-1"></i>
                <div>
                  <Link
                    to="mailto:sneakersstore@gmail.com"
                    className="block hover:underline opacity-90 hover:opacity-100 dark:text-white"
                  >
                    sneakersstore@gmail.com
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        {/* <h3 className="text-xl text-pink-600 font-semibold mb-2 border-b-2 border-pink-600 pb-2">
              Newsletter
            </h3>
            <p className="mb-4 opacity-70 dark:opacity-60">
              Subscribe to get updates on our latest events and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your Email"
                required
                className="flex-1 p-3 rounded-l-md focus:outline-none border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-500 text-white p-3 rounded-r-md transition"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form> */}

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-700 text-center opacity-70 text-sm text-gray-900 dark:text-white">
          <p>
            © 2024 Sneakers Store. All Rights Reserved. | Designed by{" "}
            <i className="fas fa-heart text-pink-600"></i> Sunil
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
