import { Client } from 'discord.js'

const { Events } = require('discord.js')

export const name = Events.ClientReady

export const once = true

export function execute(client: Client) {
    if (!client.user) return
    console.log(`Client ready. Logged in as ${client.user.tag}`)
}
