import React, { useState, useEffect } from 'react';
import { getNetCalories, getTotalCaloriesBurned, getTotalCaloriesConsumed, getUserProfile } from '../services/api';

const Dashboard = ({ userId }) => {
  const [stats, setStats] = useState({
    netCalories: 0,
    burned: 0,
    consumed: 0,
    dailyGoal: 2000,
    currentWeight: 0,
    weightGoal: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [netResponse, burnedResponse, consumedResponse, profileResponse] = await Promise.all([
          getNetCalories(userId),
          getTotalCaloriesBurned(userId),
          getTotalCaloriesConsumed(userId),
          getUserProfile(userId)
        ]);
        
        const userProfile = profileResponse.data;
        setStats({
          netCalories: netResponse.data || 0,
          burned: burnedResponse.data || 0,
          consumed: consumedResponse.data || 0,
          dailyGoal: userProfile.dailyCalorieGoal || 2000,
          currentWeight: userProfile.currentWeight || 0,
          weightGoal: userProfile.weightGoal || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  const getProgressPercentage = () => {
    const remaining = stats.dailyGoal - stats.consumed + stats.burned;
    return Math.max(0, Math.min(100, ((stats.dailyGoal - remaining) / stats.dailyGoal) * 100));
  };

  const getWeightProgress = () => {
    if (!stats.currentWeight || !stats.weightGoal) return 0;
    const diff = Math.abs(stats.currentWeight - stats.weightGoal);
    const progress = Math.max(0, Math.min(100, (1 - diff / Math.max(stats.currentWeight, stats.weightGoal)) * 100));
    return progress;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calories Burned Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Calories Burned</h3>
              <p className="text-3xl font-bold text-emerald-600">{stats.burned}</p>
              <p className="text-sm text-gray-500">Through workouts</p>
            </div>
            <div className="text-emerald-500 text-2xl">🔥</div>
          </div>
        </div>

        {/* Calories Consumed Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Calories Consumed</h3>
              <p className="text-3xl font-bold text-red-600">{stats.consumed}</p>
              <p className="text-sm text-gray-500">Through meals</p>
            </div>
            <div className="text-red-500 text-2xl">🍽️</div>
          </div>
        </div>

        {/* Net Calories Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Net Calories</h3>
              <p className={`text-3xl font-bold ${stats.netCalories < 0 ? 'text-amber-600' : 'text-blue-600'}`}>
                {stats.netCalories}
              </p>
              <p className="text-sm text-gray-500">Daily balance</p>
            </div>
            <div className="text-amber-500 text-2xl">⚖️</div>
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calorie Goal Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Daily Calorie Goal</h3>
            <span className="text-sm font-medium text-emerald-600">
              {Math.round(getProgressPercentage())}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-emerald-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>0 cal</span>
            <span>Goal: {stats.dailyGoal} cal</span>
          </div>
        </div>

        {/* Weight Goal Progress */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Weight Goal Progress</h3>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(getWeightProgress())}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${getWeightProgress()}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Current: {stats.currentWeight} kg</span>
            <span>Goal: {stats.weightGoal} kg</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-emerald-50 rounded-lg p-4 text-center">
          <div className="text-emerald-600 font-bold text-xl">{stats.burned}</div>
          <div className="text-emerald-800 text-sm">Burned</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-red-600 font-bold text-xl">{stats.consumed}</div>
          <div className="text-red-800 text-sm">Consumed</div>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 text-center">
          <div className="text-amber-600 font-bold text-xl">{stats.netCalories}</div>
          <div className="text-amber-800 text-sm">Net</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-blue-600 font-bold text-xl">
            {stats.dailyGoal - stats.consumed + stats.burned}
          </div>
          <div className="text-blue-800 text-sm">Remaining</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;