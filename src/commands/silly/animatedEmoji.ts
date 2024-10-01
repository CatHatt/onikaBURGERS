import { CommandInteraction, GuildEmoji, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
    .setName('animatedemoji')
    .setDescription('Sends a animated emoji without Nitro!')
    .addStringOption((option) =>
        option
            .setName('message')
            .setDescription('The message you want to send')
            .setRequired(true)
    )

export async function execute(interaction: CommandInteraction) {
    let message = interaction.options.get('message', true).value?.toString()
    // Should await the 'interaction.reply' since it return a promise
    if (!message) return interaction.reply('No message was entered')

    // Should be a const since it is never re-initialized
    let unknownEmojis: string[] = []

    // The regex should have its own variable so that it is easier to see what it does
    message.replaceAll(/:[^:]+:/g, (emojiInput) => {
        // Should also be const
        let emojiName = emojiInput.substring(1, emojiInput.length - 1)
        const foundEmoji = interaction.guild?.emojis.cache
            .find(
                (guildEmoji) =>
                    guildEmoji.name ===
                    // Should the the variable created literally 6 lines up
                    emojiInput.substring(1, emojiInput.length - 1)
            )
            ?.toString()

        if (!foundEmoji) {
            unknownEmojis.push(emojiName)
            return emojiInput
        }

        return foundEmoji
    })

    await interaction.reply({ content: message })

    if (unknownEmojis.length > 0) {
        const filteredUnknownEmojis = removeDuplicates(unknownEmojis)

        const unknownEmojiMessage =
            filteredUnknownEmojis.length == 1
                ? `The emoji ${filteredUnknownEmojis
                    .map((emoji) => `\`${emoji}\``)
                    .join(
                        ', '
                    )} is not an emoji in this server and couldn't be used`
                : `The emojis ${filteredUnknownEmojis
                    .map((emoji) => `\`${emoji}\``)
                    .join(
                        ', '
                    )} are not emojis in this server and couldn't be used`

        await interaction.followUp({
            content: unknownEmojiMessage,
            ephemeral: true,
        })
    }
}

function removeDuplicates(arr: any[]) {
    return arr.filter((item, index) => arr.indexOf(item) === index)
}
