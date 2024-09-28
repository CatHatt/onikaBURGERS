import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { ClientWithCommands } from '../../clientWithCommands'

export const data = new SlashCommandBuilder()
    .setName('hotreload')
    .setDescription('Hot reloads a command.')
    .addStringOption((option) =>
        option
            .setName('command')
            .setDescription('The command to reload.')
            .setRequired(true)
    )

export async function execute(interaction: CommandInteraction) {
    const commandName = interaction.options
        .get('command', true)
        .value?.toString()
        .toLowerCase()
    if (!commandName) return
    const command = (interaction.client as ClientWithCommands).commands.get(
        commandName
    )

    if (!command) {
        return interaction.reply(
            `There is no command with name \`${commandName}\`!`
        )
    }

    try {
        const newCommand = require(`./${command.data.name}.js`)
        ;(interaction.client as ClientWithCommands).commands.set(
            newCommand.data.name,
            newCommand
        )
        await interaction.reply(
            `Command \`${newCommand.data.name}\` was reloaded!`
        )
    } catch (error) {
        console.error(error)
        await interaction.reply(
            `There was an error while reloading a command \`${command.data.name}\`:\n\`${error}\``
        )
    }
}
