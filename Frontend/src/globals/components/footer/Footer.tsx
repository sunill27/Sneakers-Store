import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col items-center space-y-5 justify-center bg-gray-100 p- mt-5">
        <div className="text-center py-3 px-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Thanks for visiting us!
          </h2>
          <h3 className="text-lg text-gray-600 ">Hope to see you again</h3>
        </div>

        <div className="flex justify-center space-x-2 mt-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
              alt="Facebook"
            />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
              alt="Instagram"
            />
          </a>
          <a
            href="https://messenger.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png"
              alt="Messenger"
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/fluent/30/000000/twitter.png"
              alt="Twitter"
            />
          </a>
        </div>
        <p className="text-center text-gray-700 font-medium">
          &copy; 2024 FootWear Ltd. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
