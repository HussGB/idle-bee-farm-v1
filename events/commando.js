let Discord = require('discord.js'),
  commando = require('discord.js-commando'),
  debug = require('debug')('ibf:bot'),
  client = require('../bot.js');

client
  .on('error', debug)
  .on('warn', debug)
  .on('debug', debug)
  .on('ready', () => {
    debug(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
  })
  .on('disconnect', () => {
    debug('Disconnected!');
  })
  .on('reconnecting', () => {
    debug('Reconnecting...');
  })
  .on('commandError', (cmd, err) => {
    if (err instanceof commando.FriendlyError) return;
    debug(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  })
  .on('unknownCommand', (msg) => {
    msg.channel.send('Sorry, that command doesn\'t exist! Use `bee guide` to get a guide on using Idle Bee Factory')
  });