import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const [isShow, setIsShow] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="sticky z-50 top-0 h-16 bg-linear-to-br from-[#07023A] via-[#120A5C] to-[#2A1FA3] flex items-center justify-between px-6">
      <div className="text-yellow-400 font-bold text-xl md:text-2xl">
        Inventory Management
      </div>

      <ul className="hidden flex md:flex gap-10 list-none items-center">


        {/* Show logged-in user's name */}
        {user && (
          <li className="text-green-500  text-xl font-semibold ml-6">
            Welcome' {user.name}
          </li>
        )}

        {/* Logout button */}
        {user && (
          <li>
            <button
              onClick={logout}
              className="bg-red-700 font-black hover:bg-amber-500 hover:text-gray-900 text-white px-3 py-1 rounded ml-4"
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      {/* Mobile view */}
      <ul
        className={`${
          isShow ? "block" : "hidden"
        } border-amber-300 border-1 rounded-2xl sm:hidden gap-6 list-none bg-linear-to-br from-[#07023A] via-[#120A5C] to-[#2A1FA3] p-2 absolute right-1 mt-46`}
      >


        {/* Mobile: Show logged-in usernamaa */}
        {user && (
          <li className="text-green-400 font-semibold mt-2 px-2">
            Hello, {user.name}
          </li>
        )}

        {/* Mobile: Logout button */}
        {user && (
          <li className="mt-2 px-2">
            <button
              onClick={logout}
              className="bg-red-400 text-white px-3 py-1 rounded w-full"
            >
              Logout
            </button>
          </li>
        )}
      </ul>

      {/* Hamburger button */}
      <button
        onClick={() => setIsShow(!isShow)}
        className="block sm:hidden text-2xl text-blue-100 font-black"
      >
        <GiHamburgerMenu />
      </button>
    </nav>
  );
}

export default Navbar;