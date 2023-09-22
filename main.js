import { Terminal } from "xterm";
import "./node_modules/xterm/css/xterm.css";
import processCommand from "./src/commandProcessor.js";
import handleKeyInput from "./src/keyInputHandler.js";

const term = new Terminal();
term.open(document.getElementById("terminal"));

term.onKey((eventData) => handleKeyInput(eventData, term, processCommand));

term.write("$ "); // Initial prompt
