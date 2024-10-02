import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('miku')
    .setDescription('Replies with an image of yippee-miku')

export async function execute(interaction: CommandInteraction) {
    return await interaction.reply(
        'https://tenor.com/view/miku-hatsune-miku-yippee-autism-creature-mike-gif-15786922921540826417'
    )
}
