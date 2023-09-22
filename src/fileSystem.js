// fileSystem.js

import fileData from "../data.json";

let currentDir = { ...fileData.home.user, name: "user", parent: fileData.home };
let dirStack = [{ ...fileData.home, name: "home", parent: null }];

/**
 * Getter for the current directory.
 *
 * @returns {object} - The current directory.
 */
function getCurrentDir() {
  return currentDir;
}

/**
 * Setter for the current directory.
 * Handles movement between directories and maintains a stack for directory traversal.
 *
 * @param {object} dir - The directory to set as current.
 */
function setCurrentDir(dir) {
  if (dir) {
    dirStack.push(currentDir);
    currentDir = dir;
  } else {
    currentDir = dirStack.pop() || fileData; // Default to home if stack is empty
  }
}

export { getCurrentDir, setCurrentDir };
