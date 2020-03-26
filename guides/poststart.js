let upgrades = require('../data/upgrades/shop');

let highupg = upgrades.get(`${upgrades.size}`).amount;
let lowupg = upgrades.get("1").amount;

module.exports = {
    name: "Post-start Guide",
    listdesc: `A guide on what to do after starting your bee farm`,
    description: `Follow this guide if you are not sure what to do after starting your bee farm journey.`,
    fields: [
        ['What to do.', `Firstly, you will have one uncollected honey pot. Run \`bee collect\` to turn it into sellable honey. Then you can use \`bee sell\` to sell your honey and get money from it.`],
        ['Upgrading, selling, and buying', `Depending on what upgrades you have, your honey will sell for different prices. Use \`bee upgrades\` to see what upgrades you can use. There is 3 different types of upgrades: Shop, Honey, Bee. The shop upgrades make honey sell for more, the honey upgrades make honey sell for more aswell, the bee upgrades makes your bees produce more honey every 4 minutes.`]
    ]
};