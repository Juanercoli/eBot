const BaseCommand = require('../../utils/structures/BaseCommand.js');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
 

module.exports = class MemeCommand extends BaseCommand {
  constructor() {
    super('meme', 'fun', []);
  }

  async run(client, message, args) {
	const subReddits = ["dankmemes", "me_irl", "meme", "MemeEconomy", "deepfriedmemes", "funny"];
	const trollResponses = ['I don\'t want to send you any memes, sorry :P.',
	 'I\'m not going to send you anything...', 'Stop wasting your time and start studying', 
	 'NOPE.avi', 'Stop wasting your time.', 'Uhmm nope.']
    
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

	let img = await randomPuppy(random);

	if(img.split(".").includes('mp4')) {
		return message.channel.send(trollResponses[Math.floor(Math.random() * trollResponses.length)]);
	}

    const embed = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setFooter("xd xd xd xd xd xd xd xd xd xd xd xd xd xd xd")
    .setImage(img)
    .setTitle(`A Random Meme from r/${random}`)
    .setURL(`https://reddit.com/r/${random}`)
    return message.channel.send(embed);
    


  }
}

