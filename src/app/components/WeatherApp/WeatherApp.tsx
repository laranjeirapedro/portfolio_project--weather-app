"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

export const WeatherApp = () => {
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
        <div>
          <h4 className="text-center mt-4">Recent Places</h4>
          <div className="flex justify-center">
            <div className="py-2 px-6 mt-4 text-center border-2 bg-white rounded-md">
              <h4 className="text-2xl font-bold">
                {weather.location.name}, {weather.location.region}
              </h4>
              <h4 className="text-2xl font-bold">{weather.location.country}</h4>
              <div className="mt-4 flex flex-row items-center justify-center">
                <div className="flex flex-row items-center justify-center">
                  <Image
                    src={`https://${weather.current.condition.icon}`}
                    alt="weather-icon"
                    width={60}
                    height={60}
                  />
                  <h1 className="text-4xl">{weather.current?.temp_c}°C</h1>
                </div>
                <div className="ml-14 flex flex-col items-start text-left">
                  <h4 className="font-bold">
                    {weather.current.condition.text}
                  </h4>
                  <p>
                    <b>Feels:</b> {weather.current?.feelslike_c}°C
                  </p>
                  <div>
                    <p>
                      <b>Wind:</b> {weather.current?.wind_kph}kph <br/>
                      <b>Direction:</b> {weather.current?.wind_dir}
                    </p>
                  </div>
                </div>
              </div>
              <p className="pt-6 text-left text-xs">
                Updated:
                <br />
                {weather.current?.last_updated}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
