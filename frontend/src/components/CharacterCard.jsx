import { motion } from 'framer-motion';
import { Sword, Brain, Heart, Target } from 'lucide-react';

const CharacterCard = ({ character }) => {
  const stats = [
    { name: 'Strength', value: character.strength, icon: Sword, color: 'text-red-600' },
    { name: 'Intelligence', value: character.intelligence, icon: Brain, color: 'text-blue-600' },
    { name: 'Charisma', value: character.charisma, icon: Heart, color: 'text-pink-600' },
    { name: 'Discipline', value: character.discipline, icon: Target, color: 'text-purple-600' },
  ];

  const levelProgress = ((character.xp % 100) / 100) * 100;

  return (
    <div className="parchment-card">
      <h2 className="text-3xl font-bold mb-6 text-parchment-800">Character</h2>
      
      {/* Avatar Section */}
      <div className="flex items-center gap-6 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-32 h-32 bg-gradient-to-br from-fantasy-purple to-fantasy-blue rounded-full 
                     flex items-center justify-center border-4 border-fantasy-gold shadow-glow"
        >
          <span className="text-6xl">🧙</span>
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold text-parchment-800">{character.name}</h3>
          <p className="text-lg text-parchment-600">Level {character.level}</p>
          <p className="text-sm text-parchment-500">{character.class}</p>
        </div>
      </div>

      {/* XP Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold">XP Progress</span>
          <span className="text-fantasy-purple font-bold">{character.xp % 100}/100</span>
        </div>
        <div className="w-full h-6 bg-parchment-300 rounded-full overflow-hidden border-2 border-parchment-400">
          <motion.div
            className="xp-bar h-full"
            initial={{ width: 0 }}
            animate={{ width: `${levelProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="p-3 bg-parchment-100 rounded-lg border border-parchment-300">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={20} className={stat.color} />
              <span className="font-semibold text-sm">{stat.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-parchment-300 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${
                    stat.color === 'text-red-600' ? 'from-red-500 to-red-600' :
                    stat.color === 'text-blue-600' ? 'from-blue-500 to-blue-600' :
                    stat.color === 'text-pink-600' ? 'from-pink-500 to-pink-600' :
                    'from-purple-500 to-purple-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(stat.value / 100) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
              <span className="text-sm font-bold text-parchment-700">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterCard;
