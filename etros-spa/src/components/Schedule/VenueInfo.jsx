import React from "react";

const VenueInfo = () => (
  <section className="py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">Our Venue</h2>
      <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://placehold.co/800x500/111/333?text=Etros+Arena"
            alt="Etros Arena"
            className="w-full h-auto"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">Etros Arena</h3>
          <p className="text-gray-700 mb-4">
            Experience the excitement of Etros Basketball at our
            state-of-the-art arena located in the heart of the city.
          </p>
          <p className="text-gray-700 mb-4">
            Our 18,000-seat venue offers excellent sightlines, premium food
            options, and an electric atmosphere.
          </p>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-2">Location & Parking</h4>
            <p className="text-gray-700 mb-2">
              123 Main Street, Veliko Tarnovo, Bulgaria
            </p>
            <p className="text-gray-700 mb-4">
              Convenient parking available in adjacent garages and lots.
            </p>
            <button className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded transition-colors duration-200 text-sm flex items-center mt-2">
              📍 Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default VenueInfo;
