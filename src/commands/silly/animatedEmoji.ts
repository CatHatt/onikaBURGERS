import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('animatedemoji')
    .setDescription('Sends a animated emoji without Nitro!')
    .addStringOption((option) =>
        option
            .setName('emoji')
            .setDescription('The code of the emoji you want to use')
            .setRequired(true)
    )
    .addIntegerOption((option) =>
        option
            .setName('repeat')
            .setDescription('How many times to repeat the emoji')
            .setMinValue(1)
    )

export async function execute(interaction: CommandInteraction) {
    let emojiName = interaction.options.get('emoji', true).value?.toString()
    if (!emojiName) return

    // Checks if the emoji name is in the format of :emojiname:
    if (!/^:.+:$/.test(emojiName)) {
        // Gets the name of the emoji if its formatted as <:emojiname:1234567890> or <a:emojiname:1234567890> and in turn checks if it is formatted like one of those two options
        const newEmojiName = /^(?:<a:|<:)([a-zA-Z0-9_]+):(\d+)>$|^null$/.exec(
            emojiName
        )

        if (!newEmojiName)
            return interaction.reply({
                content: `The emoji \`${emojiName}\` is not a valid discord emoji`,
                ephemeral: true,
            })

        emojiName = newEmojiName[1]
    }

    const emoji = interaction.guild?.emojis.cache.find(
        (guildEmoji) => guildEmoji.name === emojiName
    )

    if (!emoji)
        return interaction.reply({
            content: `The emoji \`${emojiName}\` is not an emoji in this server`,
            ephemeral: true,
        })

    const repeatAmount = interaction.options.get('repeat')?.value ?? 1

    interaction.reply(
        `${new Array(repeatAmount).fill(`<${emoji.identifier}>`).join('')}`
    )

    if (!emoji.animated)
        interaction.followUp({ content: `Note`, ephemeral: true })
}
