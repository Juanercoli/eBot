const BaseCommand = require('../../utils/structures/BaseCommand.js');
const botChannel = require('../../../botChannel.json');
const fs = require('fs');

const BOT_CHANNEL_PATH = './botChannel.json';

module.exports = class AssignChannelCommand extends BaseCommand {
  constructor() {
    super('assignChannel', 'moderation', []);
  }

  async run(client, message, args) {
    
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send('You can\'t use this command.');
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send('I don\'t have \'MANAGE_MESSAGES\' permission.');
    }

    if (!args[0]) {
      return message.channel.send('You must pass a parameter with the id of the channel. \'-assignChannel iDNumber\'');
    }

    const id = args[0];
    let array = getChannelIDs(client, message);

    let channel = array.find(element => {
        return element.id === id;
    });

    if (channel) {
      updateChannel(id);
      return message.channel.send(`My new assigned channel is ${channel.name}`);
    } else {
      return message.channel.send('Argument must be a valid id.');
    }

  }
}

function updateChannel(id) {

  botChannel.botChannel = id;
  
  fs.writeFile(BOT_CHANNEL_PATH, JSON.stringify(botChannel, null, 2), error => {
    if (error) {
      return console.error(error);
    } 
  });
}

function getChannelIDs(client, message) {
  let array = [];
  try {
    let channels = client.channels.cache.array();
    for (const channel of channels) {
    array.push(channel);
    } 
  } catch(err){
      message.channel.send('An error occoured while getting the channels.')
      console.log(err)
    }
  return array;
}