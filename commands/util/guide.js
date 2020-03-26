let Discord = require("discord.js"),
    commando = require("discord.js-commando"),
    client = require("../../bot.js"),
    beforerun = require("../../lib/beforerun"),
    fs = require("fs"),
    path = require("path");

module.exports = class extends commando.Command {
    constructor(client) {
        super(client, {
            name: "guide",
            aliases: ["help"],
            memberName: "guide",
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
            var embed = new Discord.RichEmbed().setColor(embedc);
            if(msg.content.toLowerCase().startsWith("bee start")) {
                var type = msg.content.split("bee start ")[1];
            } else if(msg.content.toLowerCase().startsWith("bee guide")) {
                var type = msg.content.split("bee guide ")[1];
            }
            if (
                fs.existsSync(path.join(__dirname, "../..", "guides", `${type}.js`))
            ) {
                var guide = require(`../../guides/${type}`);
                embed
                    .setTitle(`Idle Bee Farm > Guides > ${guide.name}`)
                    .setDescription(guide.description);
                if (guide.fields) {
                    guide.fields.forEach(field => {
                        embed.addField(field[0], field[1]);
                    });
                }
            } else {
                embed
                    .setTitle("Idle Bee Farm > Guides");
                var guides = "";
                fs.readdirSync(path.join(__dirname, '../..', 'guides')).forEach((g) => {
                    var gu = require(path.join(__dirname, '../..', 'guides', g));
                    if(gu && gu.name) {
                        guides += ` - \`${g.replace(".js", "")}\`: ${gu.listdesc}\n`;
                    }
                });
                embed.setDescription("Here for a list of commands? Do `bee commands`")
                    .addField("Guide list", guides);
            }
            msg.channel.send(embed);
        }
    }
};