import { setCurrentDir, getCurrentDir, getCurrentPath } from "./fileSystem.js";
import { ANSI_COLORS } from "./colors";
/**
 * Mocked ShellJS 'ls' command with list flag support.
 * Lists contents of the given directory, excluding metadata.
 * If '-l' flag is provided, the directory contents are displayed as a list.
 *
 * @param {Array<string>} args - Array containing command arguments. ['-l'] is the supported flag.
 * @returns {string} - Space-separated list of entries in the directory.
 */
function ls(args = []) {
  const path = getCurrentDir();
  const listFlag = args.includes("-l");

  const contents = Object.keys(path).filter(
    (key) => key !== "name" && key !== "parent"
  );

  if (listFlag) {
    return contents
      .map((entry) => {
        const isDir = typeof path[entry] === "object";
        const type = isDir
          ? `${ANSI_COLORS.blue}[DIR]${ANSI_COLORS.reset} `
          : `${ANSI_COLORS.green}[FILE]${ANSI_COLORS.reset} `;

        if (isDir) {
          return type + entry;
        } else {
          return type + createHyperlink(entry, path[entry]);
        }
      })
      .join("\r\n");
  }

  return contents
    .map((entry) => {
      if (typeof path[entry] === "object") {
        return entry;
      } else {
        return createHyperlink(entry, path[entry]);
      }
    })
    .join("  ");
}

/**
 * Wraps a given text with ANSI escape codes to make it appear as a hyperlink in the terminal.
 * When detected by a terminal handler (like xterm-addon-web-links), the text becomes clickable,
 * redirecting the user to the specified URL.
 *
 * @param {string} text - The display text that will appear as a clickable hyperlink in the terminal.
 * @param {string} url - The actual URL to which the hyperlink should point.
 * @returns {string} - The text wrapped with the necessary ANSI escape codes to make it a hyperlink.
 */
function createHyperlink(text, url) {
  return `\x1B]8;;${url}\x1B\\${text}\x1B]8;;\x1B\\`;
}

/**
 * Mocked ShellJS 'cat' command.
 * Displays the contents of a file.
 *
 * @param {string} filename - Name of the file to display.
 * @returns {string} - Content of the file or an error message.
 */
function cat(filename) {
  const currentDir = getCurrentDir();
  if (filename in currentDir) {
    return currentDir[filename];
  } else {
    return `cat: ${filename}: No such file`;
  }
}

/**
 * Mocked ShellJS 'cd' command.
 * Changes the current directory.
 *
 * @param {string} dir - Name of the directory to change into.
 * @returns {string} - Success or error message.
 */
function cd(dir) {
  if (setCurrentDir(dir)) {
    return pwd();
  } else if (typeof getCurrentDir()[dir] === "string") {
    return `Cannot cd into ${dir}. It's a file, not a directory.`;
  } else {
    return `cd: ${dir}: No such directory`;
  }
}

/**
 * Function to handle the 'pwd' command.
 * Shows the current directory path.
 *
 * @returns {string} - The current directory path.
 */
function pwd() {
  return getCurrentPath();
}

/**
 * Displays a list of available commands to the user.
 *
 * @returns {string} - A string containing the list of available commands.
 */
function help() {
  return (
    `${ANSI_COLORS.red}Available commands:\r\n` +
    `${ANSI_COLORS.green}ls [-l]${ANSI_COLORS.reset}         - List directory contents\r\n` +
    `${ANSI_COLORS.green}cat <filename>${ANSI_COLORS.reset}  - Display file contents\r\n` +
    `${ANSI_COLORS.green}cd <directory>${ANSI_COLORS.reset}  - Change current directory\r\n` +
    `${ANSI_COLORS.green}pwd${ANSI_COLORS.reset}             - Print current directory\r\n` +
    `${ANSI_COLORS.green}loadtest${ANSI_COLORS.reset}        - Stolen from xtermjs.org\r\n` +
    `${ANSI_COLORS.green}chars${ANSI_COLORS.reset}           - Stolen from xtermjs.org\r\n` +
    `${ANSI_COLORS.green}help${ANSI_COLORS.reset}            - Display this help menu`
  );
}

// Exporting the mocked commands for use in the command processor.
export const commands = {
  ls: ls,
  cat: cat,
  cd: cd,
  pwd: pwd,
  help: help,
};
