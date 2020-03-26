let Discord = require('discord.js'),
    commando = require('discord.js-commando'),
    debug = require('debug')('ibf:bot'),
    client = new commando.CommandoClient({
        selfbot: false,
        owner: ['532349905679679498', "543130718272880660"],
        commandPrefix: 'bee',
        unknownCommandResponse: false
    }),
    path = require('path'),
    disclb = require('disclb');

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require('debug').enable('ibf*');
global.debug = debug;
global.embedc = "#36393F";
global.emojis = {
    honeyjar: "<:honeyjar:582309157521195205>",
    beewaving: "<:beewaving:582309141368930325>",
    bee: "<:bee:582309120632422418>",
    money: "💵"
};

disclb.initDisclb(client);

module.exports = client;
require('./events/commando');
require('./events/ready');

require('./lib/updatedata');

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerGroups([
        ['util', 'Utility'],
        ['game', 'Game'],
        ['fun', 'Fun']
    ])
    .registerDefaultCommands({
        eval_: false,
        help: false
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

require('dotenv').config();
client.login(process.env.TOKEN);