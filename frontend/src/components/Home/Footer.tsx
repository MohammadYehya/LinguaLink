import React from "react";

function Footer() {
  return (
    <footer className="flex justify-center items-center px-5 mt-5 mb-2 lg:px-36">
      <div className="w-full">
        <span className="font-semibold">
          © MHY {new Date().getFullYear()}.{" "}
        </span>
        <span className="font-light">
          Made for CN Project using Nextjs and Socket.io by Mohammad Yehya, Mahad Munir, & Hasan Iqbal.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
