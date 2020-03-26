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
            name: 'balance',
            aliases: ["bal"],
            memberName: 'balance',
            description: 'Shows your balance.',
            group: 'game',
        });
    }

    /**
     *
     * @param {Discord.Message} msg
     */
    run(msg) {
            	let user;
    if (msg.mentions.users.first()) {
      user = msg.mentions.users.first();
    } else {
   user = msg.author;
    }
    if(user.id === client.user.id){
      msg.channel.send("Oh grow up. I provide you with the cash.")
      return;
    }
            let data = low(new fisy(path.join(__dirname, '../..', 'db', 'users', `${user.id}.json`)));
  if(data.get("bees").value()) {
    let canrun = beforerun(msg, true);
        if (canrun == true) {
            msg.channel.send(new Discord.RichEmbed()
                .setAuthor("Idle Bee Farm > Balance", user.avatarURL)
                .setColor(embedc)
                .setThumbnail("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fstatement.png?v=1578778079263")
                .setDescription(`${client.users.get(user.id).username} currently has:\n - ${data.get("bees").value()} ${emojis.bee}\n - ${data.get("hives").value()} hives\n - ${data.get("unhoney").value()} uncollected ${emojis.honeyjar}\n - ${data.get("honey").value()} ${emojis.honeyjar}\n - ${data.get("money").value()} ${emojis.money}`)
            )
        }
    } else {
    msg.channel.send(new Discord.RichEmbed()
                    .setAuthor("Idle Bee Farm > Balance", user.avatarURL)
                    .setColor(embedc)
                    .setDescription("That user hasn't started a bee farm! Ask them to run `bee start`"))
  }
      
    }     
  // put other user balance message code here, you'll need to define "data" again. //
};