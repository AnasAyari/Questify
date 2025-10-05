import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Coins, Zap } from 'lucide-react';

const QuestBoard = ({ onCompleteQuest }) => {
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: 'Morning Exercise',
      description: 'Complete 30 minutes of physical activity',
      xp: 50,
      coins: 20,
      completed: false,
      difficulty: 'Easy',
    },
    {
      id: 2,
      title: 'Study Session',
      description: 'Focus on learning for 1 hour',
      xp: 100,
      coins: 40,
      completed: false,
      difficulty: 'Medium',
    },
    {
      id: 3,
      title: 'Deep Work',
      description: 'Complete a challenging project task',
      xp: 200,
      coins: 80,
      completed: false,
      difficulty: 'Hard',
    },
    {
      id: 4,
      title: 'Read 30 Pages',
      description: 'Read from a book or educational material',
      xp: 75,
      coins: 30,
      completed: false,
      difficulty: 'Medium',
    },
  ]);

  const completeQuest = (questId) => {
    const quest = quests.find(q => q.id === questId);
    if (quest && !quest.completed) {
      setQuests(quests.map(q => 
        q.id === questId ? { ...q, completed: true } : q
      ));
      onCompleteQuest({ xp: quest.xp, coins: quest.coins });
    }
  };

  const difficultyColor = {
    'Easy': 'text-green-600',
    'Medium': 'text-yellow-600',
    'Hard': 'text-red-600',
  };

  return (
    <div className="parchment-card">
      <h2 className="text-3xl font-bold mb-6 text-parchment-800">Quest Board</h2>
      <div className="space-y-4">
        {quests.map((quest) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-4 border-2 rounded-lg transition-all ${
              quest.completed
                ? 'bg-green-100 border-green-400 opacity-75'
                : 'bg-parchment-100 border-parchment-400 hover:border-fantasy-purple'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`text-xl font-semibold ${quest.completed ? 'line-through' : ''}`}>
                    {quest.title}
                  </h3>
                  <span className={`stat-badge ${difficultyColor[quest.difficulty]}`}>
                    {quest.difficulty}
                  </span>
                </div>
                <p className="text-parchment-700 mb-3">{quest.description}</p>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1 text-fantasy-purple">
                    <Zap size={16} />
                    <span className="font-semibold">{quest.xp} XP</span>
                  </div>
                  <div className="flex items-center gap-1 text-fantasy-gold">
                    <Coins size={16} />
                    <span className="font-semibold">{quest.coins} Coins</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => completeQuest(quest.id)}
                disabled={quest.completed}
                className={`ml-4 ${
                  quest.completed
                    ? 'text-green-600 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {quest.completed ? (
                  <CheckCircle size={24} />
                ) : (
                  'Complete'
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuestBoard;
