import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import expand from 'emmet'

export const data = new SlashCommandBuilder()
  .setName('emmetabbrieviations')
  .setDescription('Adds the emmet abbrieviation functionality to discord')
  .addStringOption((option) =>
    option
      .setName('codeblock')
      .setDescription('The code block to parse')
      .setRequired(true)
  )

export async function execute(interaction: CommandInteraction) {
  const content = interaction.options.get('codeblock', true).value.toString()

  return await interaction.reply(
    `\`\`\`html\n${expand(content)}\`\`\``
  )
}
