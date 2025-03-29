import { Link } from "react-router";

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://placehold.co/1600x900/111/333?text=ETROS+BASKETBALL')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl font-bold mb-4 text-white">
              <span className="text-yellow-400">ETROS</span> BASKETBALL
            </h1>
            <p className="text-xl mb-8 tracking-wider text-gray-200">
              Where Legends Are Made
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded transition-colors duration-200 shadow-lg">
              <Link to="/schedule">View Schedule</Link>
            </button>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Latest Team News
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img
                src="https://placehold.co/600x400/111/333?text=Championship+Win"
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
                <button className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors duration-200 inline-flex items-center">
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img
                src="https://placehold.co/600x400/111/333?text=New+Signing"
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
                <button className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors duration-200 inline-flex items-center">
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* News Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <img
                src="https://placehold.co/600x400/111/333?text=Training+Camp"
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
                <button className="text-yellow-500 font-semibold hover:text-yellow-400 transition-colors duration-200 inline-flex items-center">
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Team Highlights
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Highlight 1 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video relative">
                <img
                  src="https://placehold.co/600x400/111/333?text=Highlights"
                  alt="Season Highlights"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-yellow-500 hover:bg-yellow-400 text-black rounded-full w-16 h-16 flex items-center justify-center transition-colors duration-200 shadow-lg">
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
              <div className="p-5">
                <h3 className="text-xl font-semibold text-yellow-400">
                  Season Highlights
                </h3>
                <p className="text-gray-400 mt-2">
                  Watch the best moments from our championship season
                </p>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-video relative">
                <img
                  src="https://placehold.co/600x400/111/333?text=Interviews"
                  alt="Player Interviews"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-yellow-500 hover:bg-yellow-400 text-black rounded-full w-16 h-16 flex items-center justify-center transition-colors duration-200 shadow-lg">
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
              <div className="p-5">
                <h3 className="text-xl font-semibold text-yellow-400">
                  Player Interviews
                </h3>
                <p className="text-gray-400 mt-2">
                  Exclusive interviews with our star players
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Upcoming Matches
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Match 1 */}
            <div className="p-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-xl font-semibold">
                  Etros vs. Phoenix Suns
                </h3>
                <p className="text-gray-600">2023-08-12 • 19:30</p>
                <p className="text-gray-600">Etros Arena</p>
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-5 rounded transition-colors duration-200 shadow">
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
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-5 rounded transition-colors duration-200 shadow">
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
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-5 rounded transition-colors duration-200 shadow">
                Match Details
              </button>
            </div>
          </div>
          <div className="text-center mt-8">
            <button className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded transition-colors duration-200 shadow-md">
              <Link to="/schedule"> View Full Schedule</Link>
            </button>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
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
              Join our team of partners and connect your brand with our
              passionate fanbase. We offer various sponsorship packages tailored
              to meet your marketing objectives.
            </p>
            {/* <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md">
              Sponsorship Information
            </button> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
