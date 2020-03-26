let Discord = require("discord.js"),
  commando = require("discord.js-commando"),
  client = require("../../bot.js"),
  beforerun = require("../../lib/beforerun"),
  fs = require("fs"),
  path = require("path");

module.exports = class extends commando.Command {
  constructor(client) {
    super(client, {
      name: "vote",
      aliases: ["upvote"],
      memberName: "vote",
      description: "BEE INVITE NO BEE INVITES UR MUM ON A DATE!",
      group: "util"
    });
  }

  run(msg) {
    //there ya go
    // this is too legal ok lol
    const message = new Discord.RichEmbed()
      .setAuthor("Idle Bee Farm > Support Us", msg.author.avatarURL)
      .setDescription(`Hey! Thank you for checking out this command, i just want to tell you, that us, developers spend alot of time working on Idle Bee Farm, making it polished & stable, anyways, if you could please upvote the bot on some botlists, it would mean alot to us.

• [Upvote on DiscordBotList](https://discordbotlist.com/bots/582307283120291840)`)
      .setTimestamp()
      .setFooter("Made with ❤️ and with help of our community")
      .setColor(embedc); //Glitch doesn't know Global variables, so it thinks it's an error, but it isn't.
    msg.channel.send(message);
  }
};
