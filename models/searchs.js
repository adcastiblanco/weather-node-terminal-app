import axios from "axios";

export class Searchs {
  history = ["Bogota", "Cucuta", "Medellin"];
  constructor() {
    // TODO: Read database if exists
  }

  get mapboxParams() {
    return {
      access_token: process.env.MAPBOX_KEY,
      proximity: "ip",
      limit: 5,
    };
  }

  async searchPlace(place = "") {
    // Request HTTP
    const instance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
      params: this.mapboxParams,
    });
    try {
      const req = await instance.get();
      console.log(req.data);
      return [];
    } catch (error) {
      return [];
    }
  }
}
