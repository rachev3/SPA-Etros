import React from "react";

const Sponsors = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Our Sponsors
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We're proud to partner with these leading brands who support our
            team and share our values of excellence, teamwork, and community
            engagement.
          </p>
        </div>

        {/* Sponsor Tiers */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-center text-purple-800 mb-8">
            Official Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://placehold.co/200x80/111/ddd?text=SPONSOR+1"
                alt="Sponsor 1"
                className="max-h-16"
              />
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://placehold.co/200x80/111/ddd?text=SPONSOR+2"
                alt="Sponsor 2"
                className="max-h-16"
              />
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://placehold.co/200x80/111/ddd?text=SPONSOR+3"
                alt="Sponsor 3"
                className="max-h-16"
              />
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://placehold.co/200x80/111/ddd?text=SPONSOR+4"
                alt="Sponsor 4"
                className="max-h-16"
              />
            </div>
          </div>

          <h3 className="text-xl font-bold text-center text-gray-800 mb-8">
            Supporting Partners
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-center hover:shadow-md transition-shadow duration-300">
              <img
                src="https://placehold.co/150x60/111/ddd?text=PARTNER+1"
                alt="Partner 1"
                className="max-h-12"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-center hover:shadow-md transition-shadow duration-300">
              <img
                src="https://placehold.co/150x60/111/ddd?text=PARTNER+2"
                alt="Partner 2"
                className="max-h-12"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-center hover:shadow-md transition-shadow duration-300">
              <img
                src="https://placehold.co/150x60/111/ddd?text=PARTNER+3"
                alt="Partner 3"
                className="max-h-12"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-center hover:shadow-md transition-shadow duration-300">
              <img
                src="https://placehold.co/150x60/111/ddd?text=PARTNER+4"
                alt="Partner 4"
                className="max-h-12"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-center hover:shadow-md transition-shadow duration-300">
              <img
                src="https://placehold.co/150x60/111/ddd?text=PARTNER+5"
                alt="Partner 5"
                className="max-h-12"
              />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-center hover:shadow-md transition-shadow duration-300">
              <img
                src="https://placehold.co/150x60/111/ddd?text=PARTNER+6"
                alt="Partner 6"
                className="max-h-12"
              />
            </div>
          </div>
        </div>

        {/* Sponsorship CTA */}
        <div className="bg-black rounded-lg p-8 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">
            Become a Sponsor
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our team of partners and connect your brand with our passionate
            fanbase. We offer various sponsorship packages tailored to meet your
            marketing objectives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
