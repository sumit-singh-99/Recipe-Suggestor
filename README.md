# Recipe Ideas App

A simple recipe search application built with React + Vite + Tailwind CSS, designed for Taylor – a busy professional who wants quick and easy meal ideas based on ingredients available at home.
The app integrates with TheMealDB API to fetch and display recipes, with extra features like random meals, favorites, and recipes of the day.

## Features

🔎 Search by Ingredient – Enter what’s in your fridge, and get matching recipes.

⏱ Filter by Cooking Time – Choose between quick meals (15–30 mins) and long weekend meals (simulated using categories like Breakfast, Fast Food).

🎲 Random Meal Generator – Get a surprise meal suggestion when you don’t want to decide.

🗓 Some New recipes – Landing page shows 5 random recipes daily so the page doesn’t feel empty.

🎨 Clean UI with Tailwind CSS – Fully responsive modern design.

## Tech Stack

⚡ Vite
 – Blazing fast React bundler with HMR

⚛️ React
 – UI library for building components

🎨 Tailwind CSS
 – Utility-first CSS for modern responsive UI

🌐 Axios
 – Fetching data from TheMealDB API

🍲 TheMealDB API
 – Free API for recipes and meals

📦 Installation

## Clone the repository:

git clone https://github.com/sumit-singh-99/Recipe-Suggestor.git
cd recipe-ideas-app

Install dependencies:
```bash
npm install
```
Install TailwindCSS:
```bash
npm install tailwindcss @tailwindcss/vite
```

Configure vite.config.js :
```bash
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```
import Tailwind in index.css :
```bash
@import "tailwindcss";
```
Start development server:
```bash
npm run dev
```
Build for production:
```bash
npm run build
```
Preview production build:
```bash
npm run preview
```
## Project Structure

```bash
Recipe-Suggestor/
│
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   └── SearchPage.jsx        # Page components (SearchPage, LandingPage)
│   ├── App.jsx                   # Root app component
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind CSS import
│
├── package.json
└── vite.config.js                # Vite config
```
## API Usage

We use TheMealDB API endpoints:

Search by ingredient:

https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}


Random meal:

https://www.themealdb.com/api/json/v1/1/random.php


Recipe details by ID:

https://www.themealdb.com/api/json/v1/1/lookup.php?i={mealId}


## Author

👤 Sumit Singh
B.Tech Computer Science Engineer (4th Year, 7th Semester)
Learning by doing, building real-world apps.
