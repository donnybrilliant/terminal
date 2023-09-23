import { commands } from "./shell.js";
import { term } from "../main.js";
import { loadtest, chars, hack, startMatrix, getClientInfo } from "./random.js";
import {
  editFile,
  saveEdits,
  exitEdit,
  isInEditMode,
  appendToEditedContent,
  getEditedContent,
} from "./edit.js";

/**
 * Main function to process terminal commands.
 * Delegates work to individual command functions from the mockShell (shell.js).
 *
 * @param {string} command - The command entered by the user.
 * @returns {string} - The output of the command.
 */
export default function handleCommand(command) {
  const [cmd, ...args] = command.split(" ");

  // Check if the system is in edit mode
  if (isInEditMode()) {
    if (cmd.trim() === ":save") {
      return saveEdits(getEditedContent().trim());
    } else if (cmd.trim() === ":exit") {
      return exitEdit();
    } else {
      appendToEditedContent(cmd); // Add the user input to editedContent
      return "";
    }
  }

  // If not in edit mode, proceed with normal command processing
  switch (cmd) {
    case "nano":
    case "vi":
    case "edit":
      return editFile(args[0]);
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
    case "hack":
      return hack(term);
    case "matrix":
      return startMatrix(term);
    case "info":
      return getClientInfo();
    case "name":
      return commands.name(args.join(" "));
    case "rm":
      return commands.rm(args);
    case "clear":
      return commands.clear();
    case "hola":
      return "hello";

    default:
      return `Unknown command: ${cmd}`;
  }
}
