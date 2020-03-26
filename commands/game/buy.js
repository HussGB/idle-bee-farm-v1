let Discord = require("discord.js"),
    commando = require("discord.js-commando"),
    client = require("../../bot.js"),
    beforerun = require("../../lib/beforerun"),
    path = require("path"),
    fisy = require("lowdb/adapters/FileSync"),
    low = require("lowdb"),
    fs = require("fs"),
    upgrades = require("../../data/upgrades/hive"),
    beeupgrade = require("../../data/upgrades/bee");

module.exports = class extends commando.Command {
    constructor(client) {
        super(client, {
            name: "buy",
            memberName: "buy",
            aliases: ["buy"],
            description: "Lets you buy new bees and hives.",
            group: "game"
        });
    }

    /**
     *
     * @param {Discord.Message} msg
     */
    run(msg) {
        if (beforerun(msg, true) == true) {
            let data = low(new fisy(path.join(__dirname, "../..", "db", "users", `${msg.author.id}.json`)));
            var content = msg.content;
            var args = content.split(" ");
            if (!args[2]) {
                msg.channel.send("Oops! The buy command follows the following format: `bee buy <bee or hive>`");
            } else if (args[2] == "hive") {
                if (parseInt(data.get("money").value()) >= ((32 * parseInt(data.get("hives").value())) + 8)) {
                    data.set("hives", parseInt(data.get("hives").value()) + 1).write();
                    data.set("money", parseInt(data.get("money").value()) - ((32 * parseInt(data.get("hives").value())) + 8)).write();
                    msg.channel.send(
                        new Discord.RichEmbed()
                        .setAuthor("Idle Bee Factory > Buy > Hive", msg.author.avatarURL)
                        .setColor(embedc)
                        .setThumbnail("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fhive.png?v=1578776831219")
                        .setDescription(`You now have ${data.get("hives").value()} hives and ${data.get("money").value()} money ${emojis.money}.`)
                    );
                } else {
                    msg.channel.send(`Oops, you don't have enough money to buy that! (it costs ${((32 * parseInt(data.get("hives").value())) + 8)}, you have ${data.get("money")})`);
                }
     
            }
          else if (args[2] == "bee") {
                if (parseInt(data.get("money").value()) >= ((32 * parseInt(data.get("bees").value())) + 7)) {
                    data.set("bees", parseInt(data.get("bees").value()) + 1).write();
                    data.set("money", parseInt(data.get("money").value()) - ((32 * parseInt(data.get("bees").value())) + 7)).write();
                    msg.channel.send(
                        new Discord.RichEmbed()
                        .setAuthor("Idle Bee Factory > Buy > Bee", msg.author.avatarURL)
                        .setColor(embedc)
                        .setThumbnail("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fapitherapy.png?v=1578777252454")
                        .setDescription(`You now have ${data.get("bees").value()} bees ${emojis.bee} and ${data.get("money").value()} money ${emojis.money}.`)
                    );
                } else {
                    msg.channel.send(`Oops, you don't have enough money to buy that! (it costs ${((32 * parseInt(data.get("bees").value())) + 7)}, you have ${data.get("money")})`);
                }
     
            }
          
          else {
                msg.channel.send("Oops! I couldn't find that item. The buy command follows the following format: `bee buy <bee or hive>`");
            }
        }
    }
 };