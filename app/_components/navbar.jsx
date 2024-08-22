import LoginButton from "./loginButton";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto px-6 py-4 flex items-center">
        {/* Left-aligned heading */}
        <div className="flex-shrink-0 flex-col">
          {/* <h1 className="text-2xl font-bold text-blue-600">Geetanjali</h1> */}
          <img src="/geeta-icon.jpg" alt="Geeta Icon"
            className="w-12 h-12 object-contain"></img>
        </div>
        {/* Centered buttons */}
        <div className="flex flex-grow space-x-4 justify-center">
          <a
            href="#home"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <button className="relative px-4 py-2 text-gray-700 bg-transparent border border-transparent rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center">
              Home
            </button>
          </a>
          <a
            href="#highlights"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <button className="relative px-4 py-2 text-gray-700 bg-transparent border border-transparent rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center">
              Highlights
            </button>
          </a>
          <a
            href="#services"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <button className="relative px-4 py-2 text-gray-700 bg-transparent border border-transparent rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center">
              Services
            </button>
          </a>
          <a
            href="#download"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <button className="relative px-4 py-2 text-gray-700 bg-transparent border border-transparent rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center">
              Brochure
            </button>
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <button className="relative px-4 py-2 text-gray-700 bg-transparent border border-transparent rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center">
              Contact
            </button>
          </a>
        </div>
        {/* Right-aligned login button */}
        <div className="ml-auto">
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}
