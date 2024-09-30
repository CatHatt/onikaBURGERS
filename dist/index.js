"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [discord_js_1.IntentsBitField.Flags.Guilds, discord_js_1.IntentsBitField.Flags.Guilds],
});
loadCommands();
loadEvents();
client.login(process.env.TOKEN);
// Function declarations
function loadCommands() {
    client.commands = new discord_js_1.Collection();
    const foldersPath = path_1.default.join(__dirname, 'commands');
    const commandFolders = fs_1.default.readdirSync(foldersPath);
    for (const folder of commandFolders) {
        const commandsPath = path_1.default.join(foldersPath, folder);
        const commandFiles = fs_1.default
            .readdirSync(commandsPath)
            .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
        for (const file of commandFiles) {
            const filePath = path_1.default.join(commandsPath, file);
            const command = require(filePath);
            console.log(`Loading ${file}...`);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
                console.log(`${file} loaded!`);
            }
            else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}
function loadEvents() {
    const eventsPath = path_1.default.join(__dirname, 'events');
    const eventFiles = fs_1.default
        .readdirSync(eventsPath)
        .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
    for (const file of eventFiles) {
        const filePath = path_1.default.join(eventsPath, file);
        const event = require(filePath);
        console.log(`Loading ${file}...`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
            console.log(`${file} loaded!`);
        }
        else {
            client.on(event.name, (...args) => event.execute(...args));
            console.log(`${file} loaded!`);
        }
    }
}
