import React from "react";
import { Link } from "react-router";
import { usePlayers } from "../../api/playerApi";
import PlayerCard from "./PlayerCard";

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

      {/* Team Stats Section
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
      </section> */}

      {/* Players Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Players</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {players.map((player) => (
              <PlayerCard key={player._id} player={player} />
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
    </div>
  );
};

export default TeamPage;
