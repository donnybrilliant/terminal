import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import "./node_modules/xterm/css/xterm.css";
import "./src/styles.css";
import processCommand from "./src/commandProcessor.js";
import handleKeyInput from "./src/keyInputHandler.js";

export const term = new Terminal();

// Create and apply the fit addon
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

// Create and apply the web links addon
const webLinksAddon = new WebLinksAddon();
term.loadAddon(webLinksAddon);

// Apply the terminal to the DOM
term.open(document.getElementById("terminal"));

fitAddon.fit(); // Fit to the container on initial load

// Refit on window resize
window.addEventListener("resize", () => {
  fitAddon.fit(); // Refit on window resize
});

// Handle key input
term.onKey((eventData) => handleKeyInput(eventData, term, processCommand));

// Welcome message
term.write("Welcome to the mock terminal.\r\n");
term.write("Type 'help' to get started.\r\n\r\n");

// Initial prompt
term.write("$ ");
