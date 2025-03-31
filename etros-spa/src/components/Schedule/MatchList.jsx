import { Link } from "react-router";
import { formatLongDate } from "../../utils/dateUtils";

const MatchList = ({ matches, activeTab }) => {
  if (matches.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No {activeTab === "upcoming" ? "upcoming" : "past"} matches found.
      </div>
    );
  }

  return (
    <div>
      {matches.map((match) => (
        <div
          key={match._id}
          className="p-6 flex flex-col md:flex-row justify-between items-center border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <div className="text-center md:text-left md:mr-8 mb-4 md:mb-0">
              <div className="text-sm text-gray-500">
                {formatLongDate(match.date)}
              </div>
              <div className="text-lg font-bold">{match.time}</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl font-bold mb-1">
                {match.isHome ? "Etros vs " : "Etros at "} {match.opponent}
              </div>
              <div className="text-gray-600">
                {match.location}
                {match.isHome && (
                  <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                    HOME
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link
              to={`/match/${match._id}`}
              className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded transition-colors duration-200 text-sm"
            >
              Game Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
