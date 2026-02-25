
import React from "react";

function Navbar() {
  return (
    <div className="bg-red-200">
      <div className="bg-linear-to-r from-gray-900 to-blue-800 text-white px-8 py-4 flex justify-between items-center shadow-lg">
        {/* Logo */}
        <h1 className="text-2xl flex items-center justify-center font-bold tracking-wide">

        </h1>

        {/* Links */}
        <div className="flex gap-6 text-lg">
          <a
            href="#"
            className="hover:text-yellow-300 transition font-bold text-amber-400 hover:animate-bounce duration-100"
          >

          </a>
        </div>

        {/* Button */}
      </div>
    </div>
  );
}

export default Navbar;
//
<div class="relative inline-block">

<button onclick="toggleMenu()"
  class="bg-blue-600 text-white px-4 py-2 rounded-md">
  Options
</button>

<div id="menu"
  class="hidden absolute mt-2 w-40 bg-white border rounded-md shadow-lg">

  <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</div>
  <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</div>
  <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer">View</div>

</div>
</div>




//



