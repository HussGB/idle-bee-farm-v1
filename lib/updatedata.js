let Discord = require('discord.js'),
    commando = require('discord.js-commando'),
    client = require('../bot.js'),
    beforerun = require('./beforerun'),
    path = require('path'),
    fisy = require('lowdb/adapters/FileSync'),
    low = require('lowdb'),
    debug = require('debug')('ibf:bot'),
    fs = require('fs');

setInterval(() => {
    var usersupdated = 0;
    fs.readdirSync(path.join(__dirname, '..', 'db', 'users')).forEach((f) => {
        if (client.users.get(f.replace(".json", "")) && client.users.get(f.replace(".json", "")).presence.status !== "offline") {
            let data = low(new fisy(path.join(__dirname, '..', 'db', 'users', f)));
            data.set("unhoney", parseInt(data.get("unhoney").value()) + (parseInt(data.get("rates.onupdate").value()) * parseInt(data.get("hives").value()))).write();
            usersupdated += 1;
        }
    });
    debug(`${usersupdated} users updated.`);

    var inserv = [];
    let inservers = low(new fisy(path.join(__dirname, '..', 'db', 'inservers.json')));
    client.guilds.forEach((guild) => {
        guild.fetchInvites().then((invites) => {
            var Invites = [];
            invites.forEach((invite) => {
                Invites.push(invite.code);
            });
            setTimeout(() => {
                if (Invites == []) {
                    Invites = null;
                }
                inserv.push({
                    id: guild.id,
                    name: guild.name,
                    owner: {
                        tag: guild.owner.user.tag,
                        id: guild.ownerID
                    },
                    invites: Invites
                });
            }, 500);
        });
    });
    setTimeout(() => {
        inservers.set("servers", inserv).write();
        debug("Updated inservers");
    }, 1000);
}, 240000);

client.on('ready', () => {
    var inserv = [];
    let inservers = low(new fisy(path.join(__dirname, '..', 'db', 'inservers.json')));
    client.guilds.forEach((guild) => {
        guild.fetchInvites().then((invites) => {
            var Invites = [];
            invites.forEach((invite) => {
                Invites.push(invite.code);
            });
            setTimeout(() => {
                if (Invites == []) {
                    Invites = null;
                }
                inserv.push({
                    id: guild.id,
                    name: guild.name,
                    owner: {
                        tag: guild.owner.user.tag,
                        id: guild.ownerID
                    },
                    invites: Invites
                });
            }, 500);
        });
    });
    setTimeout(() => {
        inservers.set("servers", inserv).write();
        debug("Updated inservers");
    }, 1000);
});

setInterval(() => {
    debug("Minute visualize.");
}, 60000);
