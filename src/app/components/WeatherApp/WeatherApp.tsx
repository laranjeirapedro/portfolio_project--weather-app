"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/SkyWatch_Logo.png";
import Sunrise from "@/public/sunrise-icon.png";
import Sunset from "@/public/sunset-icon.png";
import Wind from "@/public/wind-icon.png";
import { FaSearch } from "react-icons/fa";

type WeatherData = {
  location: {
    name: string;
    country: string;
    region: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    feelslike_c: number;
    wind_kph: number;
    wind_dir: string;
    last_updated: string;
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

    const getQueryData = async () => {
      try {
        const res = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API}&q=${query}&days=10&aqi=yes&alerts=yes`
        );
        const json = await res.json();
        setWeather(json);
      } catch (error) {
        alert("Location not found. Please try again!");
      }
    };

    getQueryData();
  }, [query]);

  const rawDate = weather?.current?.last_updated;
  const formattedDate = rawDate
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(rawDate))
    : "";

  return (
    <div className="w-full flex flex-col items-center mt-8">
      <div className="w-full flex flex-row items-center m-4 ml-16 space-x-6">
        <div className="ml-32">
          <Image src={Logo} alt="logo" width={150} height={150} />
        </div>
        <div className="w-full">
          <form onSubmit={inputSubmit} className="w-full relative flex">
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
      </div>
      {weather && weather.location && (
        <div>
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
                      <b>Wind:</b> {weather.current?.wind_kph} kph <br />
                      <b>Direction:</b> {weather.current?.wind_dir}
                    </p>
                  </div>
                </div>
              </div>
              <p className="pt-6 text-left text-xs">
                Updated:
                <br />
                {formattedDate}
              </p>
            </div>
          </div>
          <div>
            <h1>Details</h1>
            <div className="flex flex-row space-x-8">
              <div className="min-w-56 p-4 flex flex-row space-x-4 border-2 border-black rounded-md shadow-3xl">
                <div>
                  <Image
                    src={Sunrise}
                    alt="sunrise-icon"
                    width={50}
                    height={50}
                  />
                  Sunrise:
                  <h1 className="text-lg font-bold">
                    {weather.forecast?.forecastday[0].astro.sunrise}
                  </h1>
                </div>
                <div className="text-right">
                  <Image
                    className="justify-self-end"
                    src={Sunset}
                    alt="sunrise-icon"
                    width={50}
                    height={50}
                  />
                  Sunset:
                  <h1 className="text-lg font-bold">
                    {weather.forecast?.forecastday[0].astro.sunset}
                  </h1>
                </div>
              </div>
              <div className="min-w-56 p-4 flex flex-col space-x-4 border-2 border-black rounded-md shadow-3xl">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <b>Wind:</b>
                    <p className="text-lg">
                      <b>{weather.current?.wind_kph}</b> km/h
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Image
                      src={Wind}
                      alt="sunrise-icon"
                      width={30}
                      height={30}
                    />
                    <p className="">
                      <b>{weather.current?.wind_dir}</b>
                    </p>
                  </div>
                </div>
                <div>
                  <p><b>Gust: </b>{weather.current?.gust_kph} km/h</p>
                </div>
              </div>
              <div className="min-w-56 p-4 flex flex-col space-x-4 border-2 border-black rounded-md shadow-3xl">
                <div className="text-right">
                  <Image
                    className="justify-self-end"
                    src={Sunset}
                    alt="sunrise-icon"
                    width={50}
                    height={50}
                  />
                  Sunset:
                  <h1 className="text-lg font-bold">
                    {weather.forecast?.forecastday[0].astro.sunset}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {weather && weather.forecast && (
        <div>
          <h1>{formattedDate}</h1>
          <h1>{weather.forecast?.forecastday[0].day.maxtemp_c}</h1>
          <h1>{weather.forecast?.forecastday[0].day.mintemp_c}</h1>
          <h1>{weather.forecast?.forecastday[0].day.mintemp_c}</h1>
        </div>
      )} */}
    </div>
  );
};
