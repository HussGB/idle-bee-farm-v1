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
			name: "sell",
      aliases: ["s"],
			memberName: "sell",
			description: "Sells honey in your shop.",
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
			if (parseInt(data.get("honey").value()) > 0) {
				var sell = parseInt(data.get("honey").value()) * upgrades.get(`${data.get("upgrades.shop").value()}`).amount;
				msg.channel.send(
					new Discord.RichEmbed()
					.setAuthor("Idle Bee Farm > Sell Honey", msg.author.avatarURL)
					.setColor(embedc)
          .setThumbnail("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fshopping-bag.png?v=1578778330404")
          .setDescription("https://cdn.glitch.com/0245388a-ce03-4a23-bbbc-cc19533d6f63%2Fshop.png?v=1578777620901")
					.setDescription(`Your ${data.get("honey").value()} ${emojis.honeyjar} sold for ${sell} ${emojis.money}. You now have ${parseInt(data.get("money").value()) + sell} ${emojis.money}`)
				);
				data.set("money", parseInt(data.get("money").value()) + sell).write();
				data.set("honey", 0).write();
			} else {
				msg.channel.send("Oops! You have 0 honey. You need at least 1 honey to sell. Use `bee collect` to collect your honey so you can sell it.");
			}
		}
	}
};