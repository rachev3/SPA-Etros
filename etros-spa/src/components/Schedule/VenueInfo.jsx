import React from "react";

const VenueInfo = () => (
  <section className="py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">Our Venue</h2>
      <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img src="/gym.jpg" alt="Etros Arena" className="w-full h-auto" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">Sport Complex "Ivaylo"</h3>
          <p className="text-gray-700 mb-4">
            Currently located in the city of Veliko Tarnovo, Bulgaria. Using
            Etar's gym for practices and home games.
          </p>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-2">Location</h4>
            <p className="text-gray-700 mb-2">
              str. "Filip Totyu" 5-3, Veliko Tarnovo, Bulgaria
            </p>
          </div>
          <a
            href="https://maps.app.goo.gl/NZvdArCgV4NvJDDWA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded transition-colors duration-200 shadow-lg"
          >
            Directions
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default VenueInfo;
