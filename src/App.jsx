import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Edit2, Trash2, Play, Shuffle } from 'lucide-react';

// Utility function to calculate player score
const calculatePlayerScore = (player) => {
  const scoreMap = { High: 3, Medium: 2, Low: 1 };
  return (
    scoreMap[player.stamina] +
    scoreMap[player.strength] +
    scoreMap[player.technique]
  );
};

// Team balancing algorithm
const balanceTeams = (selectedPlayers) => {
  if (selectedPlayers.length < 2) return { team1: selectedPlayers, team2: [] };

  // Sort players by score (descending) for snake draft
  const sortedPlayers = [...selectedPlayers].sort((a, b) => {
    return calculatePlayerScore(b) - calculatePlayerScore(a);
  });

  const team1 = [];
  const team2 = [];
  
  // Count positions and experience in each team
  const getTeamStats = (team) => {
    const positions = { Goalkeeper: 0, Defender: 0, Midfielder: 0, Forward: 0 };
    const experience = { High: 0, Medium: 0, Low: 0 };
    let totalScore = 0;
    
    team.forEach(p => {
      positions[p.position]++;
      experience[p.experience]++;
      totalScore += calculatePlayerScore(p);
    });
    
    return { positions, experience, totalScore };
  };

  // Snake draft with position and experience balancing
  sortedPlayers.forEach((player) => {
    const team1Stats = getTeamStats(team1);
    const team2Stats = getTeamStats(team2);
    
    // Decide which team gets the player
    if (team1.length === team2.length) {
      // Equal sizes - prioritize score balance
      if (team1Stats.totalScore <= team2Stats.totalScore) {
        team1.push(player);
      } else {
        team2.push(player);
      }
    } else if (team1.length < team2.length) {
      team1.push(player);
    } else {
      team2.push(player);
    }
  });

  return { team1, team2 };
};

// Player Form Component
const PlayerForm = ({ player, onSave, onCancel }) => {
  const [formData, setFormData] = useState(player || {
    id: Date.now(),
    name: '',
    position: 'Midfielder',
    stamina: 'Medium',
    strength: 'Medium',
    technique: 'Medium',
    experience: 'Medium'
  });

  const handleSubmit = () => {
    if (formData.name.trim()) {
      onSave(formData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">{player ? 'Speler bewerken' : 'Nieuwe speler toevoegen'}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Naam *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Naam van speler"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Positie</label>
          <select
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Goalkeeper">Keeper</option>
            <option value="Defender">Verdediger</option>
            <option value="Midfielder">Middenvelder</option>
            <option value="Forward">Aanvaller</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Conditie</label>
          <select
            value={formData.stamina}
            onChange={(e) => setFormData({ ...formData, stamina: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Low">Laag</option>
            <option value="Medium">Gemiddeld</option>
            <option value="High">Hoog</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Kracht</label>
          <select
            value={formData.strength}
            onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Low">Laag</option>
            <option value="Medium">Gemiddeld</option>
            <option value="High">Hoog</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Techniek</label>
          <select
            value={formData.technique}
            onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Low">Laag</option>
            <option value="Medium">Gemiddeld</option>
            <option value="High">Hoog</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ervaring (Leeftijd)</label>
          <select
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Low">Jong</option>
            <option value="Medium">Gemiddeld</option>
            <option value="High">Ervaren</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          {player ? 'Bijwerken' : 'Toevoegen'}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
        >
          Annuleren
        </button>
      </div>
    </div>
  );
};

// Main App Component
const SoccerTeamBalancer = () => {
  // State management
  const [players, setPlayers] = useState([]);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const [teams, setTeams] = useState(null);
  const [currentView, setCurrentView] = useState('manage');
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load players from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('soccerPlayers');
    if (saved) {
      try {
        setPlayers(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading players:', e);
      }
    }
  }, []);

  // Save players to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('soccerPlayers', JSON.stringify(players));
  }, [players]);

  // Player CRUD operations
  const addPlayer = (player) => {
    setPlayers([...players, { ...player, id: Date.now() }]);
    setShowForm(false);
  };

  const updatePlayer = (updatedPlayer) => {
    setPlayers(players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p));
    setEditingPlayer(null);
  };

  const deletePlayer = (id) => {
    if (window.confirm('Weet je zeker dat je deze speler wilt verwijderen?')) {
      setPlayers(players.filter(p => p.id !== id));
      setSelectedPlayerIds(selectedPlayerIds.filter(pid => pid !== id));
    }
  };

  // Team generation
  const generateTeams = () => {
    const selected = players.filter(p => selectedPlayerIds.includes(p.id));
    const balanced = balanceTeams(selected);
    setTeams(balanced);
    setCurrentView('teams');
  };

  const reshuffleTeams = () => {
    const selected = players.filter(p => selectedPlayerIds.includes(p.id));
    // Shuffle the array randomly before balancing
    const shuffled = selected.sort(() => Math.random() - 0.5);
    const balanced = balanceTeams(shuffled);
    setTeams(balanced);
  };

  // Position translation
  const translatePosition = (pos) => {
    const translations = {
      'Goalkeeper': 'Keeper',
      'Defender': 'Verdediger',
      'Midfielder': 'Middenvelder',
      'Forward': 'Aanvaller'
    };
    return translations[pos] || pos;
  };

  // View: Player Management
  const ManagePlayersView = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Spelersbeheer</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
        >
          <UserPlus size={20} /> Speler toevoegen
        </button>
      </div>

      {(showForm || editingPlayer) && (
        <PlayerForm
          player={editingPlayer}
          onSave={editingPlayer ? updatePlayer : addPlayer}
          onCancel={() => {
            setShowForm(false);
            setEditingPlayer(null);
          }}
        />
      )}

      {players.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Users size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600">Nog geen spelers. Voeg je eerste speler toe om te beginnen!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {players.map(player => (
            <div key={player.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{player.name}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                    {translatePosition(player.position)}
                  </span>
                  <span className="mr-3">Conditie: {player.stamina === 'High' ? 'Hoog' : player.stamina === 'Medium' ? 'Gemiddeld' : 'Laag'}</span>
                  <span className="mr-3">Kracht: {player.strength === 'High' ? 'Hoog' : player.strength === 'Medium' ? 'Gemiddeld' : 'Laag'}</span>
                  <span className="mr-3">Techniek: {player.technique === 'High' ? 'Hoog' : player.technique === 'Medium' ? 'Gemiddeld' : 'Laag'}</span>
                  <span>Ervaring: {player.experience === 'High' ? 'Hoog' : player.experience === 'Medium' ? 'Gemiddeld' : 'Laag'}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingPlayer(player)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  title="Bewerken"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => deletePlayer(player.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  title="Verwijderen"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {players.length > 0 && (
        <button
          onClick={() => setCurrentView('select')}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 w-full flex items-center justify-center gap-2"
        >
          <Play size={20} /> Wedstrijd opstellen
        </button>
      )}
    </div>
  );

  // View: Player Selection
  const SelectPlayersView = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Selecteer spelers voor de wedstrijd</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 mb-4">
          Geselecteerd: {selectedPlayerIds.length} / {players.length} spelers
        </p>
        
        <div className="space-y-2">
          {players.map(player => (
            <label key={player.id} className="flex items-center p-3 hover:bg-gray-50 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPlayerIds.includes(player.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPlayerIds([...selectedPlayerIds, player.id]);
                  } else {
                    setSelectedPlayerIds(selectedPlayerIds.filter(id => id !== player.id));
                  }
                }}
                className="w-5 h-5 mr-3"
              />
              <div className="flex-1">
                <span className="font-medium">{player.name}</span>
                <span className="text-sm text-gray-500 ml-3">{translatePosition(player.position)}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setCurrentView('manage')}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400"
        >
          Terug
        </button>
        <button
          onClick={generateTeams}
          disabled={selectedPlayerIds.length < 2}
          className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Teams genereren
        </button>
      </div>
    </div>
  );

  // View: Teams Display
  const TeamsView = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gegenereerde teams</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-300">
          <h3 className="text-xl font-bold mb-4 text-blue-900">Team 1</h3>
          <div className="space-y-2">
            {teams.team1.map(player => (
              <div key={player.id} className="bg-white p-3 rounded shadow-sm">
                <p className="font-medium">{player.name}</p>
                <p className="text-sm text-gray-600">{translatePosition(player.position)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-lg border-2 border-red-300">
          <h3 className="text-xl font-bold mb-4 text-red-900">Team 2</h3>
          <div className="space-y-2">
            {teams.team2.map(player => (
              <div key={player.id} className="bg-white p-3 rounded shadow-sm">
                <p className="font-medium">{player.name}</p>
                <p className="text-sm text-gray-600">{translatePosition(player.position)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setCurrentView('select')}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400"
        >
          Terug naar selectie
        </button>
        <button
          onClick={reshuffleTeams}
          className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 flex items-center justify-center gap-2"
        >
          <Shuffle size={20} /> Teams opnieuw verdelen
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">⚽ Soccer Team Balancer</h1>
          <p className="text-gray-600">Maak eerlijke en gebalanceerde teams voor je wedstrijden</p>
        </div>

        {currentView === 'manage' && <ManagePlayersView />}
        {currentView === 'select' && <SelectPlayersView />}
        {currentView === 'teams' && <TeamsView />}
      </div>
    </div>
  );
};

export default SoccerTeamBalancer;