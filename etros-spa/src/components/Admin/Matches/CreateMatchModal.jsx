import React, { useState } from "react";
import { useCreateMatch } from "../../../api/matchApi";

const CreateMatchModal = ({ isOpen, onClose, onSuccess }) => {
  const { create } = useCreateMatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matchData, setMatchData] = useState({
    opponent: "",
    date: "",
    location: "",
    status: "upcoming",
    result: "Pending",
    ourScore: null,
    opponentScore: null,
    teamStats: {
      fieldGoalsMade: 0,
      fieldGoalsAttempted: 0,
      twoPointsMade: 0,
      twoPointsAttempted: 0,
      threePointsMade: 0,
      threePointsAttempted: 0,
      freeThrowsMade: 0,
      freeThrowsAttempted: 0,
      offensiveRebounds: 0,
      defensiveRebounds: 0,
      totalAssists: 0,
      totalSteals: 0,
      totalBlocks: 0,
      totalTurnovers: 0,
      totalFouls: 0,
      totalPoints: 0,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await create(matchData);
      onSuccess();
      setMatchData({
        opponent: "",
        date: "",
        location: "",
        status: "upcoming",
        result: "Pending",
        ourScore: null,
        opponentScore: null,
        teamStats: {
          fieldGoalsMade: 0,
          fieldGoalsAttempted: 0,
          twoPointsMade: 0,
          twoPointsAttempted: 0,
          threePointsMade: 0,
          threePointsAttempted: 0,
          freeThrowsMade: 0,
          freeThrowsAttempted: 0,
          offensiveRebounds: 0,
          defensiveRebounds: 0,
          totalAssists: 0,
          totalSteals: 0,
          totalBlocks: 0,
          totalTurnovers: 0,
          totalFouls: 0,
          totalPoints: 0,
        },
      });
    } catch (err) {
      setError(err.message || "Failed to create match");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-medium">Add New Match</h3>
          <button onClick={onClose} disabled={loading}>
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
        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opponent*
                </label>
                <input
                  type="text"
                  required
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 disabled:bg-gray-100"
                  value={matchData.opponent}
                  onChange={(e) =>
                    setMatchData({ ...matchData, opponent: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location*
                </label>
                <input
                  type="text"
                  required
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 disabled:bg-gray-100"
                  value={matchData.location}
                  onChange={(e) =>
                    setMatchData({ ...matchData, location: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date*
                </label>
                <input
                  type="datetime-local"
                  required
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 disabled:bg-gray-100"
                  value={matchData.date}
                  onChange={(e) =>
                    setMatchData({ ...matchData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 disabled:bg-gray-100"
                  value={matchData.status}
                  onChange={(e) =>
                    setMatchData({ ...matchData, status: e.target.value })
                  }
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="finished">Finished</option>
                </select>
              </div>
            </div>

            {matchData.status === "finished" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Our Score
                    </label>
                    <input
                      type="number"
                      min="0"
                      disabled={loading}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 disabled:bg-gray-100"
                      value={matchData.ourScore || ""}
                      onChange={(e) =>
                        setMatchData({
                          ...matchData,
                          ourScore: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opponent Score
                    </label>
                    <input
                      type="number"
                      min="0"
                      disabled={loading}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 disabled:bg-gray-100"
                      value={matchData.opponentScore || ""}
                      onChange={(e) =>
                        setMatchData({
                          ...matchData,
                          opponentScore: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Result
                  </label>
                  <select
                    disabled={loading}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 disabled:bg-gray-100"
                    value={matchData.result}
                    onChange={(e) =>
                      setMatchData({ ...matchData, result: e.target.value })
                    }
                  >
                    <option value="Win">Win</option>
                    <option value="Loss">Loss</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-4">
                    Team Statistics
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(matchData.teamStats).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <input
                          type="number"
                          min="0"
                          disabled={loading}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 disabled:bg-gray-100"
                          value={value}
                          onChange={(e) =>
                            setMatchData({
                              ...matchData,
                              teamStats: {
                                ...matchData.teamStats,
                                [key]: parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm disabled:bg-yellow-300 flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Saving...
                </>
              ) : (
                "Save Match"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMatchModal;
