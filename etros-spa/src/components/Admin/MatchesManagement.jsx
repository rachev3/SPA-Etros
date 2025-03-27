import React, { useState } from "react";

const MatchesManagement = () => {
  // Sample matches data
  const [matches, setMatches] = useState([
    {
      id: 1,
      homeTeam: "Etros FC",
      awayTeam: "Eagles United",
      homeScore: 2,
      awayScore: 1,
      date: "2023-09-15",
      time: "15:00",
      venue: "Etros Arena",
      competition: "League",
      status: "Completed",
      season: "2023-2024",
    },
    {
      id: 2,
      homeTeam: "Phoenix FC",
      awayTeam: "Etros FC",
      homeScore: 0,
      awayScore: 3,
      date: "2023-09-22",
      time: "19:30",
      venue: "Phoenix Stadium",
      competition: "League",
      status: "Completed",
      season: "2023-2024",
    },
    {
      id: 3,
      homeTeam: "Etros FC",
      awayTeam: "Riverside Rovers",
      homeScore: null,
      awayScore: null,
      date: "2023-10-05",
      time: "15:00",
      venue: "Etros Arena",
      competition: "Cup",
      status: "Scheduled",
      season: "2023-2024",
    },
    {
      id: 4,
      homeTeam: "Athletic FC",
      awayTeam: "Etros FC",
      homeScore: null,
      awayScore: null,
      date: "2023-10-12",
      time: "20:00",
      venue: "Athletic Stadium",
      competition: "League",
      status: "Scheduled",
      season: "2023-2024",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");

  const filteredMatches = matches.filter((match) => {
    const matchSearchTerm =
      match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.competition.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus && filterStatus !== match.status) {
      return false;
    }

    return matchSearchTerm;
  });

  const handleAddNew = () => {
    setCurrentMatch({
      id: matches.length + 1,
      homeTeam: "",
      awayTeam: "",
      homeScore: null,
      awayScore: null,
      date: "",
      time: "",
      venue: "",
      competition: "League",
      status: "Scheduled",
      season: "2023-2024",
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (match) => {
    setCurrentMatch({ ...match });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setMatches(matches.filter((match) => match.id !== id));
    setDeleteConfirmId(null);
  };

  const handleSave = (match, isNew = false) => {
    if (isNew) {
      setMatches([...matches, match]);
      setIsAddModalOpen(false);
    } else {
      setMatches(matches.map((m) => (m.id === match.id ? match : m)));
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Matches Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add Match
        </button>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              placeholder="Search matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Postponed">Postponed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
              <option value="">All Competitions</option>
              <option value="league">League</option>
              <option value="cup">Cup</option>
              <option value="friendly">Friendly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Matches table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Match
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date & Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Competition
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Venue
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMatches.length > 0 ? (
              filteredMatches.map((match) => (
                <tr key={match.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {match.homeTeam}
                      </div>
                      <div className="font-medium text-gray-900 mt-1">
                        {match.awayTeam}
                      </div>
                    </div>
                    {match.status === "Completed" && (
                      <div className="text-sm font-bold mt-1">
                        {match.homeScore} - {match.awayScore}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{match.date}</div>
                    <div className="text-sm text-gray-500">{match.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {match.competition}
                    </div>
                    <div className="text-sm text-gray-500">{match.season}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{match.venue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        match.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : match.status === "Scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : match.status === "Postponed"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {match.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {deleteConfirmId === match.id ? (
                      <div className="flex justify-end items-center space-x-2">
                        <span className="text-xs text-gray-600">Confirm?</span>
                        <button
                          onClick={() => handleDelete(match.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => handleEdit(match)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(match.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No matches found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredMatches.length}</span>{" "}
          of <span className="font-medium">{matches.length}</span> matches
        </div>
        <div className="flex space-x-2">
          <button
            disabled
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Match Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-medium">Add New Match</h3>
              <button onClick={() => setIsAddModalOpen(false)}>
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
            <div className="p-4">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Home Team
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.homeTeam || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          homeTeam: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Away Team
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.awayTeam || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          awayTeam: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.date || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.time || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          time: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Venue
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.venue || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          venue: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Competition
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.competition || "League"}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          competition: e.target.value,
                        })
                      }
                    >
                      <option value="League">League</option>
                      <option value="Cup">Cup</option>
                      <option value="Friendly">Friendly</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.status || "Scheduled"}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Postponed">Postponed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Season
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.season || "2023-2024"}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          season: e.target.value,
                        })
                      }
                    >
                      <option value="2023-2024">2023-2024</option>
                      <option value="2022-2023">2022-2023</option>
                    </select>
                  </div>
                </div>

                {currentMatch?.status === "Completed" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Home Score
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={currentMatch?.homeScore || 0}
                        onChange={(e) =>
                          setCurrentMatch({
                            ...currentMatch,
                            homeScore: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Away Score
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={currentMatch?.awayScore || 0}
                        onChange={(e) =>
                          setCurrentMatch({
                            ...currentMatch,
                            awayScore: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave(currentMatch, true)}
                    className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm"
                  >
                    Save Match
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Match Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-medium">Edit Match</h3>
              <button onClick={() => setIsEditModalOpen(false)}>
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
            <div className="p-4">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Home Team
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.homeTeam || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          homeTeam: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Away Team
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.awayTeam || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          awayTeam: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.date || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.time || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          time: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Venue
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.venue || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          venue: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Competition
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.competition || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          competition: e.target.value,
                        })
                      }
                    >
                      <option value="League">League</option>
                      <option value="Cup">Cup</option>
                      <option value="Friendly">Friendly</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.status || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Postponed">Postponed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Season
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentMatch?.season || ""}
                      onChange={(e) =>
                        setCurrentMatch({
                          ...currentMatch,
                          season: e.target.value,
                        })
                      }
                    >
                      <option value="2023-2024">2023-2024</option>
                      <option value="2022-2023">2022-2023</option>
                    </select>
                  </div>
                </div>

                {currentMatch?.status === "Completed" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Home Score
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={currentMatch?.homeScore || 0}
                        onChange={(e) =>
                          setCurrentMatch({
                            ...currentMatch,
                            homeScore: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Away Score
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        value={currentMatch?.awayScore || 0}
                        onChange={(e) =>
                          setCurrentMatch({
                            ...currentMatch,
                            awayScore: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave(currentMatch)}
                    className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm"
                  >
                    Update Match
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchesManagement;
