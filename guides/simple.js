let upgrades = require('../data/upgrades/shop');

let highupg = upgrades.get(`${upgrades.size}`).amount;
let lowupg = upgrades.get("1").amount;

module.exports = {
    name: "Simple Guide",
    listdesc: `A simple guide on the basic commands.`,
    description: `Looks like you are new to Idle Bee Farm!
Heres a simple guide on how it works.`,
    fields: [
        ['How it works.', `Idle Bee Farm has a few different "currencies": ${emojis.honeyjar} (Honey), ${emojis.bee} (Bees), and ${emojis.money} (Money). These are a crucial part of the bot since its how you upgrade your bee farm, get more bees, upgrade your shop, etc.`],
        ['How to get/use the three types of currency', `Its quite simple to understand. Basically: Bees create honey, you can sell honey in your shop, and you can use that money to buy a new queen bee and other upgrades.\nBees will automatically create honey in the background at a rate of 1 honey every 4 minutes per hive as long as you are online. (This is not real, it would usually be 4 months). Honey can sell for any amount depending on your upgrades. Currently the highest amount honey can sell for is ${highupg} ${emojis.money} per honey and the lowest is ${lowupg} ${emojis.money} per honey`],
        ['The commands', `Command list moved to \`bee commands\``]
    ]
};