import fileData from "../data.json";
import { ANSI_COLORS } from "./colors";

let pathStack = ["home", "user"]; // We start in /home/user by default

/**
 * Getter for the current directory.
 *
 * @returns {object} - The current directory.
 */
function getCurrentDir() {
  return pathStack.reduce((acc, dir) => acc[dir], fileData);
}

/**
 * Setter for the current directory.
 * Handles movement between directories and maintains a stack for directory traversal.
 *
 * @param {object} dir - The directory to set as current.
 */
function setCurrentDir(dir) {
  if (dir.startsWith("/")) {
    // Handle absolute paths
    let tmpDir = fileData; // Start from root
    const parts = dir.split("/").filter(Boolean); // Get directory parts, removing empty strings

    for (const part of parts) {
      if (part in tmpDir && typeof tmpDir[part] === "object") {
        tmpDir = tmpDir[part];
      } else {
        return false; // Any part in the path is not found or is not a directory
      }
    }

    // Only update pathStack after successfully navigating the path
    pathStack = parts;
    return true;
  } else {
    // Existing logic for relative paths...
    const currentDir = getCurrentDir();

    if (dir === "..") {
      if (pathStack.length > 0) {
        pathStack.pop();
      }
    } else if (dir in currentDir && typeof currentDir[dir] === "object") {
      pathStack.push(dir);
    } else {
      // Handle error (not a directory or doesn't exist)
      return false;
    }
    return true;
  }
}

function getCurrentPath() {
  return "/" + pathStack.join("/");
}

export { getCurrentDir, setCurrentDir, getCurrentPath };
