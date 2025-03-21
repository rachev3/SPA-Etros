const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://placehold.co/1600x900/orange/white?text=ETROS+BASKETBALL')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl font-bold mb-4">ETROS BASKETBALL</h1>
            <p className="text-xl mb-8">Where Legends Are Made</p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors">
              View Schedule
            </button>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Latest Team News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://placehold.co/600x400/orange/white?text=Championship+Win"
                alt="Championship Win"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">2023-06-15</p>
                <h3 className="text-xl font-semibold mb-2">
                  Etros Wins Championship Final
                </h3>
                <p className="text-gray-700 mb-4">
                  In a thrilling finale, Etros defeated rivals 89-78 to claim
                  the championship trophy.
                </p>
                <button className="text-orange-500 font-semibold hover:text-orange-600">
                  Read More →
                </button>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://placehold.co/600x400/orange/white?text=New+Signing"
                alt="New Signing"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">2023-07-02</p>
                <h3 className="text-xl font-semibold mb-2">
                  New Star Player Signs with Etros
                </h3>
                <p className="text-gray-700 mb-4">
                  International basketball star Michael Johnson has signed a
                  3-year contract with Etros.
                </p>
                <button className="text-orange-500 font-semibold hover:text-orange-600">
                  Read More →
                </button>
              </div>
            </div>

            {/* News Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://placehold.co/600x400/orange/white?text=Training+Camp"
                alt="Training Camp"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-gray-500 text-sm mb-2">2023-07-10</p>
                <h3 className="text-xl font-semibold mb-2">
                  Team Training Camp Begins Next Week
                </h3>
                <p className="text-gray-700 mb-4">
                  The annual training camp will start on Monday as the team
                  prepares for the new season.
                </p>
                <button className="text-orange-500 font-semibold hover:text-orange-600">
                  Read More →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Team Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Highlight 1 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="https://placehold.co/600x400/orange/white?text=Highlights"
                  alt="Season Highlights"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-orange-500 hover:bg-orange-600 rounded-full w-16 h-16 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">Season Highlights</h3>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src="https://placehold.co/600x400/orange/white?text=Interviews"
                  alt="Player Interviews"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-orange-500 hover:bg-orange-600 rounded-full w-16 h-16 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">Player Interviews</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Upcoming Matches
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Match 1 */}
            <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-xl font-semibold">
                  Etros vs. Phoenix Suns
                </h3>
                <p className="text-gray-600">2023-08-12 • 19:30</p>
                <p className="text-gray-600">Etros Arena</p>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition-colors">
                Match Details
              </button>
            </div>

            {/* Match 2 */}
            <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-xl font-semibold">Etros vs. LA Lakers</h3>
                <p className="text-gray-600">2023-08-18 • 20:00</p>
                <p className="text-gray-600">Staples Center</p>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition-colors">
                Match Details
              </button>
            </div>

            {/* Match 3 */}
            <div className="p-6 flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-xl font-semibold">Etros vs. Miami Heat</h3>
                <p className="text-gray-600">2023-08-25 • 19:00</p>
                <p className="text-gray-600">Etros Arena</p>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded transition-colors">
                Match Details
              </button>
            </div>
          </div>
          <div className="text-center mt-8">
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors">
              View Full Schedule
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-orange-500 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-8">
            Subscribe to our newsletter for the latest team news, ticket
            information, and exclusive content
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800"
            />
            <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
