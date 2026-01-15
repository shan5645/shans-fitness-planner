import React, { useState } from 'react';
import { Activity, Target, Utensils, Dumbbell, Heart, Zap, Upload, X } from 'lucide-react';

export default function FitnessPlanner() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    gender: 'male',
    goal: 'lose-weight',
    activityLevel: 'moderate',
    dietPreference: 'balanced'
  });
  const [plan, setPlan] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [showUpload, setShowUpload] = useState(true);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = () => {
    setBackgroundImage(null);
  };

  const calculateCalories = () => {
    const { weight, age, gender, activityLevel, goal } = formData;
    
    let bmr;
    if (gender === 'male') {
      bmr = 13.7 * weight + 5 * age + 66;
    } else {
      bmr = 9.6 * weight + 1.8 * age + 655;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    let tdee = bmr * activityMultipliers[activityLevel];

    if (goal === 'lose-weight') {
      tdee -= 500;
    } else if (goal === 'gain-muscle') {
      tdee += 300;
    } else if (goal === 'get-slim') {
      tdee -= 300;
    }

    return Math.round(tdee);
  };

  const generateWorkoutPlan = () => {
    const { goal } = formData;
    
    const workoutPlans = {
      'lose-weight': {
        focus: 'Cardio & Fat Burning',
        schedule: [
          { day: 'Monday', workout: '30 min brisk walking/jogging + 15 min core exercises' },
          { day: 'Tuesday', workout: '45 min cycling or swimming' },
          { day: 'Wednesday', workout: 'Rest or light yoga (20 min)' },
          { day: 'Thursday', workout: '40 min HIIT training + 10 min stretching' },
          { day: 'Friday', workout: '30 min running + 20 min bodyweight exercises' },
          { day: 'Saturday', workout: '60 min outdoor activity (hiking, sports)' },
          { day: 'Sunday', workout: 'Active recovery - light walk or stretching' }
        ]
      },
      'gain-muscle': {
        focus: 'Strength Training & Hypertrophy',
        schedule: [
          { day: 'Monday', workout: 'Chest & Triceps - Bench press, push-ups, dips (4 sets each)' },
          { day: 'Tuesday', workout: 'Back & Biceps - Pull-ups, rows, curls (4 sets each)' },
          { day: 'Wednesday', workout: 'Legs - Squats, lunges, leg press (4 sets each)' },
          { day: 'Thursday', workout: 'Rest or light cardio (20 min)' },
          { day: 'Friday', workout: 'Shoulders & Abs - Overhead press, lateral raises, planks (4 sets)' },
          { day: 'Saturday', workout: 'Full body - Deadlifts, compound movements (3 sets each)' },
          { day: 'Sunday', workout: 'Rest and recovery' }
        ]
      },
      'get-slim': {
        focus: 'Toning & Definition',
        schedule: [
          { day: 'Monday', workout: '30 min cardio + 20 min full body circuit training' },
          { day: 'Tuesday', workout: '45 min Pilates or barre workout' },
          { day: 'Wednesday', workout: '30 min swimming or cycling' },
          { day: 'Thursday', workout: '40 min dance cardio or Zumba' },
          { day: 'Friday', workout: '30 min HIIT + 15 min core and arms' },
          { day: 'Saturday', workout: '60 min yoga or outdoor walk' },
          { day: 'Sunday', workout: 'Rest or gentle stretching' }
        ]
      },
      'maintain': {
        focus: 'General Fitness & Health',
        schedule: [
          { day: 'Monday', workout: '30 min moderate cardio + 15 min strength training' },
          { day: 'Tuesday', workout: '45 min sports or recreational activity' },
          { day: 'Wednesday', workout: '30 min yoga or Pilates' },
          { day: 'Thursday', workout: '40 min mixed cardio and bodyweight exercises' },
          { day: 'Friday', workout: '30 min strength training (full body)' },
          { day: 'Saturday', workout: 'Active leisure - hiking, cycling, swimming' },
          { day: 'Sunday', workout: 'Rest or light stretching' }
        ]
      }
    };

    return workoutPlans[goal];
  };

  const generateDietPlan = () => {
    const calories = calculateCalories();
    const { goal, dietPreference } = formData;

    let protein, carbs, fats;

    if (goal === 'gain-muscle') {
      protein = Math.round(calories * 0.30 / 4);
      carbs = Math.round(calories * 0.45 / 4);
      fats = Math.round(calories * 0.25 / 9);
    } else if (goal === 'lose-weight' || goal === 'get-slim') {
      protein = Math.round(calories * 0.35 / 4);
      carbs = Math.round(calories * 0.35 / 4);
      fats = Math.round(calories * 0.30 / 9);
    } else {
      protein = Math.round(calories * 0.25 / 4);
      carbs = Math.round(calories * 0.50 / 4);
      fats = Math.round(calories * 0.25 / 9);
    }

    const mealPlans = {
      balanced: {
        breakfast: 'Oatmeal with berries, nuts, and Greek yogurt',
        snack1: 'Apple with almond butter',
        lunch: 'Grilled chicken salad with quinoa and mixed vegetables',
        snack2: 'Protein smoothie with banana and spinach',
        dinner: 'Baked salmon with sweet potato and steamed broccoli'
      },
      vegetarian: {
        breakfast: 'Whole grain toast with avocado and scrambled eggs',
        snack1: 'Hummus with carrot and cucumber sticks',
        lunch: 'Chickpea curry with brown rice and mixed vegetables',
        snack2: 'Greek yogurt with granola and berries',
        dinner: 'Lentil soup with whole grain bread and side salad'
      },
      vegan: {
        breakfast: 'Chia pudding with almond milk, berries, and seeds',
        snack1: 'Mixed nuts and dried fruit',
        lunch: 'Buddha bowl with quinoa, tofu, vegetables, and tahini',
        snack2: 'Protein shake with plant-based protein powder',
        dinner: 'Black bean tacos with guacamole and vegetables'
      },
      keto: {
        breakfast: 'Scrambled eggs with avocado and bacon',
        snack1: 'Cheese and olives',
        lunch: 'Grilled chicken with cauliflower rice and butter sauce',
        snack2: 'Handful of macadamia nuts',
        dinner: 'Steak with asparagus and butter, side salad with olive oil'
      }
    };

    return {
      calories,
      macros: { protein, carbs, fats },
      meals: mealPlans[dietPreference]
    };
  };

  const handleGenerate = () => {
    if (!formData.name || !formData.age || !formData.weight) {
      alert('Please fill in all required fields');
      return;
    }

    const workoutPlan = generateWorkoutPlan();
    const dietPlan = generateDietPlan();

    setPlan({
      workout: workoutPlan,
      diet: dietPlan
    });
  };

  const resetForm = () => {
    setPlan(null);
    setFormData({
      name: '',
      age: '',
      weight: '',
      gender: 'male',
      goal: 'lose-weight',
      activityLevel: 'moderate',
      dietPreference: 'balanced'
    });
  };

  const backgroundStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

  if (plan) {
    return (
      <div 
        className="min-h-screen p-4 md:p-8 animate-pulse-slow relative"
        style={backgroundImage ? backgroundStyle : {}}
      >
        <div className={`absolute inset-0 ${backgroundImage ? 'bg-black/40' : 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400'}`}></div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          {showUpload && (
            <div className="mb-6 flex justify-end">
              <label className="cursor-pointer bg-white/90 backdrop-blur-lg px-6 py-3 rounded-full shadow-xl border-4 border-yellow-400 hover:scale-110 transition-all duration-300 flex items-center gap-2 font-bold text-gray-800">
                <Upload size={24} className="text-purple-600" />
                {backgroundImage ? 'Change Background Image' : 'Upload Background Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {backgroundImage && (
                <button
                  onClick={removeBackground}
                  className="ml-3 bg-red-500 text-white px-4 py-3 rounded-full shadow-xl hover:scale-110 transition-all duration-300 flex items-center gap-2 font-bold"
                >
                  <X size={24} />
                </button>
              )}
            </div>
          )}

          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 mb-6 border-4 border-yellow-400 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Dumbbell className="text-orange-500 animate-bounce" size={40} />
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Shan's Fitness & Nutrition Planner
                </h1>
              </div>
              <button 
                onClick={resetForm}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:from-red-600 hover:to-pink-600 transition transform hover:scale-110 font-bold shadow-lg"
              >
                🔄 Start Over
              </button>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8">
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="animate-pulse" size={32} />
                <h2 className="text-2xl font-bold">Hey {formData.name}! 💪</h2>
              </div>
              <p className="text-lg">Let's crush those fitness goals together!</p>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-green-400 to-emerald-500 p-4 rounded-2xl">
                <Utensils className="text-white animate-bounce" size={32} />
                <h2 className="text-3xl font-black text-white">🍽️ Your Diet Plan</h2>
              </div>
              
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl mb-6 border-4 border-green-400 shadow-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center bg-white p-4 rounded-xl shadow-lg transform hover:scale-110 transition-all">
                    <p className="text-sm text-gray-600 font-semibold">Daily Calories</p>
                    <p className="text-3xl font-black text-green-600">🔥 {plan.diet.calories}</p>
                  </div>
                  <div className="text-center bg-white p-4 rounded-xl shadow-lg transform hover:scale-110 transition-all">
                    <p className="text-sm text-gray-600 font-semibold">Protein</p>
                    <p className="text-3xl font-black text-green-600">💪 {plan.diet.macros.protein}g</p>
                  </div>
                  <div className="text-center bg-white p-4 rounded-xl shadow-lg transform hover:scale-110 transition-all">
                    <p className="text-sm text-gray-600 font-semibold">Carbs</p>
                    <p className="text-3xl font-black text-green-600">⚡ {plan.diet.macros.carbs}g</p>
                  </div>
                  <div className="text-center bg-white p-4 rounded-xl shadow-lg transform hover:scale-110 transition-all">
                    <p className="text-sm text-gray-600 font-semibold">Fats</p>
                    <p className="text-3xl font-black text-green-600">🥑 {plan.diet.macros.fats}g</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Breakfast 🌅', meal: plan.diet.meals.breakfast, emoji: '🥞' },
                  { title: 'Morning Snack ☕', meal: plan.diet.meals.snack1, emoji: '🍎' },
                  { title: 'Lunch 🌞', meal: plan.diet.meals.lunch, emoji: '🥗' },
                  { title: 'Afternoon Snack 🌤️', meal: plan.diet.meals.snack2, emoji: '🥤' },
                  { title: 'Dinner 🌙', meal: plan.diet.meals.dinner, emoji: '🍽️' }
                ].map((item, index) => (
                  <div key={index} className="p-5 bg-white border-4 border-green-300 rounded-2xl shadow-lg transform hover:scale-105 hover:border-green-500 transition-all duration-300">
                    <p className="font-bold text-xl text-gray-800 mb-2">{item.emoji} {item.title}</p>
                    <p className="text-gray-700 text-lg">{item.meal}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6 bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl">
                <Activity className="text-white animate-bounce" size={32} />
                <h2 className="text-3xl font-black text-white">💪 Your Workout Schedule</h2>
              </div>
              
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl mb-6 border-4 border-purple-400 shadow-xl">
                <div className="flex items-center gap-2 justify-center">
                  <Zap className="text-yellow-500 animate-pulse" size={28} />
                  <p className="text-2xl font-black text-purple-800">Focus: {plan.workout.focus}</p>
                  <Zap className="text-yellow-500 animate-pulse" size={28} />
                </div>
              </div>

              <div className="space-y-4">
                {plan.workout.schedule.map((item, index) => (
                  <div key={index} className="p-5 bg-white border-4 border-purple-300 rounded-2xl shadow-lg transform hover:scale-105 hover:border-purple-500 transition-all duration-300">
                    <p className="font-bold text-xl text-purple-700 mb-2">📅 {item.day}</p>
                    <p className="text-gray-800 text-lg">{item.workout}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-300 to-orange-300 border-4 border-yellow-500 rounded-2xl shadow-xl">
              <p className="text-gray-800 font-semibold text-center">
                ⚠️ <strong>Important:</strong> This plan is a general guideline. Please consult with a healthcare provider or certified fitness professional before starting any new diet or exercise program. 🏥
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen p-4 md:p-8 relative"
      style={backgroundImage ? backgroundStyle : {}}
    >
      <div className={`absolute inset-0 ${backgroundImage ? 'bg-black/40' : 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400'}`}></div>
      
      <div className="relative z-10 max-w-2xl mx-auto">
        {showUpload && (
          <div className="mb-6 flex justify-center">
            <label className="cursor-pointer bg-white/90 backdrop-blur-lg px-6 py-3 rounded-full shadow-xl border-4 border-yellow-400 hover:scale-110 transition-all duration-300 flex items-center gap-2 font-bold text-gray-800">
              <Upload size={24} className="text-purple-600" />
              {backgroundImage ? 'Change Background Image' : 'Upload Background Image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            {backgroundImage && (
              <button
                onClick={removeBackground}
                className="ml-3 bg-red-500 text-white px-4 py-3 rounded-full shadow-xl hover:scale-110 transition-all duration-300 flex items-center gap-2 font-bold"
              >
                <X size={24} />
              </button>
            )}
          </div>
        )}

        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 mb-6 border-4 border-yellow-400 transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Dumbbell className="text-orange-500 animate-bounce" size={48} />
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Shan's Fitness & Nutrition Planner
              </h1>
              <Heart className="text-red-500 animate-pulse" size={48} />
            </div>
            <p className="text-xl text-gray-700 font-semibold">Transform Your Body, Transform Your Life! 💪✨</p>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-pink-400">
          <div className="space-y-6">
            <div className="transform hover:scale-105 transition-all duration-300">
              <label className="block text-lg font-bold text-gray-800 mb-2">👤 Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-6 py-3 border-4 border-purple-300 rounded-2xl focus:border-purple-500 focus:outline-none text-lg font-semibold shadow-lg"
                placeholder="Enter your name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="transform hover:scale-105 transition-all duration-300">
                <label className="block text-lg font-bold text-gray-800 mb-2">🎂 Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 border-4 border-blue-300 rounded-2xl focus:border-blue-500 focus:outline-none text-lg font-semibold shadow-lg"
                  placeholder="Years"
                />
              </div>

              <div className="transform hover:scale-105 transition-all duration-300">
                <label className="block text-lg font-bold text-gray-800 mb-2">⚧️ Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-6 py-3 border-4 border-blue-300 rounded-2xl focus:border-blue-500 focus:outline-none text-lg font-semibold shadow-lg"
                >
