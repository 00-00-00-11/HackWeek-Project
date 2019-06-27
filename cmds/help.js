const Discord = require('discord.js');

const db = require('quick.db');
const lang = require('../langs.json');

exports.run = (client, message, args) => {
  
  //Baris and Moon_Buster
  let user = message.author;
  var prefix = client.settings.prefix;
  var command = args.slice(0).join(" ")
  
  const selectedLang = db.get(`lang_${user.id}`);
  if (!selectedLang) db.set(`lang_${message.author.id}`, "EN")
  
  if (!command) {
		const help = {}
		client.commands.forEach((command) => {
			const cat = command.conf.cat;
			if (!help.hasOwnProperty(cat)) help[cat] = [];
			help[cat].push("`" + command.help.name + "`");
		})
		var str = ''
		for (const cat in help) {
			str += `**${cat.charAt(0).toUpperCase() + cat.slice(1)}** \n ${help[cat].join(" | ")}\n\n`
		}

		const embed = new Discord.RichEmbed()
			.setAuthor(`${client.user.username} Commands`)
			.setDescription([[`${(lang[selectedLang].help.description1).replace("%help%", `${prefix}help`)}`],  [`${(lang[selectedLang].help.description2).replace("%example%", `\`${prefix}help lenny\``)}`], [` `], [str]])
		message.channel.send(embed)
		return
  }
	if (client.commands.has(command)) {
		command = client.commands.get(command)
		const embed = new Discord.RichEmbed()
			.addField('Command Name:', command.help.name)
			.addField('Command Description:', command.help.description)
			.addField('Usage:', prefix + command.help.usage)
			.addField('Aliases:', command.conf.aliases[0] ? command.conf.aliases.join(', ') : 'Not found')
		message.channel.send(embed)
	}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h"],
  permLevel: 0,
  cat: "Misc"
}

exports.help = {
  name: "help",
  description: "Displays some informations about the Commands",
  usage: "help | help <command>"
}