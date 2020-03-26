let Discord = require("discord.js"),
    commando = require("discord.js-commando"),
    client = require("../../bot.js"),
    beforerun = require("../../lib/beforerun"),
    fs = require("fs"),
    path = require("path");

module.exports = class extends commando.Command {
    constructor(client) {
        super(client, {
            name: "commands",
            aliases: ["cmds"],
            memberName: "commands",
            description: "Sends an embed telling you how to use the bot. Use `bee guide extended` to get a full list including every command.",
            group: "util"
        });
    }

    /**
     *
     * @param {Discord.Message} msg
     */
    run(msg) {
        if (beforerun(msg, false) == true) {
            var embed = new Discord.RichEmbed().setAuthor("Idle Bee Farm > Commands", msg.author.avatarURL).setColor(embedc);
            var commands = "`guide`, `donate`, `commands`, `invite`, `upvote`, `ping`, `ascii`";
            client.registry.groups.get("game").commands.forEach((command) => {
                commands += `, \`${command.memberName}\``;
            });
            embed.setDescription(commands);
            msg.channel.send(embed);
        }
    }
};