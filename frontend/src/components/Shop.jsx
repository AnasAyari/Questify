import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Coins } from 'lucide-react';

const Shop = ({ coins, onPurchase }) => {
  const [items] = useState([
    {
      id: 1,
      name: 'Wizard Robe',
      type: 'outfit',
      price: 200,
      description: 'A mystical robe that channels arcane energy',
      emoji: '🧙‍♂️',
    },
    {
      id: 2,
      name: 'Knight Armor',
      type: 'outfit',
      price: 250,
      description: 'Shining armor for the brave warrior',
      emoji: '⚔️',
    },
    {
      id: 3,
      name: 'Dragon Pet',
      type: 'pet',
      price: 500,
      description: 'A loyal dragon companion',
      emoji: '🐉',
    },
    {
      id: 4,
      name: 'Phoenix Pet',
      type: 'pet',
      price: 600,
      description: 'A majestic phoenix that rises from ashes',
      emoji: '🔥',
    },
    {
      id: 5,
      name: 'Castle Background',
      type: 'background',
      price: 300,
      description: 'A grand castle backdrop',
      emoji: '🏰',
    },
    {
      id: 6,
      name: 'Forest Background',
      type: 'background',
      price: 250,
      description: 'A mystical forest setting',
      emoji: '🌲',
    },
  ]);

  const [purchasedItems, setPurchasedItems] = useState([]);

  const handlePurchase = (item) => {
    if (coins >= item.price && !purchasedItems.includes(item.id)) {
      setPurchasedItems([...purchasedItems, item.id]);
      onPurchase(item.price);
    }
  };

  const categoryItems = (type) => items.filter(item => item.type === type);

  const ItemCard = ({ item }) => {
    const isPurchased = purchasedItems.includes(item.id);
    const canAfford = coins >= item.price;

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-4 border-2 rounded-lg ${
          isPurchased
            ? 'bg-green-100 border-green-400'
            : 'bg-parchment-100 border-parchment-400'
        }`}
      >
        <div className="text-center mb-3">
          <span className="text-5xl">{item.emoji}</span>
        </div>
        <h3 className="text-lg font-semibold text-center mb-2">{item.name}</h3>
        <p className="text-sm text-parchment-600 text-center mb-3">{item.description}</p>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Coins size={18} className="text-fantasy-gold" />
          <span className="font-bold text-fantasy-gold">{item.price}</span>
        </div>
        {isPurchased ? (
          <button
            disabled
            className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold"
          >
            Owned
          </button>
        ) : (
          <button
            onClick={() => handlePurchase(item)}
            disabled={!canAfford}
            className={`w-full py-2 rounded-lg font-semibold ${
              canAfford
                ? 'btn-gold'
                : 'bg-parchment-300 text-parchment-500 cursor-not-allowed'
            }`}
          >
            {canAfford ? 'Purchase' : 'Not enough coins'}
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <div className="parchment-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-parchment-800">Shop</h2>
        <div className="flex items-center gap-2 px-4 py-2 bg-fantasy-gold rounded-lg shadow-glow">
          <Coins size={24} />
          <span className="text-xl font-bold">{coins}</span>
        </div>
      </div>

      {/* Outfits */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>👔</span> Outfits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryItems('outfit').map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Pets */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🐾</span> Pets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryItems('pet').map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Backgrounds */}
      <div>
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>🖼️</span> Backgrounds
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryItems('background').map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
