import { commands } from "./shell.js";
import { term } from "../main.js";
import { loadtest } from "./random.js";
import { chars } from "./random.js";

/**
 * Main function to process terminal commands.
 * Delegates work to individual command functions from the mockShell (shell.js).
 *
 * @param {string} command - The command entered by the user.
 * @returns {string} - The output of the command.
 */
export default function handleCommand(command) {
  const [cmd, ...args] = command.split(" ");

  switch (cmd) {
    case "ls":
      return commands.ls(args);
    case "cd":
      return commands.cd(args[0]);
    case "cat":
      return commands.cat(args[0]);
    case "pwd":
      return commands.pwd();
    case "help":
      return commands.help();
    case "loadtest":
      return loadtest(term);
    case "chars":
      return chars(term);

    default:
      return `Unknown command: ${cmd}`;
  }
}
