import { useState } from 'react';
import { motion } from 'framer-motion';
import QuestBoard from './components/QuestBoard';
import CharacterCard from './components/CharacterCard';
import Shop from './components/Shop';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import { Swords, User, ShoppingBag, LayoutDashboard, BookOpen } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [character, setCharacter] = useState({
    name: 'Adventurer',
    level: 1,
    xp: 0,
    class: 'Novice',
    strength: 10,
    intelligence: 10,
    charisma: 10,
    discipline: 10,
  });

  const [stats, setStats] = useState({
    coins: 100,
    currentStreak: 3,
    totalCoinsEarned: 100,
  });

  const handleCompleteQuest = ({ xp, coins }) => {
    setCharacter(prev => {
      const newXP = prev.xp + xp;
      const newLevel = Math.floor(newXP / 100) + 1;
      
      // Increase stats when leveling up
      if (newLevel > prev.level) {
        return {
          ...prev,
          xp: newXP,
          level: newLevel,
          strength: prev.strength + 2,
          intelligence: prev.intelligence + 2,
          charisma: prev.charisma + 1,
          discipline: prev.discipline + 3,
        };
      }
      
      return { ...prev, xp: newXP };
    });

    setStats(prev => ({
      ...prev,
      coins: prev.coins + coins,
      totalCoinsEarned: prev.totalCoinsEarned + coins,
    }));
  };

  const handlePurchase = (price) => {
    setStats(prev => ({
      ...prev,
      coins: prev.coins - price,
    }));
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'quests', label: 'Quests', icon: Swords },
    { id: 'character', label: 'Character', icon: User },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'journal', label: 'Journal', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-parchment-100 via-parchment-200 to-parchment-300">
      {/* Header */}
      <header className="bg-gradient-to-r from-fantasy-purple to-fantasy-blue text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-fantasy font-bold text-center">⚔️ Questify ⚔️</h1>
          <p className="text-center mt-2 text-parchment-100">Level Up Your Life</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-parchment-50 shadow-md border-b-2 border-parchment-400">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 py-4 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-fantasy font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-fantasy-purple text-white shadow-glow-purple'
                    : 'bg-parchment-200 text-parchment-800 hover:bg-parchment-300'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && (
            <Dashboard character={character} stats={stats} />
          )}
          {activeTab === 'quests' && (
            <QuestBoard onCompleteQuest={handleCompleteQuest} />
          )}
          {activeTab === 'character' && (
            <CharacterCard character={character} />
          )}
          {activeTab === 'shop' && (
            <Shop coins={stats.coins} onPurchase={handlePurchase} />
          )}
          {activeTab === 'journal' && (
            <Journal />
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-parchment-800 text-parchment-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="font-fantasy">Built with ⚔️ by adventurers, for adventurers</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

