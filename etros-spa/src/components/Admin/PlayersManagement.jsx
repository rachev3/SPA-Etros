import React, { useState } from "react";
import { Link } from "react-router";

const PlayersManagement = () => {
  // Sample players data
  const [players, setPlayers] = useState([
    {
      id: 1,
      name: "John Smith",
      position: "Forward",
      jerseyNumber: 10,
      dateOfBirth: "1995-06-15",
      nationality: "England",
      height: 185,
      weight: 80,
      joinedDate: "2020-07-01",
      status: "Active",
      previousClub: "Arsenal FC",
      image: null,
    },
    {
      id: 2,
      name: "Michael Johnson",
      position: "Defender",
      jerseyNumber: 4,
      dateOfBirth: "1993-03-22",
      nationality: "France",
      height: 188,
      weight: 85,
      joinedDate: "2019-08-15",
      status: "Active",
      previousClub: "Lyon",
      image: null,
    },
    {
      id: 3,
      name: "David Williams",
      position: "Goalkeeper",
      jerseyNumber: 1,
      dateOfBirth: "1990-11-10",
      nationality: "Spain",
      height: 192,
      weight: 90,
      joinedDate: "2018-06-30",
      status: "Injured",
      previousClub: "Atletico Madrid",
      image: null,
    },
    {
      id: 4,
      name: "James Brown",
      position: "Midfielder",
      jerseyNumber: 8,
      dateOfBirth: "1997-02-28",
      nationality: "Brazil",
      height: 175,
      weight: 70,
      joinedDate: "2021-01-15",
      status: "Active",
      previousClub: "Flamengo",
      image: null,
    },
    {
      id: 5,
      name: "Robert Davis",
      position: "Forward",
      jerseyNumber: 9,
      dateOfBirth: "1994-09-05",
      nationality: "Germany",
      height: 182,
      weight: 78,
      joinedDate: "2020-08-10",
      status: "Suspended",
      previousClub: "Borussia Dortmund",
      image: null,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [filterPosition, setFilterPosition] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredPlayers = players.filter((player) => {
    const matchSearchTerm =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(player.jerseyNumber).includes(searchTerm);

    if (filterPosition && player.position !== filterPosition) {
      return false;
    }

    if (filterStatus && player.status !== filterStatus) {
      return false;
    }

    return matchSearchTerm;
  });

  const handleAddNew = () => {
    setCurrentPlayer({
      id: players.length + 1,
      name: "",
      position: "Forward",
      jerseyNumber: "",
      dateOfBirth: "",
      nationality: "",
      height: "",
      weight: "",
      joinedDate: "",
      status: "Active",
      previousClub: "",
      image: null,
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (player) => {
    setCurrentPlayer({ ...player });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
    setDeleteConfirmId(null);
  };

  const handleSave = (player, isNew = false) => {
    if (isNew) {
      setPlayers([...players, player]);
      setIsAddModalOpen(false);
    } else {
      setPlayers(players.map((p) => (p.id === player.id ? player : p)));
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Players Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Add Player
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
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
            >
              <option value="">All Positions</option>
              <option value="Forward">Forward</option>
              <option value="Midfielder">Midfielder</option>
              <option value="Defender">Defender</option>
              <option value="Goalkeeper">Goalkeeper</option>
            </select>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Injured">Injured</option>
              <option value="Suspended">Suspended</option>
              <option value="Loaned">Loaned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Players table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Player
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Position
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nationality
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
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
                        {player.image ? (
                          <img
                            src={player.image}
                            alt={player.name}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <span className="text-gray-600 font-medium">
                            {player.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {player.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          #{player.jerseyNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {player.position}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {player.nationality}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        player.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : player.status === "Injured"
                          ? "bg-red-100 text-red-800"
                          : player.status === "Suspended"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {player.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {deleteConfirmId === player.id ? (
                      <div className="flex justify-end items-center space-x-2">
                        <span className="text-xs text-gray-600">Confirm?</span>
                        <button
                          onClick={() => handleDelete(player.id)}
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
                        <Link
                          to={`/admin/players/${player.id}/stats`}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Stats
                        </Link>
                        <button
                          onClick={() => handleEdit(player)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(player.id)}
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
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No players found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredPlayers.length}</span>{" "}
          of <span className="font-medium">{players.length}</span> players
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

      {/* Add Player Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-medium">Add New Player</h3>
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
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.name || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jersey Number
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.jerseyNumber || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          jerseyNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.position || "Forward"}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          position: e.target.value,
                        })
                      }
                    >
                      <option value="Forward">Forward</option>
                      <option value="Midfielder">Midfielder</option>
                      <option value="Defender">Defender</option>
                      <option value="Goalkeeper">Goalkeeper</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.nationality || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          nationality: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.dateOfBirth || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          dateOfBirth: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Joined Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.joinedDate || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          joinedDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      min="150"
                      max="220"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.height || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          height: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="120"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.weight || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          weight: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.status || "Active"}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Injured">Injured</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Loaned">Loaned</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Previous Club
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.previousClub || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          previousClub: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Player Image
                  </label>
                  <input
                    type="file"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    accept="image/*"
                  />
                </div>

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
                    onClick={() => handleSave(currentPlayer, true)}
                    className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm"
                  >
                    Save Player
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Player Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-medium">Edit Player</h3>
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
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.name || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jersey Number
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.jerseyNumber || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          jerseyNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.position || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          position: e.target.value,
                        })
                      }
                    >
                      <option value="Forward">Forward</option>
                      <option value="Midfielder">Midfielder</option>
                      <option value="Defender">Defender</option>
                      <option value="Goalkeeper">Goalkeeper</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.nationality || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          nationality: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.dateOfBirth || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          dateOfBirth: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Joined Date
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.joinedDate || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          joinedDate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      min="150"
                      max="220"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.height || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          height: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      min="50"
                      max="120"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.weight || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          weight: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.status || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Injured">Injured</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Loaned">Loaned</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Previous Club
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      value={currentPlayer?.previousClub || ""}
                      onChange={(e) =>
                        setCurrentPlayer({
                          ...currentPlayer,
                          previousClub: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Player Image
                  </label>
                  <input
                    type="file"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    accept="image/*"
                  />
                </div>

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
                    onClick={() => handleSave(currentPlayer)}
                    className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm"
                  >
                    Update Player
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

export default PlayersManagement;
