import React, { useState } from 'react';
import { createActivity } from '../services/api';

const ActivityForm = ({ userId, onActivityAdded }) => {
  const [formData, setFormData] = useState({
    description: '',
    calories: '',
    category: 'CARDIO',
    type: 'BURN'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createActivity({
        ...formData,
        userId: userId,
        calories: parseFloat(formData.calories)
      });
      setFormData({ description: '', calories: '', category: 'CARDIO', type: 'BURN' });
      onActivityAdded();
      alert('Activity logged successfully! 🎉');
    } catch (error) {
      console.error('Error creating activity:', error);
      alert('Error logging activity. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-emerald-800 mb-4">Log Health Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="BURN">Calories Burned (Workout)</option>
            <option value="INTAKE">Calories Consumed (Food)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="CARDIO">Cardio</option>
            <option value="STRENGTH">Strength Training</option>
            <option value="MEAL">Meal</option>
            <option value="SNACK">Snack</option>
            <option value="WATER">Water</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <input
            type="text"
            placeholder={formData.type === 'BURN' ? 'e.g., Morning Run, Yoga' : 'e.g., Chicken Salad, Apple'}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calories {formData.type === 'BURN' ? 'Burned' : 'Consumed'}
          </label>
          <input
            type="number"
            placeholder="Enter calories"
            value={formData.calories}
            onChange={(e) => setFormData({...formData, calories: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
        >
          Log Activity
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;