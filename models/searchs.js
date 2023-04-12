import axios from "axios";
import { writeFileSync, existsSync, readFileSync } from "fs";
export class Searchs {
  history = [];
  dbPath = "./db/database.json";

  constructor() {
    // TODO: Read database if exists
    this.readPlacesInDB();
  }

  get capitalizedHistory() {
    return this.history.map((place) => {
      let words = place.split(" ");
      words = words.map((word) => word[0].toUpperCase() + word.substring(1));
      return words.join(" ");
    });
  }

  get mapboxParams() {
    return {
      access_token: process.env.MAPBOX_KEY,
      proximity: "ip",
      limit: 5,
    };
  }

  get openweatherParams() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      lang: "es",
      units: "metric",
    };
  }

  async searchPlace(place = "") {
    // Request HTTP
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.mapboxParams,
      });
      const req = await instance.get();
      return req.data.features.map(({ id, place_name, center }) => ({
        id,
        name: place_name,
        lng: center[0],
        lat: center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async weatherByPlace(lat, lon) {
    try {
      // Instance of axios
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: {
          ...this.openweatherParams,
          lat,
          lon,
        },
      });
      // Extract .data from response
      const res = await instance.get();
      const { weather, main } = res.data;

      return {
        desc: weather[0].description,
        minTemp: main.temp_min,
        maxTemp: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.error(error);
    }
  }

  addHistory(place = "") {
    // TODO: Avoid duplicated

    if (this.history.includes(place.toLocaleLowerCase())) return;
    this.history.splice(0, 5);
    this.history.unshift(place.toLocaleLowerCase());
    // Save in DB

    this.savePlaceInDB();
  }

  savePlaceInDB() {
    const payload = {
      history: this.history,
    };
    writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readPlacesInDB() {
    if (!existsSync(this.dbPath)) return;
    const data = readFileSync(this.dbPath, { encoding: "utf-8" });
    const placesJSON = JSON.parse(data);
    this.history = placesJSON.history;
  }
}
