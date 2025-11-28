# 🏥 HealthFlow
A modern, full-stack health and fitness management application built with microservices architecture. Track your meals, exercises, and calorie balance with an intuitive interface.

## 🚀 Quick Start

### Prerequisites
- *Java 17* or higher
- *Node.js 16* or higher  
- *MySQL 8.0*
- *Maven 3.6+*

### 1. Clone & Setup
bash
git clone https://github.com/Hardik-M-Agarwal/healthflow.git
cd healthflow


### 2. Database Setup
sql
CREATE DATABASE healthflow_users;
CREATE DATABASE healthflow_health;


### 3. Start Backend Services
bash
# Terminal 1 - User Service (Port 8081)
cd user-service
mvn clean compile
mvn spring-boot:run

# Terminal 2 - Health Service (Port 8082)  
cd health-service
mvn clean compile
mvn spring-boot:run


### 4. Start Frontend
bash
# Terminal 3 - Frontend (Port 3000)
cd frontend
npm install
npm start


*Visit:* http://localhost:3000

## 🏗️ Architecture

React Frontend (3000) → User Service (8081) → MySQL (healthflow_users)
                     → Health Service (8082) → MySQL (healthflow_health)


## 🛠️ Tech Stack
*Backend:* Java 17, Spring Boot 3.2, Spring Security, JWT, MySQL  
*Frontend:* React 18, Tailwind CSS, Axios  
*Tools:* Maven, Git

## 📊 Features
- ✅ *User Authentication* (JWT)
- ✅ *Meal Logging* (Breakfast, Lunch, Dinner, Snacks)
- ✅ *Exercise Tracking* (Cardio, Strength, Flexibility, Sports)
- ✅ *Calorie Intake/Burn Calculation*
- ✅ *Real-time Net Calorie Balance*
- ✅ *Daily Calorie Goals*
- ✅ *Macro Tracking* (Protein, Carbs, Fat)
- ✅ *Progress Reports* (Daily/Weekly/Monthly)
- ✅ *Responsive UI*

## 🔐 Default Test User
- *Email:* hardikag04@gmail.com
- *Password:* password123

## 📁 Project Structure

healthflow/
├── user-service/         # Spring Boot - Authentication & Users
├── health-service/       # Spring Boot - Meals & Exercise Management
└── frontend/             # React - User Interface


## 🎯 API Endpoints

### Authentication
http
POST /api/auth/signin    # User login
POST /api/auth/signup    # User registration


### Users
http
GET  /api/users/me                    # Get current user profile
PUT  /api/users/{id}/calorie-goal     # Update daily calorie goal
PUT  /api/users/{id}/profile          # Update user profile


### Meals
http
GET  /api/meals/user/{userId}              # Get user meals
POST /api/meals                            # Log new meal
PUT  /api/meals/{id}                       # Update meal
DELETE /api/meals/{id}                     # Delete meal
GET  /api/meals/user/{userId}/calories     # Get total calories consumed


### Exercises
http
GET  /api/exercises/user/{userId}              # Get user exercises
POST /api/exercises                            # Log new exercise
PUT  /api/exercises/{id}                       # Update exercise
DELETE /api/exercises/{id}                     # Delete exercise
GET  /api/exercises/user/{userId}/burned       # Get total calories burned


### Health Summary
http
GET  /api/health/user/{userId}/balance         # Get net calorie balance
GET  /api/health/user/{userId}/summary/daily   # Get daily summary
GET  /api/health/user/{userId}/summary/weekly  # Get weekly summary


## 📋 Data Models

### User
json
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "dateOfBirth": "1990-01-01",
  "gender": "MALE",
  "heightCm": 175.5,
  "weightKg": 75.0,
  "dailyCalorieGoal": 2000
}


### Meal
json
{
  "id": 1,
  "userId": 1,
  "mealName": "Grilled Chicken Salad",
  "mealType": "LUNCH",
  "calories": 450,
  "proteinG": 35.5,
  "carbsG": 20.0,
  "fatG": 15.0,
  "mealDate": "2025-11-28",
  "mealTime": "13:30:00",
  "notes": "Extra vegetables"
}


### Exercise
json
{
  "id": 1,
  "userId": 1,
  "exerciseName": "Running",
  "exerciseType": "CARDIO",
  "durationMinutes": 30,
  "caloriesBurned": 300,
  "intensity": "MODERATE",
  "exerciseDate": "2025-11-28",
  "exerciseTime": "07:00:00",
  "notes": "Morning run"
}


## 🗄️ Database Schema

### healthflow_users Database
sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    height_cm DECIMAL(5,2),
    weight_kg DECIMAL(5,2),
    daily_calorie_goal INT DEFAULT 2000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


### healthflow_health Database
sql
CREATE TABLE meals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    meal_name VARCHAR(255) NOT NULL,
    meal_type ENUM('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK') NOT NULL,
    calories INT NOT NULL,
    protein_g DECIMAL(5,2),
    carbs_g DECIMAL(5,2),
    fat_g DECIMAL(5,2),
    meal_date DATE NOT NULL,
    meal_time TIME,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exercises (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    exercise_name VARCHAR(255) NOT NULL,
    exercise_type ENUM('CARDIO', 'STRENGTH', 'FLEXIBILITY', 'SPORTS', 'OTHER') NOT NULL,
    duration_minutes INT NOT NULL,
    calories_burned INT NOT NULL,
    intensity ENUM('LOW', 'MODERATE', 'HIGH') NOT NULL,
    exercise_date DATE NOT NULL,
    exercise_time TIME,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


## 🎨 Frontend Pages
- *Login/Signup* - User authentication
- *Dashboard* - Overview of daily calorie balance
- *Meals* - Log and view meals
- *Exercises* - Log and view exercises
- *Progress* - View daily/weekly/monthly reports
- *Profile* - Manage user settings and goals

## 🔒 Security Features
- JWT-based authentication
- Password encryption (BCrypt)
- Secured API endpoints
- CORS configuration
- Input validation

## 🚧 Future Enhancements
- [ ] Food database integration (nutrition API)
- [ ] Barcode scanner for meal logging
- [ ] Water intake tracking
- [ ] Sleep tracking
- [ ] Weight progress chart
- [ ] Social features (share progress)
- [ ] Mobile app (React Native)
- [ ] AI-powered meal suggestions

## 👨‍💻 Author
*Hardik M Agarwal* - [hardikag04@gmail.com](mailto:hardikag04@gmail.com)

---

<div align="center">

### ⭐ *Star this repo if you find it helpful!*

</div>
