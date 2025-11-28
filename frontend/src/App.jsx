import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import UserProfile from './components/UserProfile';
import './App.css';

// Protected Route Component - FIXED: Added useNavigate
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
  
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }
  
  return children;
};

// Main App Component
function App() {
  const [userId, setUserId] = useState(null);
  const [refreshActivities, setRefreshActivities] = useState(0);

  useEffect(() => {
    // Debug localStorage on mount
    console.log('🔍 App mounted - Checking localStorage:');
    console.log('Token:', localStorage.getItem('token'));
    console.log('UserId:', localStorage.getItem('userId'));
    console.log('UserName:', localStorage.getItem('userName'));

    // Get userId from localStorage on mount
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
      console.log('✅ UserId set in state:', parseInt(storedUserId));
    } else {
      console.log('❌ No userId found in localStorage');
    }
  }, []);

  const handleActivityAdded = () => {
    setRefreshActivities(prev => prev + 1);
  };

  const handleLogout = () => {
    console.log('🚪 Logging out...');
    localStorage.clear();
    setUserId(null);
    // Use window.location to ensure complete reload and clear state
    window.location.href = '/login';
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
                {/* Header */}
                <header className="bg-white shadow-md">
                  <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-emerald-800">
                      🏃 HealthFlow
                    </h1>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-700">
                        Welcome, {localStorage.getItem('userName') || 'User'}!
                      </span>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto px-4 py-8">
                  {userId ? (
                    <>
                      {/* Dashboard Stats */}
                      <Dashboard userId={userId} />

                      {/* Activity Form and List */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <ActivityForm 
                          userId={userId} 
                          onActivityAdded={handleActivityAdded} 
                        />
                        <UserProfile userId={userId} />
                      </div>

                      {/* Activity List */}
                      <ActivityList 
                        userId={userId} 
                        refresh={refreshActivities} 
                      />
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
                      <p className="mt-4 text-gray-500 text-xl">Loading your dashboard...</p>
                      <p className="text-gray-400 text-sm mt-2">UserId: {userId}</p>
                    </div>
                  )}
                </main>

                {/* Footer */}
                <footer className="bg-white shadow-md mt-12">
                  <div className="container mx-auto px-4 py-6 text-center text-gray-600">
                    <p>© 2024 HealthFlow. Track your health journey! 💪</p>
                  </div>
                </footer>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;