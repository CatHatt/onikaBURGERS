"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName('miku')
    .setDescription('Replies with an image of yippee-miku');
async function execute(interaction) {
    return await interaction.reply(`https://tenor.com/view/miku-hatsune-miku-yippee-autism-creature-mike-gif-15786922921540826417`);
}
