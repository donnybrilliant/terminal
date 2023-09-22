import { setCurrentDir, getCurrentDir } from "./fileSystem.js";

/**
 * Mocked ShellJS 'ls' command.
 * Lists contents of the given directory, excluding metadata.
 *
 * @param {object} path - The directory to list. Defaults to the current directory.
 * @returns {string} - Space-separated list of entries in the directory.
 */
function ls(path = getCurrentDir()) {
  return Object.keys(path)
    .filter((key) => key !== "name" && key !== "parent")
    .join("  ");
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
  const currentDir = getCurrentDir();
  if (dir === "..") {
    setCurrentDir(null);
    return "";
  } else if (dir in currentDir) {
    // Check if the target is a directory (object) and not a file (string)
    if (typeof currentDir[dir] === "object") {
      setCurrentDir(currentDir[dir]);
      return "";
    } else {
      return `Cannot cd into ${dir}. It's a file, not a directory.`;
    }
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
  const paths = [];
  let dir = getCurrentDir();

  while (dir.parent) {
    paths.unshift(dir.name);
    dir = dir.parent;
  }
  paths.unshift("home"); // The root directory is always 'home'

  return "/" + paths.join("/");
}

// Exporting the mocked commands for use in the command processor.
export const commands = {
  ls: ls,
  cat: cat,
  cd: cd,
  pwd: pwd,
};
