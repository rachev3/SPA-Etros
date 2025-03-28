import React from "react";
import { Link } from "react-router";
import { usePlayers } from "../../api/playerApi";

const TeamPage = () => {
  const { players, loading, error } = usePlayers();

  // Mock data for coaches (keeping this for now)
  const coaches = [
    {
      id: 1,
      name: "James Peterson",
      role: "Head Coach",
      image: "https://placehold.co/300x400/111/333?text=Coach",
      bio: "Coach Peterson brings 15 years of coaching experience and has led teams to multiple championships.",
    },
    {
      id: 2,
      name: "Sarah Reynolds",
      role: "Assistant Coach",
      image: "https://placehold.co/300x400/111/333?text=Coach",
      bio: "Coach Reynolds specializes in player development and offensive strategy.",
    },
    {
      id: 3,
      name: "Mark Thompson",
      role: "Athletic Trainer",
      image: "https://placehold.co/300x400/111/333?text=Staff",
      bio: "Mark ensures our players stay in peak physical condition throughout the season.",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <section className="bg-black py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Meet <span className="text-yellow-400">The Team</span>
          </h1>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Our roster of talented players and experienced coaching staff are
            dedicated to achieving excellence on and off the court.
          </p>
        </div>
      </section>

      {/* Team Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Team Statistics
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">
                92.8
              </div>
              <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">
                Points Per Game
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">
                43.2
              </div>
              <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">
                Rebounds Per Game
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">
                22.5
              </div>
              <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">
                Assists Per Game
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">7.3</div>
              <div className="text-gray-600 font-medium uppercase tracking-wider text-sm">
                Steals Per Game
              </div>
            </div>
          </div>

          <div className="mt-12 bg-black rounded-lg overflow-hidden shadow-lg">
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-1">
                2022-2023 Season
              </h3>
              <p className="text-gray-300">
                Regular Season Record: 42-18 | Playoff Record: 16-4
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Players Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Players</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {players.map((player) => (
              <div
                key={player._id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <Link to={`/team/player/${player._id}`} className="block">
                  <div className="relative">
                    <img
                      src={
                        player.imageUrl ||
                        "https://placehold.co/300x400/111/333?text=Player"
                      }
                      alt={player.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-black bg-opacity-75 py-2 px-4">
                      <span className="text-yellow-400 font-bold text-2xl">
                        #{player.number}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900">
                      {player.name}
                    </h3>
                    <p className="text-gray-600">
                      {player.position?.join(", ")}
                    </p>

                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div>
                          <p className="text-gray-500 text-xs uppercase">
                            Height
                          </p>
                          <p className="font-bold text-gray-900">
                            {player.height || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs uppercase">
                            Weight
                          </p>
                          <p className="font-bold text-gray-900">
                            {player.weight ? `${player.weight} lbs` : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Born: {player.bornYear}
                  </p>
                  <Link
                    to={`/team/player/${player._id}`}
                    className="text-purple-700 hover:text-purple-500 text-sm font-medium inline-flex items-center"
                  >
                    View Profile
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Staff Section */}
      <section className="py-16 px-4 bg-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Coaching Staff
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coaches.map((coach) => (
              <div
                key={coach.id}
                className="bg-black rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-yellow-400">
                    {coach.name}
                  </h3>
                  <p className="text-gray-300 font-medium mb-4">{coach.role}</p>
                  <p className="text-gray-400">{coach.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-lg mb-8 text-gray-300">
            Interested in trying out for Etros Basketball? We're always looking
            for talented and dedicated players to join our organization.
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded transition-colors duration-200 shadow-lg">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
