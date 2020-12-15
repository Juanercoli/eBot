const BaseEvent = require('../../utils/structures/BaseEvent.js');
const botVersion = require('../../../botVersion.json');
const botChannel = require('../../../botChannel.json');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');

const BOT_VERSION_PATH = './botVersion.json';

module.exports = class ReadyEvent extends BaseEvent {

  constructor() {
    super('ready');
  }

  async run (client) {
    console.log(`${client.user.tag} has logged in at ${client.readyAt}.\n`);

    if (isBotUpdated()) {
      console.log(`${botVersion.stageDevelopment} v${botVersion.actualVersion}\n`);
    } else {
      updateBot();
      
      let log = getChangelog();

      const embed = new MessageEmbed()
        .setColor(0xFF0000)
        .attachFiles('./res/img/informationLogo.png')
        .setThumbnail('attachment://informationLogo.png')
        .setTitle(`What's new on ${botVersion.stageDevelopment} ${botVersion.actualVersion}?`)
        .setDescription(log);
      
      client.channels.cache.get(botChannel.botChannel).send(embed);
    }  

    client.user.setPresence({
       activity: { name: `${botVersion.stageDevelopment} v${botVersion.actualVersion}` },
       status: 'PLAYING' })
  .catch(console.error);

  }
}
 
function isBotUpdated() {
  if (botVersion.actualVersion === botVersion.lastVersion) {
    return true;
  } else {
    return false;
  }
    
}

function updateBot() {

  console.log(`Updating to ${botVersion.lastVersion}`);
  botVersion.actualVersion = botVersion.lastVersion;

  fs.writeFile(BOT_VERSION_PATH, JSON.stringify(botVersion, null, 2), error => {
    if (error) {
      return console.error(error);
    } 
  });
}

function getChangelog() {
  return fs.readFileSync(`./changelogs/${botVersion.actualVersion}.txt`, 'utf8', (error, log) => {
    if (error) {
      return console.error(error);
    }

    return console.log(`Changelog:\n${log}`);
  });
}