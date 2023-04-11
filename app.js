import { inquirerMenu, pause } from "./helpers/inquirer.js";

const main = async () => {
  let opt = "";
  do {
    opt = await inquirerMenu();
    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
