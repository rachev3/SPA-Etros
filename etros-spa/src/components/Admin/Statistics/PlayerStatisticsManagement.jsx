import React, { useState, useEffect } from "react";

const PlayerStatisticsManagement = () => {
  // Sample data for matches, players, and statistics
  const [matches, setMatches] = useState([
    {
      id: 1,
      homeTeam: "Etros FC",
      awayTeam: "Eagles United",
      date: "2023-09-15",
      competition: "League",
    },
    {
      id: 2,
      homeTeam: "Phoenix FC",
      awayTeam: "Etros FC",
      date: "2023-09-22",
      competition: "League",
    },
    {
      id: 3,
      homeTeam: "Etros FC",
      awayTeam: "Riverside Rovers",
      date: "2023-10-05",
      competition: "Cup",
    },
  ]);

  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "John Smith",
      position: "Forward",
      jerseyNumber: 10,
    },
    {
      id: 2,
      name: "Michael Johnson",
      position: "Defender",
      jerseyNumber: 4,
    },
    {
      id: 3,
      name: "David Williams",
      position: "Goalkeeper",
      jerseyNumber: 1,
    },
    {
      id: 4,
      name: "James Brown",
      position: "Midfielder",
      jerseyNumber: 8,
    },
    {
      id: 5,
      name: "Robert Davis",
      position: "Forward",
      jerseyNumber: 9,
    },
  ]);

  const [playerStats, setPlayerStats] = useState([
    {
      id: 1,
      matchId: 1,
      playerId: 1,
      minutesPlayed: 90,
      goals: 2,
      assists: 1,
      yellowCards: 0,
      redCards: 0,
      shotsOnTarget: 3,
      shotsTotal: 5,
      passesCompleted: 35,
      passesAttempted: 42,
      tackles: 2,
      foulsCommitted: 1,
      foulsSuffered: 3,
    },
    {
      id: 2,
      matchId: 1,
      playerId: 4,
      minutesPlayed: 90,
      goals: 0,
      assists: 2,
      yellowCards: 1,
      redCards: 0,
      shotsOnTarget: 1,
      shotsTotal: 2,
      passesCompleted: 65,
      passesAttempted: 75,
      tackles: 5,
      foulsCommitted: 2,
      foulsSuffered: 1,
    },
    {
      id: 3,
      matchId: 2,
      playerId: 1,
      minutesPlayed: 85,
      goals: 1,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      shotsOnTarget: 2,
      shotsTotal: 4,
      passesCompleted: 30,
      passesAttempted: 38,
      tackles: 1,
      foulsCommitted: 2,
      foulsSuffered: 2,
    },
  ]);

  // State for UI
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [filteredStats, setFilteredStats] = useState([]);

  // Filter stats when match changes
  useEffect(() => {
    if (selectedMatch) {
      setFilteredStats(
        playerStats.filter((stat) => stat.matchId === selectedMatch.id)
      );
    } else {
      setFilteredStats([]);
    }
  }, [selectedMatch, playerStats]);

  // Handler functions
  const handleAddStat = () => {
    if (!selectedMatch) {
      alert("Please select a match first");
      return;
    }

    setCurrentStat({
      id: playerStats.length + 1,
      matchId: selectedMatch.id,
      playerId: "",
      minutesPlayed: 0,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0,
      shotsOnTarget: 0,
      shotsTotal: 0,
      passesCompleted: 0,
      passesAttempted: 0,
      tackles: 0,
      foulsCommitted: 0,
      foulsSuffered: 0,
    });
    setIsAddModalOpen(true);
  };

  const handleEditStat = (stat) => {
    setCurrentStat({ ...stat });
    setIsEditModalOpen(true);
  };

  const handleDeleteStat = (id) => {
    setPlayerStats(playerStats.filter((stat) => stat.id !== id));
    setDeleteConfirmId(null);
  };

  const handleSaveStat = (stat, isNew = false) => {
    if (isNew) {
      setPlayerStats([...playerStats, stat]);
      setIsAddModalOpen(false);
    } else {
      setPlayerStats(playerStats.map((s) => (s.id === stat.id ? stat : s)));
      setIsEditModalOpen(false);
    }
  };

  const getPlayerById = (id) => {
    return players.find((player) => player.id === id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Player Statistics Management
        </h1>
      </div>

      {/* Match selection */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Select Match</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match) => (
            <div
              key={match.id}
              onClick={() => setSelectedMatch(match)}
              className={`border p-4 rounded-lg cursor-pointer transition-colors ${
                selectedMatch?.id === match.id
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/50"
              }`}
            >
              <p className="font-medium text-gray-800">
                {match.homeTeam} vs {match.awayTeam}
              </p>
              <p className="text-sm text-gray-500">
                {match.date} • {match.competition}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Player stats section */}
      {selectedMatch && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              Player Stats for{" "}
              <span className="text-yellow-600">
                {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
              </span>
            </h2>
            <button
              onClick={handleAddStat}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Add Player Stats
            </button>
          </div>

          {filteredStats.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Player
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Performance
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cards
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Passing
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStats.map((stat) => {
                    const player = getPlayerById(stat.playerId);
                    return (
                      <tr key={stat.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {player?.name} (#{player?.jerseyNumber})
                          </div>
                          <div className="text-sm text-gray-500">
                            {player?.position}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            {stat.minutesPlayed} mins
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            <span className="font-medium">{stat.goals}</span>{" "}
                            goals,{" "}
                            <span className="font-medium">{stat.assists}</span>{" "}
                            assists
                          </div>
                          <div className="text-xs text-gray-500">
                            {stat.shotsOnTarget}/{stat.shotsTotal} shots on
                            target
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {stat.yellowCards > 0 && (
                            <span className="inline-flex items-center justify-center w-5 h-5 mr-1 bg-yellow-400 rounded-sm"></span>
                          )}
                          {stat.redCards > 0 && (
                            <span className="inline-flex items-center justify-center w-5 h-5 bg-red-600 rounded-sm"></span>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm">
                            {stat.passesCompleted}/{stat.passesAttempted}
                            <span className="text-gray-500 text-xs ml-1">
                              (
                              {Math.round(
                                (stat.passesCompleted / stat.passesAttempted) *
                                  100
                              )}
                              %)
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditStat(stat)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            Edit
                          </button>
                          {deleteConfirmId === stat.id ? (
                            <>
                              <button
                                onClick={() => handleDeleteStat(stat.id)}
                                className="text-red-600 hover:text-red-900 mr-1"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(stat.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No statistics recorded for this match yet. Click "Add Player
              Stats" to begin.
            </div>
          )}
        </div>
      )}

      {/* Add Stat Modal */}
      {isAddModalOpen && (
        <StatFormModal
          stat={currentStat}
          players={players}
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={(stat) => handleSaveStat(stat, true)}
          title="Add Player Statistics"
        />
      )}

      {/* Edit Stat Modal */}
      {isEditModalOpen && (
        <StatFormModal
          stat={currentStat}
          players={players}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveStat}
          title="Edit Player Statistics"
        />
      )}
    </div>
  );
};

// Modal component for adding/editing player statistics
const StatFormModal = ({ stat, players, isOpen, onClose, onSave, title }) => {
  const [formData, setFormData] = useState(stat);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "playerId" ? parseInt(value, 10) : parseInt(value, 10) || 0,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Player
              </label>
              <select
                name="playerId"
                value={formData.playerId}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="">Select a player</option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name} (#{player.jerseyNumber}, {player.position})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minutes Played
                </label>
                <input
                  type="number"
                  name="minutesPlayed"
                  value={formData.minutesPlayed}
                  onChange={handleChange}
                  min="0"
                  max="120"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goals
                </label>
                <input
                  type="number"
                  name="goals"
                  value={formData.goals}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assists
                </label>
                <input
                  type="number"
                  name="assists"
                  value={formData.assists}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yellow Cards
                </label>
                <input
                  type="number"
                  name="yellowCards"
                  value={formData.yellowCards}
                  onChange={handleChange}
                  min="0"
                  max="2"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Red Cards
                </label>
                <input
                  type="number"
                  name="redCards"
                  value={formData.redCards}
                  onChange={handleChange}
                  min="0"
                  max="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shots On Target
                </label>
                <input
                  type="number"
                  name="shotsOnTarget"
                  value={formData.shotsOnTarget}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Shots
                </label>
                <input
                  type="number"
                  name="shotsTotal"
                  value={formData.shotsTotal}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passes Completed
                </label>
                <input
                  type="number"
                  name="passesCompleted"
                  value={formData.passesCompleted}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passes Attempted
                </label>
                <input
                  type="number"
                  name="passesAttempted"
                  value={formData.passesAttempted}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tackles
                </label>
                <input
                  type="number"
                  name="tackles"
                  value={formData.tackles}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fouls Committed
                </label>
                <input
                  type="number"
                  name="foulsCommitted"
                  value={formData.foulsCommitted}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fouls Suffered
                </label>
                <input
                  type="number"
                  name="foulsSuffered"
                  value={formData.foulsSuffered}
                  onChange={handleChange}
                  min="0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Save Statistics
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatisticsManagement;
