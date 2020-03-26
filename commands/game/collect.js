let Discord = require('discord.js'),
    commando = require('discord.js-commando'),
    client = require('../../bot.js'),
    beforerun = require('../../lib/beforerun'),
    path = require('path'),
    fisy = require('lowdb/adapters/FileSync'),
    low = require('lowdb'),
    fs = require('fs');

module.exports = class extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'collect',
            aliases: ["c"],
            memberName: 'collect',
            description: 'Collects your honey.',
            group: 'game',
        });
    }

    /**
     *
     * @param {Discord.Message} msg
     */
    run(msg) {
        if (beforerun(msg, true) == true) {
            let data = low(new fisy(path.join(__dirname, '../..', 'db', 'users', `${msg.author.id}.json`)));
            if (parseInt(data.get("unhoney").value()) > 0) {
                data.set("honey", parseInt(data.get("honey").value()) + parseInt(data.get("unhoney").value())).write();
                data.set("unhoney", 0).write();
                msg.channel.send(new Discord.RichEmbed().setAuthor("Idle Bee Farm > Collect Honey", msg.author.avatarURL).setColor(embedc).setThumbnail("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fhoney.png?v=1578777010316").setDescription(`You collected your honey! You now have ${data.get("honey").value()} ${emojis.honeyjar}`));
            } else {
                msg.channel.send("Oops, you have **0** uncollected honey. Try again in 4 minutes.");
            }
        }
    }
};