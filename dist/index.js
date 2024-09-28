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
client.once(discord_js_1.Events.ClientReady, (readyClient) => {
    console.log(`Client ready. Logged in as ${readyClient.user.tag}`);
});
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
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }
    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
        else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        }
    }
});
client.login(process.env.TOKEN);
