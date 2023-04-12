import { inquirerMenu, pause, readInput } from "./helpers/inquirer.js";
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
        const place = await readInput("Ciudad: ");
        await searchs.searchPlace(place);
        // Search places

        // Search place

        // Weather

        // Show results

        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad: ");
        console.log("Lat: ");
        console.log("Lng: ");
        console.log("Temperatura: ");
        console.log("Mínima: ");
        console.log("Máxima: ");
        break;

      default:
        break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
