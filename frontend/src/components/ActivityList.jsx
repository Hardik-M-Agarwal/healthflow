import React, { useState, useEffect } from 'react';
import { getUserActivities, deleteActivity } from '../services/api';

const ActivityList = ({ userId, refresh }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await getUserActivities(userId);
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [userId, refresh]);

  const handleDelete = async (activityId) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await deleteActivity(activityId);
        setActivities(activities.filter(activity => activity.id !== activityId));
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-emerald-800 mb-4">Recent Activities</h2>
      
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No activities logged yet.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{activity.description}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.type === 'BURN' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.type}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {activity.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(activity.activityDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    activity.type === 'BURN' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {activity.type === 'BURN' ? '-' : '+'}{activity.calories} cal
                  </p>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityList;