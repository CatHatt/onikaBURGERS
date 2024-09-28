import fs from 'fs'
import path from 'path'

import { Client, Collection, Events, IntentsBitField } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

type ClientWithCommands = Client & {
    commands: Collection<string, any>
}

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.Guilds],
}) as ClientWithCommands

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Client ready. Logged in as ${readyClient.user.tag}`)
})

client.commands = new Collection()

const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder)
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.js') || file.endsWith('.ts'))

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)

        console.log(`Loading ${file}...`)

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)

            console.log(`${file} loaded!`)
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            )
        }
    }
}

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = (interaction.client as ClientWithCommands).commands.get(
        interaction.commandName
    )

    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        )
        return
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            })
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            })
        }
    }
})

client.login(process.env.TOKEN)
