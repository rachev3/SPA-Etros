import React from "react";
import { usePlayers } from "../../api/playerApi";
import PlayerCard from "./PlayerCard";

const PlayersSection = () => {
  const { players, loading, error } = usePlayers();

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <p className="text-red-500">Failed to load players: {error}</p>
      </div>
    );
  }

  return (
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
  );
};

export default PlayersSection;
