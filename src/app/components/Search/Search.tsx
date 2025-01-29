"use client";

import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

type WeatherData = {
    location: {
        name: string;
        country: string;
    };
    current: {
        temp_c: number;
    };
};

export const Search = () => {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const getLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const inputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (location.trim()) {
      setQuery(location);
      setLocation("");
    }
  };

  useEffect(() => {
    if (!query) return;

    const getData = async () => {
      try {
        const res = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API}&q=${query}&aqi=no`
        );
        const json = await res.json();
        setWeather(json);
      } catch (error) {
        alert("Location not found. Please try again!");
      }
    };

    getData();
  }, [query]);

  return (
    <div className="w-full">
      <div className="w-full">
        <form
          onSubmit={inputSubmit}
          className="w-full relative flex justify-center"
        >
          <input
            value={location}
            onChange={getLocation}
            type="text"
            placeholder="Search your Address, City or Postal Code"
            className="p-2 px-16 w-2/5 h-10 rounded-md"
          />
          {/* <FaSearch className="absolute translate-x-[-350px] top-2.5 text-xl"/> */}
          <button className="mx-4 px-4 border-solid border-2 border-black rounded-md">
            Search
          </button>
        </form>
      </div>
      {weather && weather.location && (
        <div className="mt-4 text-center">
          <h2 className="text-lg font-bold">
            {weather.location.name}, {weather.location.country}
          </h2>
          <p>Temperatura: {weather.current?.temp_c}°C</p>
        </div>
      )}
    </div>
  );
};
