const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const constants = require('./helpCommandConstants');


module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'helping', []);
  }

  async run(client, message, args) {
    const embed = new MessageEmbed()
      .setColor(constants.COLOR)
      .attachFiles(constants.INFORMATION_LOGO_PATH)
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
      .setTitle(constants.TITLE)
      .setDescription(constants.GREEN_CIRCLE + ' ' + constants.DESCRIPTION_1 + 
      constants.BLUE_CIRCLE + ' ' + constants.DESCRIPTION_2)
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: `${constants.SEPARATOR}`, value: `${constants.SEPARATOR}` },
        { name: '\u200B', value: '\u200B' },
        { name: `${constants.YELLOW_CIRCLE}\`AVAILABLE COMMANDS\`${constants.YELLOW_CIRCLE}`, value: '\u200B' },
        { name: `${constants.WHITE_CIRCLE} \`help\` ${constants.WHITE_CIRCLE}` , value: '\`It makes me give information about all of my commands.\`' },
        { name: '\u200B', value: '\u200B' },
        { name: `${constants.SEPARATOR}`, value: `${constants.SEPARATOR}` },
        { name: '\u200B', value: '\u200B' }
      )
      .setFooter(constants.FOOTER, `attachment://${constants.INFORMATION_LOGO}`);
    message.channel.send(embed);
  }
}
