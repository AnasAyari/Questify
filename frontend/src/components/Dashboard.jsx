import { motion } from 'framer-motion';
import { Trophy, Flame, Coins, Zap, TrendingUp } from 'lucide-react';

const Dashboard = ({ character, stats }) => {
  const levelProgress = ((character.xp % 100) / 100) * 100;
  
  const achievements = [
    { id: 1, name: 'First Quest', description: 'Complete your first quest', unlocked: true, emoji: '🎯' },
    { id: 2, name: 'Level 5', description: 'Reach level 5', unlocked: character.level >= 5, emoji: '⭐' },
    { id: 3, name: 'Wealthy', description: 'Earn 1000 coins', unlocked: stats.totalCoinsEarned >= 1000, emoji: '💰' },
    { id: 4, name: 'Streak Master', description: '7 day streak', unlocked: stats.currentStreak >= 7, emoji: '🔥' },
  ];

  return (
    <div className="parchment-card">
      <h2 className="text-3xl font-bold mb-6 text-parchment-800">Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg text-white shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap size={24} />
            <span className="text-sm font-semibold">Total XP</span>
          </div>
          <p className="text-3xl font-bold">{character.xp}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg text-white shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Coins size={24} />
            <span className="text-sm font-semibold">Coins</span>
          </div>
          <p className="text-3xl font-bold">{stats.coins}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg text-white shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <Flame size={24} />
            <span className="text-sm font-semibold">Streak</span>
          </div>
          <p className="text-3xl font-bold">{stats.currentStreak} days</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 bg-gradient-to-br from-green-500 to-green-700 rounded-lg text-white shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={24} />
            <span className="text-sm font-semibold">Level</span>
          </div>
          <p className="text-3xl font-bold">{character.level}</p>
        </motion.div>
      </div>

      {/* XP Progress */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Level Progress</h3>
        <div className="p-4 bg-parchment-100 rounded-lg border-2 border-parchment-400">
          <div className="flex justify-between text-sm mb-2">
            <span>Level {character.level}</span>
            <span className="text-fantasy-purple font-bold">{character.xp % 100}/100 XP</span>
            <span>Level {character.level + 1}</span>
          </div>
          <div className="w-full h-8 bg-parchment-300 rounded-full overflow-hidden border-2 border-parchment-400">
            <motion.div
              className="xp-bar h-full flex items-center justify-center text-white font-bold"
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 0.5 }}
            >
              {levelProgress > 10 && `${levelProgress.toFixed(0)}%`}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="text-fantasy-gold" size={24} />
          Achievements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg border-2 ${
                achievement.unlocked
                  ? 'bg-fantasy-gold bg-opacity-20 border-fantasy-gold'
                  : 'bg-parchment-100 border-parchment-400 opacity-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{achievement.emoji}</span>
                <div>
                  <h4 className="font-bold text-lg">{achievement.name}</h4>
                  <p className="text-sm text-parchment-600">{achievement.description}</p>
                  {achievement.unlocked && (
                    <span className="text-xs text-green-600 font-semibold">✓ Unlocked</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
