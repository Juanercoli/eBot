const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');


module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'helping', []);
  }

  async run(client, message, args) {
    const embed = new MessageEmbed()
      .setTitle('A slick little embed')
      .setColor(0xFF0000)
      .setDescription(':red_circle: Hello, this is a slick embed!');
    message.channel.send(embed);
  }
}
