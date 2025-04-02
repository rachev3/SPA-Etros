import React, { useMemo } from "react";
import { Link } from "react-router";
import { useMatches } from "../../api/matchApi";
import "./UpcomingMatches.css";
import LoadingSpinner from "../shared/LoadingSpinner";

const UpcomingMatches = () => {
  const filterMatch = useMemo(() => ({ status: "upcoming" }), []);
  const { matches, loading, error } = useMatches(1, 3, filterMatch);

  return (
    <section className="upcoming-matches-section py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="upcoming-matches-title text-3xl font-bold mb-2 text-center">
          Upcoming Matches
        </h2>
        <div className="upcoming-matches-divider w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

        {loading ? (
          <LoadingSpinner containerHeight="h-48" />
        ) : error ? (
          <div className="error-message">Failed to load upcoming matches.</div>
        ) : matches.length === 0 ? (
          <div className="upcoming-matches-card p-6 text-center text-gray-500">
            No upcoming matches at the moment.
          </div>
        ) : (
          <div className="upcoming-matches-card">
            {matches.map((match) => (
              <div key={match._id} className="match-item">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div>
                    <h3 className="match-title">Etros vs. {match.opponent}</h3>
                    <p className="match-details">
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
                    <p className="match-location">{match.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link
            to="/schedule"
            className="view-schedule-button bg-black hover:bg-gray-900 text-white font-bold py-3 px-8 rounded transition-colors duration-200 shadow-md inline-block"
          >
            View Full Schedule
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatches;
