let Discord = require("discord.js"),
  commando = require("discord.js-commando"),
  client = require("../../bot.js"),
  beforerun = require("../../lib/beforerun"),
  path = require("path"),
  fisy = require("lowdb/adapters/FileSync"),
  low = require("lowdb"),
  fs = require("fs"),
  upgrades = require("../../data/upgrades/shop");

module.exports = class extends commando.Command {
  constructor(client) {
    super(client, {
      name: "info",
      memberName: "info",
      aliases: ["myinfo"],
      description: "Sends info about your Idle Bee Farm profile.",
      group: "game"
    });
  }

  /**
   *
   * @param {Discord.Message} msg
   */
  run(msg) {
    if (beforerun(msg, true) == true) {
      let data = low(
        new fisy(
          path.join(__dirname, "../..", "db", "users", `${msg.author.id}.json`)
        )
      );
      var content = msg.content;
      var args = content.split(" ");
      if (!args[2]) {
        msg.channel.send(
          "Oops! The info command follows the following format: `bee info <shop, bee, or honey>`"
        );
      } else if (args[2] == "shop") {
        msg.channel.send(
          new Discord.RichEmbed()
            .setAuthor(
              "Idle Bee Factory > Upgrade > Shop",
              msg.author.avatarURL
            )
            .setColor(embedc)
            .setThumbnail("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fshop.png?v=1578777620901")
            .setDescription(
              `Your shop is lvl ${data
                .get("upgrades.shop")
                .value()}\nYour honey sells for ${
                upgrades.get(`${parseInt(data.get("upgrades.shop").value())}`)
                  .amount
              } ${emojis.money}`
            )
        );
      } else if (args[2] == "honey") {
        msg.channel.send(
          new Discord.RichEmbed()
            .setAuthor(
              "Idle Bee Factory > Upgrade > Honey",
              msg.author.avatarURL
            )
            .setThumbnail("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fhoney.png?v=1578777010316https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fhoney.png?v=1578777010316")
            .setColor(embedc)
            .setDescription(
              `Your honey ${emojis.honeyjar} is lvl ${data
                .get("upgrades.honey").value()}, it sells for ${upgrades.get(
                `${parseInt(data.get("upgrades.shop").value())}`
              ).amount
              } ${emojis.money}`
            )
        );
      } else if (args[2] == "bee") {
        msg.channel.send(
          new Discord.RichEmbed()
            .setAuthor("Idle Bee Farm > Upgrade > Bee", msg.author.avatarURL)
            .setColor(embedc)
            .setThumbnail("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fapitherapy.png?v=1578777252454")
            .setDescription(
              `Your bee(s) ${emojis.bee} are lvl ${data
                .get("upgrades.bee")
                .value()}`
            )
        );
      } else {
        msg.channel.send(
          "Oops! Incorrect info type. The info command follows the following format: `bee info <shop, bee, or honey>`"
        );
      }
    }
  }
};
//};
