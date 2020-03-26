let Discord = require('discord.js'),
    commando = require('discord.js-commando'),
    client = require('../../bot.js'),
    beforerun = require('../../lib/beforerun'),
    path = require('path'),
    fisy = require('lowdb/adapters/FileSync'),
    low = require('lowdb'),
    fs = require('fs'),
    bored = require('../../data/boredom');

module.exports = class extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'bored',
            aliases: ['boredom'],
            memberName: 'bored',
            description: 'Sends a random thing you can do to cure boredom.',
            group: 'fun',
        });
    }

    /**
     *
     * @param {Discord.Message} msg
     */
    run(msg) {
        if (beforerun(msg, false) == true) {
            msg.channel.send(new Discord.RichEmbed().setTitle("What to do when bored").setDescription(bored[Math.floor(Math.random() * (bored.length))]).setColor(embedc));
        }
    }
};