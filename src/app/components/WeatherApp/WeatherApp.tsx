"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/SkyWatch_Logo.png";
import Sunrise from "@/public/sunrise-icon.png";
import Sunset from "@/public/sunset-icon.png";
import Wind from "@/public/wind-icon.png";
import Pressure from "@/public/pressure-icon.png";
import Humidity from "@/public/humidity-icon.png";
import DewPoint from "@/public/dew-point-icon.png";
import Precipitation from "@/public/precipitation-icon.png";

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
    cloud: number;
    uv: number;
    pressure_mb: number;
    humidity: number;
    dewpoint_c: number;
    precip_mm: number;
  };
  forecast:{
    forecastday: {
      astro: {
        sunrise: string;
        sunset: string;
      }
    }[]
  }
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
        const res = await fetch(`http://localhost:5066/api/weather/${query}`);
        const json = await res.json();
        setWeather(json);
      } catch {
        alert("Location not found. Please try again!");
      }
    };

    getQueryData();
  }, [query]);

  const rawDate = weather?.current?.last_updated;
  const formattedDate = rawDate
    ? new Intl.DateTimeFormat("en-CA", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(new Date(rawDate))
    : "";

  return (
    <div className="w-full h-screen flex flex-col items-center">
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
            <button className="mx-4 px-4 rounded-md font-semibold bg-[#34495E] text-white hover:text-[#34495E] hover:bg-white">
              Search
            </button>
          </form>
        </div>
      </div>
      {weather && weather.location && (
        <div>
          <div className="flex justify-center">
            <div className="py-2 px-6 mt-4 text-center border-2 bg-white rounded-md border-black">
              <h4 className="text-2xl font-bold">
                {weather.location.name}, {weather.location.region}
              </h4>
              <h4 className="text-2xl font-bold">{weather.location.country}</h4>
              <div className="mt-4 flex flex-row items-center justify-center">
                <div className="flex flex-row items-center justify-center">
                  <img
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
                      <b>Wind:</b> {weather.current?.wind_kph}kph <br />
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
            <div>
              <h1 className="text-3xl pl-4 font-bold text-white">Details</h1>
            </div>
            <div className="flex flex-row space-x-8 p-4">
              {/* Sun Info */}
              <div className="min-w-48 p-2 flex ring-4 ring-[#FFFF99] rounded-md bg-[#34495E] text-[#FFFF99]">
                <div className="flex space-x-4">
                  <div>
                    Sunrise:
                    <h1 className="font-bold">
                      {weather.forecast?.forecastday[0].astro.sunrise}
                    </h1>
                    <Image
                      src={Sunrise}
                      alt="sunrise-icon"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="text-right">
                    Sunset:
                    <h1 className="font-bold">
                      {weather.forecast?.forecastday[0].astro.sunset}
                    </h1>
                    <Image
                      className="justify-self-end"
                      src={Sunset}
                      alt="sunset-icon"
                      width={80}
                      height={80}
                    />
                  </div>
                </div>
              </div>

              {/* Wind Info */}
              <div className="min-w-48 p-2 flex ring-4 ring-[#FFFF99] rounded-md bg-[#34495E] text-[#FFFF99]">
                <div className="flex content-around justify-start flex-wrap space-y-2">
                  <div>
                    <div>Wind:</div>
                    <div className="flex flex-row items-center space-x-2">
                      <div className="font-bold text-lg">
                        {weather.current?.wind_kph}
                      </div>
                      <div className="text-xs">km/h</div>
                      <div className="text-xs font-bold text-[#87CEEB]">
                        {weather.current?.wind_dir}
                      </div>
                    </div>
                  </div>
                  <div className="ml-3 mr-auto w-full flex justify-center">
                    <Image src={Wind} alt="wind-icon" width={70} height={70} />
                  </div>
                </div>
              </div>

              {/* Pressure Info */}
              <div className="min-w-48 p-2 flex ring-4 ring-[#FFFF99] rounded-md bg-[#34495E] text-[#FFFF99]">
                <div className="flex content-around justify-start flex-wrap space-y-2">
                  <div>
                    <div>Pressure:</div>
                    <div className="flex flex-row items-center space-x-2">
                      <div className="font-bold text-lg">
                        {weather.current?.pressure_mb &&
                          (weather.current.pressure_mb / 10).toFixed(1)}
                      </div>
                      <div className="text-xs">mbar</div>
                    </div>
                  </div>
                  <div className="ml-3 mr-auto w-full flex justify-center">
                    <Image
                      src={Pressure}
                      alt="pressure-icon"
                      width={70}
                      height={70}
                    />
                  </div>
                </div>
              </div>

              {/* Humidity Info */}
              <div className="min-w-48 p-2 flex ring-4 ring-[#FFFF99] rounded-md bg-[#34495E] text-[#FFFF99]">
                <div className="flex content-around justify-start flex-wrap space-y-2">
                  <div>
                    <div>Humidity:</div>
                    <div className="flex flex-row items-center space-x-2">
                      <div className="font-bold text-lg">
                        {weather.current?.humidity}
                      </div>
                      <div className="text-xs">%</div>
                    </div>
                  </div>
                  <div className="ml-3 mr-auto w-full flex justify-center">
                    <Image
                      src={Humidity}
                      alt="humidity-icon"
                      width={70}
                      height={70}
                    />
                  </div>
                </div>
              </div>

              {/* Dew Point Info */}
              <div className="min-w-48 p-2 flex ring-4 ring-[#FFFF99] rounded-md bg-[#34495E] text-[#FFFF99]">
                <div className="flex content-around justify-start flex-wrap space-y-2">
                  <div>
                    <div>Dew Point:</div>
                    <div className="flex flex-row items-center space-x-2">
                      <div className="font-bold text-lg">
                        {weather.current?.dewpoint_c}
                      </div>
                      <div className="text-xs">°C</div>
                    </div>
                  </div>
                  <div className="ml-3 mr-auto w-full flex justify-center">
                    <Image
                      src={DewPoint}
                      alt="dew-point-icon"
                      width={70}
                      height={70}
                    />
                  </div>
                </div>
              </div>

              {/* Precipitation Info */}
              <div className="min-w-48 p-2 flex ring-4 ring-[#FFFF99] rounded-md bg-[#34495E] text-[#FFFF99]">
                <div className="flex content-around justify-start flex-wrap space-y-2">
                  <div>
                    <div>Precipitation:</div>
                    <div className="flex flex-row items-center space-x-2">
                      <div className="font-bold text-lg">
                        {weather.current?.precip_mm}
                      </div>
                      <div className="text-xs">mm</div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center">
                    <Image
                      src={Precipitation}
                      alt="precipitation-icon"
                      width={70}
                      height={70}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
