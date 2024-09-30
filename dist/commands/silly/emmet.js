"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
const emmet_1 = __importDefault(require("emmet"));
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName('emmet')
    .setDescription('Converts emmet abbreviation to code')
    .addStringOption((option) => option
    .setName('abbreviation')
    .setDescription('The code block to parse')
    .setRequired(true));
async function execute(interaction) {
    const abbreviation = interaction.options
        .get('abbreviation', true)
        .value?.toString();
    if (!abbreviation)
        return;
    return await interaction.reply(`\`\`\`html\n${(0, emmet_1.default)(abbreviation)}\`\`\``);
}
