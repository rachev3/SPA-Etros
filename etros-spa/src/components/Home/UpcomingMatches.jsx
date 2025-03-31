import React, { useMemo } from "react";
import { Link } from "react-router";
import { useMatches } from "../../api/matchApi";

const UpcomingMatches = () => {
  const filterMatch = useMemo(() => ({ status: "upcoming" }), []);
  const { matches, loading, error } = useMatches(1, 3, filterMatch);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Upcoming Matches
        </h2>
        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 text-center text-gray-500">
            Loading upcoming matches...
          </div>
        ) : error ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 text-center text-red-500">
            Failed to load upcoming matches.
          </div>
        ) : matches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 text-center text-gray-500">
            No upcoming matches at the moment.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden divide-y divide-gray-200">
            {matches.map((match) => (
              <div
                key={match._id}
                className="p-6 flex flex-col sm:flex-row justify-between items-center"
              >
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-xl font-semibold">
                    Etros vs. {match.opponent}
                  </h3>
                  <p className="text-gray-600">
                    {new Date(match.date).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    •{" "}
                    {new Date(match.date).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-gray-600">{match.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/schedule"
            className="bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded transition-colors duration-200 shadow-md inline-block"
          >
            View Full Schedule
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatches;
