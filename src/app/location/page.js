"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  ExternalLink,
  Route,
  Compass,
  Clock,
  CloudSun,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function Page() {
  const [distance, setDistance] = useState(null);
  const [bearing, setBearing] = useState(null);
  const [eta, setEta] = useState(null);
  const [weather, setWeather] = useState(null);
  const [travelAdvice, setTravelAdvice] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const latitude = 46.4102;
  const longitude = 11.844;
  const placeName = "The Wild Oasis, Dolomites";
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=13`;

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const data = await res.json();
        const w = data.current_weather;
        setWeather(w);

        if (!w) return;

        let advice = "";
        if (w.temperature < 0)
          advice = "Too cold for travel — roads might be icy 🧊";
        else if (w.temperature < 5)
          advice = "Chilly conditions, travel with caution 🧥";
        else if (w.windspeed > 40)
          advice = "High winds — avoid mountain routes 🌬️";
        else if (w.temperature > 35)
          advice = "Too hot for a comfortable trip ☀️";
        else advice = "Weather is suitable for travel 🚗";

        setTravelAdvice(advice);
      } catch {
        setWeather(null);
        setTravelAdvice(null);
      }
    }
    fetchWeather();
  }, []);

  function getDirections() {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: userLat, longitude: userLon } = pos.coords;

        const R = 6371;
        const dLat = ((latitude - userLat) * Math.PI) / 180;
        const dLon = ((longitude - userLon) * Math.PI) / 180;

        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos((userLat * Math.PI) / 180) *
            Math.cos((latitude * Math.PI) / 180) *
            Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const dist = R * c;

        const y = Math.sin(dLon) * Math.cos(latitude);
        const x =
          Math.cos(userLat) * Math.sin(latitude) -
          Math.sin(userLat) * Math.cos(latitude) * Math.cos(dLon);
        const brng = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;

        setDistance(dist.toFixed(2));
        setBearing(brng.toFixed(1));

        const avgSpeed = 60;
        setEta(((dist / avgSpeed) * 60).toFixed(0));

        setLoading(false);
      },
      () => {
        setError("Unable to fetch your location.");
        setLoading(false);
      }
    );
  }

  return (
    <div className="flex flex-col items-center text-center gap-12 py-20 text-white">
      <h1 className="text-5xl font-semibold flex items-center gap-3">
        <MapPin className="h-10 w-10 text-accent-400" />
        Locate Us Here
      </h1>

      <p className="text-lg max-w-2xl text-gray-300">
        Nestled in the heart of the{" "}
        <span className="text-accent-300">Italian Dolomites</span>, The Wild
        Oasis offers breathtaking views and the serenity of nature.
      </p>

      {weather && (
        <div className="bg-white/10 px-6 py-3 rounded-full text-white font-semibold shadow-lg flex items-center gap-3">
          <CloudSun className="h-6 w-6 text-accent-400" />
          {weather.temperature}°C · {weather.windspeed} km/h wind
        </div>
      )}

      {travelAdvice && (
        <div
          className={`flex items-center gap-3 text-lg font-medium px-6 py-3 rounded-xl shadow-lg ${
            travelAdvice.includes("suitable")
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {travelAdvice.includes("suitable") ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <AlertTriangle className="h-5 w-5" />
          )}
          {travelAdvice}
        </div>
      )}

      <div className="rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl h-[450px] relative">
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178761.33261625242!2d${
            longitude - 0.3
          }!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47780dfb05c1d0a5%3A0x4007aeb3f0fcbf0!2sDolomites!5e0!3m2!1sen!2sit!4v1696354570000!5m2!1sen!2sit`}
        ></iframe>

        {distance && (
          <div className="absolute bottom-3 right-3 bg-black/70 px-4 py-2 text-sm text-white rounded-lg">
            📍 {distance} km away
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-accent-500 text-primary-900 text-lg font-semibold px-8 py-4 rounded-full hover:bg-accent-600 transition-all shadow-lg"
        >
          <ExternalLink className="h-5 w-5" />
          Open in Google Maps
        </a>

        <button
          onClick={getDirections}
          className="flex items-center gap-3 bg-accent-400 text-primary-900 text-lg font-semibold px-8 py-4 rounded-full hover:bg-accent-500 transition-all shadow-lg"
        >
          <Route className="h-5 w-5" />
          Get Directions
        </button>

        {loading && <p className="text-gray-300">Fetching your location...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {distance && !error && (
          <div className="mt-3 flex flex-col gap-2 items-center">
            <p className="text-xl font-semibold">
              You’re{" "}
              <span className="text-accent-300">{distance} km</span> away from
              The Wild Oasis
            </p>
            {eta && (
              <p className="flex items-center gap-2 text-gray-300">
                <Clock className="h-5 w-5" />
                Approx travel time: <strong>{eta} min</strong>
              </p>
            )}
            {bearing && (
              <p className="flex items-center gap-2 text-gray-300">
                <Compass className="h-5 w-5" />
                Bearing: <strong>{bearing}°</strong>
              </p>
            )}
          </div>
        )}
      </div>

     {/* Modern FAQ Section */}
<section className="w-full max-w-4xl mt-24 text-left">
  <h2 className="text-5xl font-semibold mb-12 text-center bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
    Frequently Asked Questions
  </h2>

  <div className="space-y-6">
    {[
      {
        q: "Can we pay with cash or only online?",
        a: "We only accept secure online payments through our website for your convenience and safety. Our online payment system ensures a smooth and hassle-free booking experience.",
      },
      {
        q: "Do all cabins have a private hot tub?",
        a: "Yes — each of our luxury cabins features a private hot tub overlooking the stunning Dolomites. It's the perfect spot to unwind under the stars after a day of adventure.",
      },
      {
        q: "Is breakfast included with the stay?",
        a: "Absolutely! Every stay includes a complimentary gourmet breakfast made with local ingredients. A full à la carte breakfast is also available upon request with additional charges.",
      },
      {
        q: "Do you allow pets at The Wild Oasis?",
        a: "We love pets! Selected cabins are pet-friendly — please check availability or contact us before booking to ensure we can accommodate your furry friends comfortably.",
      },
      {
        q: "Is parking available at the property?",
        a: "Yes, complimentary on-site parking is provided for all guests, including dedicated EV charging stations for electric vehicles.",
      },
    ].map((item, i) => (
      <details
        key={i}
        className="group rounded-2xl bg-white/5 backdrop-blur-lg px-6 py-5 transition-all duration-300 hover:bg-white/10 shadow-md hover:shadow-accent-400/20 open:shadow-accent-400/30"
      >
        <summary className="flex justify-between items-center cursor-pointer select-none text-lg font-medium text-white transition-all group-open:text-accent-300">
          <span className="flex items-center gap-3">
            <span className="text-accent-400 text-xl"></span>
            {item.q}
          </span>
          <span className="text-accent-300 text-2xl transform group-open:rotate-180 transition-transform duration-300">
            ▼
          </span>
        </summary>
        <div className="overflow-hidden transition-all duration-500 ease-in-out group-open:mt-3">
          <p className="text-gray-300 leading-relaxed text-base">
            {item.a}
          </p>
        </div>
      </details>
    ))}
  </div>
</section>

    </div>
  );
}
