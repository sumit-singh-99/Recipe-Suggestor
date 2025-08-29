import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState(""); // "quick" or "long"
  const [results, setResults] = useState([]);
  const [randomMeal, setRandomMeal] = useState(null);
  const [recipesOfTheDay, setRecipesOfTheDay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mapping categories to "quick" vs "long"
  const quickCategories = ["Breakfast", "Side", "Snack"];
  const longCategories = ["Beef", "Chicken", "Dessert", "Pork", "Seafood"];

  // Fetch 5 random meals for Recipes of the Day
  useEffect(() => {
    const fetchRandomMeals = async () => {
      try {
        const promises = Array.from({ length: 5 }, () =>
          axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
        );
        const responses = await Promise.all(promises);
        setRecipesOfTheDay(responses.map((res) => res.data.meals[0]));
      } catch (err) {
        console.error("Error fetching recipes of the day:", err);
      }
    };

    fetchRandomMeals();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter an ingredient.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
      );

      let meals = response.data.meals || [];

      // Apply cooking time filter simulation
      if (timeFilter === "quick") {
        meals = meals.filter((meal) =>
          quickCategories.some((cat) =>
            meal.strMeal.toLowerCase().includes(cat.toLowerCase())
          )
        );
      } else if (timeFilter === "long") {
        meals = meals.filter((meal) =>
          longCategories.some((cat) =>
            meal.strMeal.toLowerCase().includes(cat.toLowerCase())
          )
        );
      }

      setResults(meals);
      if (meals.length === 0) setError("No meals found with this filter.");
    } catch (err) {
      if (err.response) {
        setError(
          `Server error: ${err.response.status} ${err.response.statusText}`
        );
      } else if (err.request) {
        setError(
          "Network error: Unable to reach the server. Please check your connection."
        );
      } else {
        setError(`Unexpected error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const getRandomMeal = async () => {
    setLoading(true);
    setError("");
    setRandomMeal(null);

    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setRandomMeal(response.data.meals[0]);
    } catch (err) {
      if (err.response) {
        setError(
          `Server error: ${err.response.status} ${err.response.statusText}`
        );
      } else if (err.request) {
        setError(
          "Network error: Unable to reach the server. Please check your connection."
        );
      } else {
        setError(`Unexpected error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-green-50 via-beige-100 to-green-100 p-6">
      <h1 className="text-4xl font-extrabold text-green-800 mb-8 tracking-tight">
        🍳 Recipe Ideas
      </h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-lg flex items-center bg-white shadow-md rounded-full overflow-hidden mb-6 border border-green-200"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter ingredient (e.g. chicken)"
          className="flex-grow px-4 py-3 text-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold transition duration-300 ease-in-out transform hover:scale-105"
        >
          Search
        </button>
      </form>

      {/* Cooking Time Filter */}
      <select
        value={timeFilter}
        onChange={(e) => setTimeFilter(e.target.value)}
        className="mb-6 px-5 py-3 border-2 border-green-200 rounded-lg shadow-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="">⏳ Got Time?</option>
        <option value="quick">⚡ Quick (15–30 min)</option>
        <option value="long">🍲 Long Meals</option>
      </select>

      {/* Surprise Button */}
      <button
        onClick={getRandomMeal}
        className="mb-10 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-semibold px-8 py-3 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Meal of the Day
      </button>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
          {results.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white border border-green-100 shadow-md rounded-xl p-5 flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-32 h-32 object-cover rounded-full mb-4 shadow-sm"
              />
              <h2 className="text-lg font-semibold text-green-800 text-center">
                {meal.strMeal}
              </h2>
            </div>
          ))}
        </div>
      )}

      {/* Random Meal */}
      {randomMeal && (
        <div className="bg-white shadow-lg rounded-xl p-6 mb-10 w-full max-w-md text-center border border-green-100">
          <img
            src={randomMeal.strMealThumb}
            alt={randomMeal.strMeal}
            className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow"
          />
          <h2 className="text-xl font-bold text-green-800">
            {randomMeal.strMeal}
          </h2>
        </div>
      )}

      {/* Recipes of the Day */}
      {recipesOfTheDay.length > 0 && (
        <div className="w-full max-w-6xl mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            🍲 Try Out Some New Recipes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {recipesOfTheDay.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white border border-green-100 shadow-md rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-28 h-28 object-cover rounded-full mb-3 shadow-sm"
                />
                <h3 className="text-md font-semibold text-green-700 text-center">
                  {meal.strMeal}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
