"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName('facebookmom')
    .setDescription('Replies with who is a facebook mom');
async function execute(interaction) {
    return await interaction.reply(`<@1154329293250375741> is a certified **Facebook Mom™**`);
}
