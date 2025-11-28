import React, { useState, useEffect } from 'react';
import { getUserProfile, updateCalorieGoal, updateWeightGoal } from '../services/api';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(userId);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleCalorieGoalUpdate = async (goal) => {
    try {
      await updateCalorieGoal(userId, goal);
      setUser({...user, dailyCalorieGoal: goal});
      alert('Calorie goal updated successfully! 🎯');
    } catch (error) {
      console.error('Error updating calorie goal:', error);
    }
  };

  const handleWeightGoalUpdate = async (goal) => {
    try {
      await updateWeightGoal(userId, goal);
      setUser({...user, weightGoal: goal});
      alert('Weight goal updated successfully! 🎯');
    } catch (error) {
      console.error('Error updating weight goal:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-4 bg-gray-200 rounded w-3/4"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <p className="text-gray-500">Unable to load user profile</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-emerald-800 mb-6">Health Profile</h2>
      
      <div className="space-y-6">
        {/* Personal Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-semibold">{user.firstName} {user.lastName}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Health Goals */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Health Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calorie Goal */}
            <div className="bg-emerald-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-emerald-800 font-semibold">Daily Calorie Goal</p>
                  <p className="text-2xl font-bold text-emerald-600">{user.dailyCalorieGoal || 2000} cal</p>
                </div>
                <div className="text-emerald-500 text-xl">🎯</div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleCalorieGoalUpdate(1800)}
                  className="flex-1 bg-white text-emerald-600 border border-emerald-300 rounded px-2 py-1 text-sm hover:bg-emerald-100"
                >
                  1800
                </button>
                <button
                  onClick={() => handleCalorieGoalUpdate(2000)}
                  className="flex-1 bg-white text-emerald-600 border border-emerald-300 rounded px-2 py-1 text-sm hover:bg-emerald-100"
                >
                  2000
                </button>
                <button
                  onClick={() => handleCalorieGoalUpdate(2200)}
                  className="flex-1 bg-white text-emerald-600 border border-emerald-300 rounded px-2 py-1 text-sm hover:bg-emerald-100"
                >
                  2200
                </button>
              </div>
            </div>

            {/* Weight Goal */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-blue-800 font-semibold">Weight Goal</p>
                  <p className="text-2xl font-bold text-blue-600">{user.weightGoal || 70} kg</p>
                </div>
                <div className="text-blue-500 text-xl">⚖️</div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleWeightGoalUpdate(65)}
                  className="flex-1 bg-white text-blue-600 border border-blue-300 rounded px-2 py-1 text-sm hover:bg-blue-100"
                >
                  65 kg
                </button>
                <button
                  onClick={() => handleWeightGoalUpdate(70)}
                  className="flex-1 bg-white text-blue-600 border border-blue-300 rounded px-2 py-1 text-sm hover:bg-blue-100"
                >
                  70 kg
                </button>
                <button
                  onClick={() => handleWeightGoalUpdate(75)}
                  className="flex-1 bg-white text-blue-600 border border-blue-300 rounded px-2 py-1 text-sm hover:bg-blue-100"
                >
                  75 kg
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;