let Discord = require('discord.js'),
    commando = require('discord.js-commando'),
    debug = require('debug')('ibf:bot'),
    client = require('../bot.js'),
    fs = require('fs'),
    path = require('path');

client.on('ready', () => {
    client.generateInvite('ADMINISTRATOR').then((link) => {
        debug(`Invite link = ${link}`);
    });
    client.user.setPresence({
        afk: false,
        game: {
            name: `${fs.readdirSync(path.join(__dirname, '..', 'db', 'users')).length}/${client.users.size} users bees across ${client.guilds.size} servers`,
            type: 'WATCHING',
            url: null
        },
        status: 'idle'
    });
    setInterval(() => {
        client.user.setPresence({
            afk: false,
            game: {
                name: `${fs.readdirSync(path.join(__dirname, '..', 'db', 'users')).length}/${client.users.size} users bees across ${client.guilds.size} servers`,
                type: 'WATCHING',
                url: null
            },
            status: 'idle'
        });
    }, 5000);
    debug(`Client presence set`);
});