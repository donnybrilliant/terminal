import { commands } from "./shell.js";

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
    default:
      return `Unknown command: ${cmd}`;
  }
}
