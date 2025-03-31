import React, { useState, useMemo } from "react";
import { useMatches } from "../../api/matchApi";
import MatchList from "./MatchList";
import PaginationControls from "./PaginationControls";

const ScheduleTabs = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 3;

  const filters = useMemo(
    () => ({
      status: activeTab === "upcoming" ? "upcoming" : "finished",
    }),
    [activeTab]
  );

  const { matches, loading, error, pagination } = useMatches(
    currentPage,
    matchesPerPage,
    filters
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => {
              setActiveTab("upcoming");
              setCurrentPage(1);
            }}
            className={`py-3 px-6 font-medium text-lg transition-colors duration-200 border-b-2 -mb-px ${
              activeTab === "upcoming"
                ? "border-yellow-500 text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Upcoming Games
          </button>
          <button
            onClick={() => {
              setActiveTab("past");
              setCurrentPage(1);
            }}
            className={`py-3 px-6 font-medium text-lg transition-colors duration-200 border-b-2 -mb-px ${
              activeTab === "past"
                ? "border-yellow-500 text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Past Results
          </button>
        </div>

        {/* Matches Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 bg-black">
            <h2 className="text-2xl font-bold text-yellow-400">
              {activeTab === "upcoming" ? "Upcoming Games" : "Past Results"}
            </h2>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading matches...
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">
              Failed to load matches
            </div>
          ) : (
            <>
              <MatchList matches={matches} activeTab={activeTab} />
              <PaginationControls
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                onChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScheduleTabs;
