let Discord = require("discord.js"),
  commando = require("discord.js-commando"),
  client = require("../../bot.js"),
  beforerun = require("../../lib/beforerun"),
  fs = require("fs"),
  path = require("path");

module.exports = class extends commando.Command {
  constructor(client) {
    super(client, {
      name: "donate",
      aliases: ["dono"],
      memberName: "donate",
      description: "BEE INVITE NO BEE INVITES UR MUM ON A DATE!",
      group: "util"
    });
  }

  run(msg) {
    //there ya go
    // this is too legal ok lol
    const message = new Discord.RichEmbed()
      .setAuthor("Idle Bee Farm > Donate", msg.author.avatarURL)
      .setDescription(`Hey there! If you'd like to donate to our project use one of the methods below, any amount of donation means alot to us, you'll get a donator role in the support server & 10,000 money too if you donate.

• [Donate using Patreon](https://patreon.com/idlebeefarm)
• [Donate using PayPal](https://paypal.me/imhuss)
    
- After donating you need to contact \` _huss22#0024\``)
      .setTimestamp()
      .setFooter("Made with ❤️ and with help of our community")
      .setColor(embedc); //Glitch doesn't know Global variables, so it thinks it's an error, but it isn't.
    msg.channel.send(message);
  }
};
