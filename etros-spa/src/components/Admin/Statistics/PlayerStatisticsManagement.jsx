import React, { useState } from "react";
import AddStatModal from "./AddStatModal";
import EditStatModal from "./EditStatModal";
import MatchSelector from "./MatchSelector";
import PlayerStatsList from "./PlayerStatsList";
import { usePlayers } from "../../../api/playerApi";
import {
  useCreatePlayerStats,
  useUpdatePlayerStats,
} from "../../../api/playerStatsApi";

const PlayerStatisticsManagement = () => {
  // State for UI
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState(null);

  // Get players for modals
  const { players } = usePlayers();

  // API mutation hooks
  const { create: createPlayerStats } = useCreatePlayerStats();
  const { update: updatePlayerStats } = useUpdatePlayerStats();

  // Handler functions
  const handleAddStat = () => {
    if (!selectedMatch) {
      alert("Please select a match first");
      return;
    }

    setCurrentStat({
      matchId: selectedMatch._id,
      playerId: "",
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
      plusMinus: 0,
      efficiency: 0,
      totalPoints: 0,
    });
    setIsAddModalOpen(true);
  };

  const handleEditStat = (stat) => {
    setCurrentStat({ ...stat });
    setIsEditModalOpen(true);
  };

  const handleSaveStat = async (stat, isNew = false) => {
    try {
      if (isNew) {
        await createPlayerStats(stat);
        setIsAddModalOpen(false);
      } else {
        await updatePlayerStats(stat._id, stat);
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error saving stat:", error);
      alert("Failed to save statistic");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Player Statistics Management
        </h1>
      </div>

      <MatchSelector
        selectedMatch={selectedMatch}
        onMatchSelect={setSelectedMatch}
      />

      {selectedMatch && (
        <PlayerStatsList
          selectedMatch={selectedMatch}
          onEditStat={handleEditStat}
          onAddStat={handleAddStat}
        />
      )}

      {/* Add Stat Modal */}
      {isAddModalOpen && (
        <AddStatModal
          stat={currentStat}
          players={players}
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={(stat) => handleSaveStat(stat, true)}
        />
      )}

      {/* Edit Stat Modal */}
      {isEditModalOpen && (
        <EditStatModal
          stat={currentStat}
          players={players}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveStat}
        />
      )}
    </div>
  );
};

export default PlayerStatisticsManagement;
