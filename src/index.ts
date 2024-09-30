import fs from 'fs'
import path from 'path'

import { Client, Collection, Events, IntentsBitField } from 'discord.js'
import dotenv from 'dotenv'

import { ClientWithCommands } from './clientWithCommands'

dotenv.config()

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.Guilds],
}) as ClientWithCommands

loadCommands()
loadEvents()

client.login(process.env.TOKEN)

// Function declarations
function loadCommands() {
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
}

function loadEvents() {
    const eventsPath = path.join(__dirname, 'events')
    const eventFiles = fs
        .readdirSync(eventsPath)
        .filter((file) => file.endsWith('.js') || file.endsWith('.ts'))

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file)
        const event = require(filePath)

        console.log(`Loading ${file}...`)

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args))
            console.log(`${file} loaded!`)
        } else {
            client.on(event.name, (...args) => event.execute(...args))
            console.log(`${file} loaded!`)
        }
    }
}
