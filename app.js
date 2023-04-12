import {
  inquirerMenu,
  listPlaces,
  pause,
  readInput,
} from "./helpers/inquirer.js";
import { Searchs } from "./models/searchs.js";
import { config } from "dotenv";

config();

console.log(process.env);
const main = async () => {
  let opt = "";
  const searchs = new Searchs();
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        // Show message
        const placeToSearch = await readInput("Ciudad: ");

        // Search places
        const foundPlaces = await searchs.searchPlace(placeToSearch);

        // Search place
        const idSelectedPlace = await listPlaces(foundPlaces);
        if (idSelectedPlace === "0") continue;

        const { name, lng, lat } = foundPlaces.find(
          ({ id }) => id === idSelectedPlace
        );
        searchs.addHistory(name);
        // Weather
        const { desc, minTemp, maxTemp, temp } = await searchs.weatherByPlace(
          lat,
          lng
        );
        // Show results
        console.clear();
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad:", name.yellow);
        console.log("Lat:", lat);
        console.log("Lng:", lng);
        console.log("Temperatura:", temp);
        console.log("Mínima:", minTemp);
        console.log("Máxima:", maxTemp);
        console.log("Como está el clima:", desc);
        break;

      case 2:
        searchs.capitalizedHistory.forEach((place, index) => {
          const idx = `${index + 1}.`.green;
          console.log(`${idx} ${place}`);
        });
        break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
