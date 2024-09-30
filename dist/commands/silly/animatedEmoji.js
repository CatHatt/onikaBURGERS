"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
exports.execute = execute;
const discord_js_1 = require("discord.js");
exports.data = new discord_js_1.SlashCommandBuilder()
    .setName('animatedemoji')
    .setDescription('Sends a animated emoji without Nitro!')
    .addStringOption((option) => option
    .setName('message')
    .setDescription('The message you want to send')
    .setRequired(true));
async function execute(interaction) {
    let message = interaction.options.get('message', true).value?.toString();
    if (!message)
        return interaction.reply('No message was entered');
    let unknownEmojis = [];
    message.replaceAll(/:[^:]+:/g, (emojiInput) => {
        let emojiName = emojiInput.substring(1, emojiInput.length - 1);
        const foundEmoji = interaction.guild?.emojis.cache
            .find((guildEmoji) => guildEmoji.name ===
            emojiInput.substring(1, emojiInput.length - 1))
            ?.toString();
        if (!foundEmoji) {
            unknownEmojis.push(emojiName);
            return emojiInput;
        }
        return foundEmoji;
    });
    await interaction.reply({ content: message });
    if (unknownEmojis.length > 0) {
        const filteredUnknownEmojis = removeDuplicates(unknownEmojis);
        const unknownEmojiMessage = filteredUnknownEmojis.length == 1
            ? `The emoji ${filteredUnknownEmojis
                .map((emoji) => `\`${emoji}\``)
                .join(', ')} is not an emoji in this server and couldn't be used`
            : `The emojis ${filteredUnknownEmojis
                .map((emoji) => `\`${emoji}\``)
                .join(', ')} are not emojis in this server and couldn't be used`;
        await interaction.followUp({
            content: unknownEmojiMessage,
            ephemeral: true,
        });
    }
}
function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}
