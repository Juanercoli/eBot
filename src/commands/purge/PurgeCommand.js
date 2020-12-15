const BaseCommand = require('../../utils/structures/BaseCommand.js');
const Discord = require('discord.js');


module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'moderation', []);
  }

  async run(client, message, args) {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send('You can\'t use this command.');
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send('I don\'t have \'MANAGE_MESSAGES\' permission.');
    }

    if (!args[0]) {
      return message.channel.send('You must pass a parameter with the number of messages to purge. \'-purge number\'');
    }

    const amountToDelete = Number(args[0], 10);

    if (isNaN(amountToDelete)) {
      return message.channel.send('Argument must be a valid number.')
    }

    if (!Number.isInteger(amountToDelete)) {
      return message.channel.send('Argument must be a whole number.')
    }

    if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) {
      return message.channel.send('Argument must have a value between 2 and 100.');
    }

    const fetched = await message.channel.messages.fetch({
      limit: amountToDelete
    });

    try {
      await message.channel.bulkDelete(fetched)
      .then(messages => message.channel.send(`Purged ${messages.size} messages!`));
    } catch (error) {
      console.log(error);
      message.channel.send('I was unable to delete the amount stated (make sure they are within 14 days old).')
    }

  }
}
