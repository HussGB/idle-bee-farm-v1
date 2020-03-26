[]; //bot broken, fuck.
// Super Donald trump license activated,

let Discord = require("discord.js"),
  commando = require("discord.js-commando"),
  client = require("../../bot.js"),
  beforerun = require("../../lib/beforerun"),
  fs = require("fs"),
  path = require("path");

module.exports = class extends commando.Command {
  constructor(client) {
    super(client, {
      name: "invite",
      aliases: ["invme", "links"],
      memberName: "invite",
      description: "BEE INVITE NO BEE INVITES UR MUM ON A DATE!",
      group: "util"
    });
  }

  run(msg) {
    //there ya go
    // this is too legal ok lol
    const message = new Discord.RichEmbed()
      .setAuthor("Idle Bee Farm > Invite", msg.author.avatarURL)
      .setDescription(`• [Click To Invite](https://discordapp.com/oauth2/authorize?client_id=582307283120291840&scope=bot&permissions=8)
• [Support Server](https://discord.gg/7sjhnFU)
• [Website](https://idlebeefarm.club)
• [Our Twitter](https://twitter.com/idlebeefarm?s=09)`)
      .setTimestamp()
      .setFooter(msg.author.username)
      .setColor(embedc); //Glitch doesn't know Global variables, so it thinks it's an error, but it isn't.
    msg.channel.send(message);
  }
};
