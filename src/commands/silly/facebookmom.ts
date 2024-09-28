import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('facebookmom')
    .setDescription('Replies with who is a facebook mom')

export async function execute(interaction: CommandInteraction) {
    return await interaction.reply(
        `<@1154329293250375741> is a certified **Facebook Mom™**`
    )
}
