import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import expand from 'emmet'

export const data = new SlashCommandBuilder()
    .setName('emmet')
    .setDescription('Converts emmet abbreviation to code')
    .addStringOption((option) =>
        option
            .setName('abbreviation')
            .setDescription('The abbreviation to parse')
            .setRequired(true)
    )

export async function execute(interaction: CommandInteraction) {
    const abbreviation = interaction.options
        .get('abbreviation', true)
        .value?.toString()
    if (!abbreviation) return

    return await interaction.reply(`\`\`\`html\n${expand(abbreviation)}\`\`\``)
}
