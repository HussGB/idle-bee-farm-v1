let Discord = require('discord.js'),
    commando = require('discord.js-commando'),
    client = require('../bot.js'),
    low = require('lowdb'),
    fisy = require('lowdb/adapters/FileSync'),
    fs = require('fs'),
    path = require('path');

module.exports =
/**
 * @param {Discord.Message} msg
 */
(msg, needstart) => {
    if(!msg.content.startsWith('bee ')) {
        msg.channel.send('Oops, commands must use the format `bee {command} {args}`');
        return false;
    } else {
        if(needstart == true) {
            if(!fs.existsSync(path.join(__dirname, '..', 'db', 'users', `${msg.author.id}.json`))) {
                msg.channel.send('Oops, you need to run `bee start` before you can use this command!');
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
};