import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8083/api';
const ACTIVITY_API_BASE_URL = 'http://localhost:8084/api';

// Create axios instances
const userAPI = axios.create({
    baseURL: USER_API_BASE_URL,
});

const activityAPI = axios.create({
    baseURL: ACTIVITY_API_BASE_URL,
});

// Add JWT token to requests
const addAuthToken = (config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔑 Adding token to request:', config.url);
    } else {
        console.warn('⚠️ No token found for request:', config.url);
    }
    return config;
};

// Add interceptors to include JWT token
userAPI.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));
activityAPI.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));

// Handle 401 errors (redirect to login)
const handleUnauthorized = (error) => {
    if (error.response && error.response.status === 401) {
        console.error('🚫 Unauthorized! Redirecting to login...');
        localStorage.clear();
        window.location.href = '/login';
    }
    return Promise.reject(error);
};

userAPI.interceptors.response.use((response) => response, handleUnauthorized);
activityAPI.interceptors.response.use((response) => response, handleUnauthorized);

// Auth API calls (no token needed for these)
export const loginUser = async (credentials) => {
    console.log('🔐 Attempting login...');
    const response = await axios.post(`${USER_API_BASE_URL}/auth/signin`, credentials);
    
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('✅ Token saved to localStorage');
    }
    
    return response;
};

export const registerUser = async (userData) => {
    console.log('📝 Attempting registration...');
    const response = await axios.post(`${USER_API_BASE_URL}/auth/signup`, userData);
    
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('✅ Token saved to localStorage');
    }
    
    return response;
};

// User API calls
export const getUserProfile = (userId) => userAPI.get(`/users/${userId}`);
export const updateCalorieGoal = (userId, goal) => userAPI.put(`/users/${userId}/calorie-goal?goal=${goal}`);
export const updateWeightGoal = (userId, goal) => userAPI.put(`/users/${userId}/weight-goal?goal=${goal}`);
export const updateUserProfile = (userId, userData) => userAPI.put(`/users/${userId}`, userData);

// Activity API calls
export const createActivity = (activity) => activityAPI.post('/activities', activity);
export const getUserActivities = (userId) => activityAPI.get(`/activities/user/${userId}`);
export const getNetCalories = (userId) => activityAPI.get(`/activities/user/${userId}/calories`);
export const getActivitiesByCategory = (userId, category) => activityAPI.get(`/activities/user/${userId}/category/${category}`);

export const getTotalCaloriesBurned = (userId) => {
    return getUserActivities(userId).then(response => {
        const activities = response.data;
        const burned = activities
            .filter(activity => activity.type === 'BURN')
            .reduce((sum, activity) => sum + activity.calories, 0);
        return { data: burned };
    });
};

export const getTotalCaloriesConsumed = (userId) => {
    return getUserActivities(userId).then(response => {
        const activities = response.data;
        const consumed = activities
            .filter(activity => activity.type === 'INTAKE')
            .reduce((sum, activity) => sum + activity.calories, 0);
        return { data: consumed };
    });
};

export const deleteActivity = (activityId) => activityAPI.delete(`/activities/${activityId}`);