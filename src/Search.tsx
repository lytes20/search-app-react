import React, { useState } from 'react';

import './Search.css';

import Loader from './Loader';

export interface Meal {
  strMeal: string;
  strMealThumb?: string;
}

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    makeApiCall(searchValue);
  };

  const makeApiCall = (name: string) => {
    var searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    setLoading(true)
    fetch(searchUrl)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        console.log(jsonData.meals);
        setMeals(jsonData.meals);
        setLoading(false)
      });
  };
  return (
    <div>
      <h1>Meals</h1>
      <input name="text" type="text" placeholder="Search for a meal" value={searchValue} onChange={handleOnChange} />
      <button onClick={handleSearch}>Search</button>
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      {meals ? (
        <div className="Meals-container">
          {meals.map((meal: Meal, index) => (
            <div key={index} className="Meal">
              <h1>{meal.strMeal}</h1>
              <img src={meal.strMealThumb} alt="meal-thumbnail" />
            </div>
          ))}
        </div>
      ) : (
        <p>Try searching for a different meal</p>
      )}
    </div>
  );
}
