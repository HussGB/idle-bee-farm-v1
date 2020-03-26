let Discord = require("discord.js"),
    commando = require("discord.js-commando"),
    client = require("../../bot.js"),
    beforerun = require("../../lib/beforerun"),
    path = require("path"),
    fisy = require("lowdb/adapters/FileSync"),
    low = require("lowdb"),
    fs = require("fs"),
    upgrades = require("../../data/upgrades/shop"),
    hives = require('../../data/upgrades/hive'),
    honey = require('../../data/upgrades/honey'),
    bee = require('../../data/upgrades/bee');
module.exports = class extends commando.Command {
    constructor(client) {
        super(client, {
            name: "upgrade",
            memberName: "upgrade",
            aliases: ["upgrades", "up"],
            description: "Lets you upgrade your shop, honey, and bees.",
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
            if(!args[2]) {
                msg.channel.send("Oops! The upgrade command follows the following format: `bee upgrade <shop, bee, hives, or honey>`");
            } else if(args[2] == "shop") {
                if(upgrades.get(`${parseInt(data.get("upgrades.shop").value()) + 1}`)) {
                    if(parseInt(data.get("money").value()) >= upgrades.get(`${parseInt(data.get("upgrades.shop").value()) + 1}`).buy) {
                        msg.channel.send(
                            new Discord.RichEmbed()
                                .setAuthor("Idle Bee Factory > Upgrade > Shop", msg.author.avatarURL)
                                .setColor("YELLOW")
                                .setThumbnail("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fshop.png?v=1578777620901https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fshop.png?v=1578777620901")
                                .setDescription(`Upgrading your shop (lvl ${data.get("upgrades.shop").value()}) to a lvl ${parseInt(data.get("upgrades.shop").value()) + 1} shop.`)
                        );
                        data.set("upgrades.shop", parseInt(data.get("upgrades.shop").value()) + 1).write();
                        data.set("money", parseInt(data.get("money").value()) - upgrades.get(`${parseInt(data.get("upgrades.shop").value())}`).buy).write();
                    } else {
                        msg.channel.send(`Oops, you don't have enough money to get the next upgrade! (it costs ${upgrades.get(`${parseInt(data.get("upgrades.shop").value()) + 1}`).buy}, you have ${data.get("money")})`);
                    }
                } else if(!upgrades.get(`${parseInt(data.get("upgrades.shop").value()) + 1}`)) {
                    msg.channel.send("You already have the highest level shop! We are always adding new upgrades so check back soon.");
                }
            } else if (args[2] == "hives") {
                if(upgrades.get(`${parseInt(data.get("upgrades.hives").value()) + 1}`)) {
                    if(parseInt(data.get("money").value()) >= upgrades.get(`${parseInt(data.get("upgrades.hives").value()) + 1}`).buy) {
                        msg.channel.send(
                            new Discord.RichEmbed()
                                .setAuthor("Idle Bee Factory > Upgrade > Hives", msg.author.avatarURL)
                                .setColor("YELLOW")
                                .setThumbnail("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fhive%20(1).png?v=1578777438408")
                                .setDescription(`Upgrading your hives (lvl ${data.get("upgrades.hives").value()}) to lvl ${parseInt(data.get("upgrades.hives").value()) + 1} hives.`)
                        );
                        data.set("upgrades.hives", parseInt(data.get("upgrades.hives").value()) + 1).write();
                        data.set("money", parseInt(data.get("money").value()) - upgrades.get(`${parseInt(data.get("upgrades.hives").value())}`).buy).write();
                    } else {
                        msg.channel.send(`Oops, you don't have enough money to get the next upgrade! (it costs ${upgrades.get(`${parseInt(data.get("upgrades.hives").value()) + 1}`).buy}, you have ${data.get("money")})`);
                    }
                } else if(!upgrades.get(`${parseInt(data.get("upgrades.hives").value()) + 1}`)) {
                    msg.channel.send("You already have the highest level hives! We are always adding new upgrades so check back soon.");
                }
            } else if(args[2] == "bee") {
                if(upgrades.get(`${parseInt(data.get("upgrades.bee").value()) + 1}`)) {
                    if(parseInt(data.get("money").value()) >= upgrades.get(`${parseInt(data.get("upgrades.bee").value()) + 1}`).buy) {
                        msg.channel.send(
                            new Discord.RichEmbed()
                                .setAuthor("Idle Bee Factory > Upgrade > Bees", msg.author.avatarURL)
                                .setColor("YELLOW")
                                .setThumbnail("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fapitherapy.png?v=1578777252454")
                                .setDescription(`Upgrading your bee (lvl ${data.get("upgrades.bee").value()}) to a lvl ${parseInt(data.get("upgrades.bee").value()) + 1} bees.`)
                        );
                        data.set("upgrades.bee", parseInt(data.get("upgrades.bee").value()) + 1).write();
                        data.set("money", parseInt(data.get("money").value()) - upgrades.get(`${parseInt(data.get("upgrades.bee").value())}`).buy).write();
                    } else {
                        msg.channel.send(`Oops, you don't have enough money to get the next upgrade! (it costs ${upgrades.get(`${parseInt(data.get("upgrades.bee").value()) + 1}`).buy}, you have ${data.get("money")})`);
                    }
                } else if(!upgrades.get(`${parseInt(data.get("upgrades.bee").value()) + 1}`)) {
                    msg.channel.send("You already have the highest level for bees! We are always adding new upgrades so check back soon.");
                }
            } else if(args[2] == "honey") {
                if(upgrades.get(`${parseInt(data.get("upgrades.honey").value()) + 1}`)) {
                    if(parseInt(data.get("money").value()) >= honey.get(`${parseInt(data.get("upgrades.honey").value()) + 1}`).buy) {
                        msg.channel.send(
                            new Discord.RichEmbed()
                                .setAuthor("Idle Bee Factory > Upgrade > Honey", msg.author.avatarURL)
                                .setColor("YELLOW")
                                .setThumbnail("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fhoney.png?v=1578777010316")
                                .setDescription(`Upgrading your honey (lvl ${data.get("upgrades.honey").value()}) to lvl ${parseInt(data.get("upgrades.honey").value()) + 1} honey.`)
                        );
                        data.set("upgrades.honey", parseInt(data.get("upgrades.honey").value()) + 1).write();
                        data.set("money", parseInt(data.get("money").value()) - honey.get(`${parseInt(data.get("upgrades.honey").value())}`).buy).write();
                    } else {
                        msg.channel.send(`Oops, you don't have enough money to get the next upgrade! (it costs ${honey.get(`${parseInt(data.get("upgrades.honey").value()) + 1}`).buy}, you have ${data.get("money")})`);
                    }
                } else if(!honey.get(`${parseInt(data.get("upgrades.honey").value()) + 1}`)) {
                    msg.channel.send("You already have the highest level for honey! We are always adding new upgrades so check back soon.");
                }
            }
          
          else {
                msg.channel.send("Oops! I couldn't find that upgrade. The upgrade command follows the following format: `bee upgrade <shop, bee, hives, or honey>`");
            }
        }
    }
};