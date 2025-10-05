import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Calendar } from 'lucide-react';

const Journal = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      content: 'Started my journey in Questify today! Excited to build better habits and level up my character.',
    },
  ]);
  
  const [newEntry, setNewEntry] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addEntry = () => {
    if (newEntry.trim()) {
      const entry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        content: newEntry,
      };
      setEntries([entry, ...entries]);
      setNewEntry('');
      setIsAdding(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="parchment-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-parchment-800 flex items-center gap-2">
          <BookOpen size={32} />
          Journal
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          New Entry
        </button>
      </div>

      {/* New Entry Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-parchment-100 rounded-lg border-2 border-fantasy-purple"
        >
          <div className="flex items-center gap-2 mb-3 text-parchment-600">
            <Calendar size={16} />
            <span className="text-sm">{formatDate(new Date().toISOString().split('T')[0])}</span>
          </div>
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="What's on your mind today?"
            className="w-full p-3 border-2 border-parchment-400 rounded-lg resize-none focus:border-fantasy-purple focus:outline-none bg-white"
            rows="6"
          />
          <div className="flex gap-2 mt-3">
            <button onClick={addEntry} className="btn-primary">
              Save Entry
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewEntry('');
              }}
              className="px-6 py-3 rounded-lg font-fantasy font-semibold border-2 border-parchment-400 
                         bg-parchment-200 hover:bg-parchment-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Entries List */}
      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-12 text-parchment-500">
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <p>No journal entries yet. Start writing to track your journey!</p>
          </div>
        ) : (
          entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-parchment-100 rounded-lg border-2 border-parchment-400 hover:border-fantasy-purple transition-colors"
            >
              <div className="flex items-center gap-2 mb-3 text-parchment-600">
                <Calendar size={16} />
                <span className="text-sm font-semibold">{formatDate(entry.date)}</span>
              </div>
              <p className="text-parchment-800 leading-relaxed whitespace-pre-wrap">
                {entry.content}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
