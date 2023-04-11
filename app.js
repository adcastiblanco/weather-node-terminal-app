import { readInput } from "./helpers/inquirer.js";

const main = async () => {
  const data = await readInput("Hola: ");
  console.log(data);
};

main();
