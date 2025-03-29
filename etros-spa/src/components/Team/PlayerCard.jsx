import React from "react";
import { Link } from "react-router";

const PlayerCard = ({ player }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
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
          <h3 className="text-xl font-bold text-gray-900">{player.name}</h3>
          <p className="text-gray-600">{player.position?.join(", ")}</p>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <p className="text-gray-500 text-xs uppercase">Height</p>
                <p className="font-bold text-gray-900">
                  {player.height || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Weight</p>
                <p className="font-bold text-gray-900">
                  {player.weight ? `${player.weight} lbs` : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
        <p className="text-sm text-gray-600">Born: {player.bornYear}</p>
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
  );
};

export default PlayerCard;
