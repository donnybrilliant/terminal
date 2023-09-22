let commandBuffer = ""; // Maintains a buffer of the current command being typed by the user.

/**
 * Getter function for the command buffer.
 *
 * @returns {string} - The current value of the command buffer.
 */
export function getCommandBuffer() {
  return commandBuffer;
}

/**
 * Setter function for the command buffer.
 *
 * @param {string} value - The value to set for the command buffer.
 */
export function setCommandBuffer(value) {
  commandBuffer = value;
}

/**
 * Handles the individual key inputs from the user for the terminal.
 *
 * @param {Object} param0 - Destructured parameter object.
 * @param {string} param0.key - The character representation of the key pressed.
 * @param {Object} param0.domEvent - The original key event object.
 * @param {Object} term - The xterm.js terminal object where the input and output are displayed.
 * @param {function} processCommand - The function to process the full command once Enter is pressed.
 */
export default function handleKeyInput(
  { key, domEvent },
  term,
  processCommand
) {
  const keyCode = domEvent.keyCode;

  // Handle backspace key press.
  // Remove the last character from the command buffer and update the terminal display.
  if (keyCode === 8) {
    if (commandBuffer.length > 0) {
      commandBuffer = commandBuffer.slice(0, -1);
      term.write("\b \b"); // Go back one space, write a space (to overwrite the character), then go back again.
    }
  } else if (keyCode === 13) {
    // Handle Enter key press.
    // Process the command, display the output, and reset the command buffer.
    const output = processCommand(commandBuffer);
    term.write("\r\n" + output + "\r\n$ ");
    commandBuffer = "";
  } else {
    // Handle regular key presses.
    // Append the character to the command buffer and display it on the terminal.
    commandBuffer += key;
    term.write(key);
  }
}
