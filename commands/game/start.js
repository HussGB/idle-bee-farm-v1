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
            name: 'start',
            aliases: ['restart'],
            memberName: 'start',
            description: 'Start or restart a bee farm.',
            group: 'game',
        });
    }

    /**
     *
     * @param {Discord.Message} msg
     */
    run(msg) {
        if (beforerun(msg, false) == true) {
            if (fs.existsSync(path.join(__dirname, '..', '..', 'db', 'users', `${msg.author.id}.json`))) {
                var replied = false;
                msg.channel.send('Looks like you already have started a bee farm, reply `yes` to have your information deleted.');
                client.on('message', (mesg) => {
                    if (replied == false) {
                        if (mesg.content.toLowerCase() == 'yes' && mesg.channel.id == msg.channel.id && mesg.author.id == msg.author.id) {
                            fs.unlinkSync(path.join(__dirname, '..', '..', 'db', 'users', `${mesg.author.id}.json`));
                            mesg.channel.send("Re-running command");
                            replied = true;
                            this.start(mesg);
                            return true;
                        }
                    }
                });
            } else {
                this.start(msg);
            }
        }
    }

    async start(msg) {
        var status = `Status:\nCreated data file.\n`;
        var embed = await new Discord.RichEmbed()
            .setTitle("Idle Bee Farm")
            .setDescription(status)
            .setColor(embedc);
        var message = await msg.channel.send(embed);
        var datafile = low(new fisy(path.join(__dirname, '..', '..', 'db', 'users', `${msg.author.id}.json`)));
        datafile.defaults({
            bees: 2,
            hives: 1,
            unhoney: 1,
            honey: 0,
            money: 10,
            rates: {
                onupdate: 1
            },
            upgrades: {
                shop: 1,
                hives: 1,
                bee: 1,
                honey: 1
            },
            cooldowns: {
                collect: 0
            }
        }).write();
        status += `Loaded data file into memory\nWrote defaults to data file\n`;
        await message.edit(await embed.setDescription(status));
        status += `Running post-start scripts...\n`;
        await message.edit(await embed.setDescription(status));
        await message.edit(await embed.setDescription(`${msg.author} started a bee farm!\n\nYou currently have:\n - 2 ${emojis.bee}\n - 1 hives\n - 1 total ${emojis.honeyjar}\n - 10 ${emojis.money}\n\nPlease check out \`bee guide poststart\` to see what you can do next!`));
    }
};