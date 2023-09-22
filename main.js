import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "./node_modules/xterm/css/xterm.css";
import "./src/styles.css";
import processCommand from "./src/commandProcessor.js";
import handleKeyInput from "./src/keyInputHandler.js";

const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);
term.open(document.getElementById("terminal"));

fitAddon.fit(); // Fit to the container on initial load

window.addEventListener("resize", () => {
  fitAddon.fit(); // Refit on window resize
});

term.onKey((eventData) => handleKeyInput(eventData, term, processCommand));

// Welcome message
/* term.write("Welcome to the mock terminal.\r\n");
term.write("Type 'help' to get started.\r\n\r\n"); */

term.write("$ "); // Initial prompt
