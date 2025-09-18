import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
      <div>
        <Link
          href="/"
          className="text-sm rounded-md bg-black p-1 font-semibold items-center justify-center"
        >
          <span className="text-white mr-1">Sul</span>
          <span className="w-12 h-8 rounded bg-white text-black items-center justify-center">
            eman
          </span>
        </Link>
      </div>
      <div className="">
        <button className="w-10 h-8 flex flex-col justify-between">
          <div className="w-10 h-1 bg-black rounded"></div>
          <div className="w-10 h-1 bg-black rounded"></div>
          <div className="w-10 h-1 bg-black rounded"></div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
