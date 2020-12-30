const BaseCommand = require('../../../utils/structures/BaseCommand.js');
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
      .setDescription(
        constants.GREEN_CIRCLE + ' ' + constants.DESCRIPTION_1 + 
        constants.BLUE_CIRCLE + ' ' + constants.DESCRIPTION_2)
      .addFields(
        { name: '\u200B' , value: '\u200B' },
        { name: `${constants.RED_CIRCLE}\`AVAILABLE COMMANDS\`${constants.RED_CIRCLE}`, value: '\u200B' },
        { name: `${constants.WHITE_CIRCLE} \`help: it makes me send help to you. [helping command]\`` , value: '\u200B' },
        { name: `${constants.WHITE_CIRCLE} \`purge <N>: it makes me purge N messages. [moderation command]\`` , value: '\u200B' },
        { name: `${constants.WHITE_CIRCLE} \`assignChanel <ID>: it makes me get assigned a bot channel. [moderation command]\`` , value: '\u200B' },
        { name: `${constants.WHITE_CIRCLE} \`meme: it makes me send you a meme :). [fun command]\`` , value: '\u200B' }
      )
      .setFooter(constants.FOOTER, `attachment://${constants.INFORMATION_LOGO}`);
    message.channel.send(embed);
  }
}
