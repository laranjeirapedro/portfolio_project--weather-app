import { WeatherApp } from "./components"

export default function Home() {
  return (
    <div className="w-full h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg2.png')" }}>
      <WeatherApp />
    </div>
  );
}

