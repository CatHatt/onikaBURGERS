"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = exports.name = void 0;
exports.execute = execute;
const { Events } = require('discord.js');
exports.name = Events.ClientReady;
exports.once = true;
function execute(client) {
    if (!client.user)
        return;
    console.log(`Client ready. Logged in as ${client.user.tag}`);
}
