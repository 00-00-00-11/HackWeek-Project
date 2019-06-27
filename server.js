/*
  __  __  ____  _____  ______ _____         _______ _____ ____  _   _         ____   ____ _______ 
 |  \/  |/ __ \|  __ \|  ____|  __ \     /\|__   __|_   _/ __ \| \ | |       |  _ \ / __ \__   __|
 | \  / | |  | | |  | | |__  | |__) |   /  \  | |    | || |  | |  \| |       | |_) | |  | | | |   
 | |\/| | |  | | |  | |  __| |  _  /   / /\ \ | |    | || |  | | . ` |       |  _ <| |  | | | |   
 | |  | | |__| | |__| | |____| | \ \  / ____ \| |   _| || |__| | |\  |       | |_) | |__| | | |   
 |_|  |_|\____/|_____/|______|_|  \_\/_/    \_\_|  |_____\____/|_| \_|       |____/ \____/  |_|   
                                                                                                  
                                                                                            
                                                                                            
*/


const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
const fs = require("fs");
const request = require("request");
const app = express();
const http = require("http");
const db = require("quick.db");
const { Client, Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const youtube = new YouTube(process.env.GOOGLE_API_KEY);

const queue = new Map();
require("./util/eventLoader.js")(client);

app.listen(process.env.PORT);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 5000);

client.settings = {
  token: process.env.TOKEN,
  owner: [process.env.OWNER_1, process.env.OWNER_2, process.env.OWNER_3, process.env.OWNER_4, process.env.OWNER_5],
  prefix: "?"
}

client.on("ready", () => {
  client.user.setActivity(`${client.guilds.size} guilds`, {type: 'WATCHING'});
  console.log(client.user.tag + " | ready!")
})

let prefix = client.settings.prefix
let PREFIX= client.settings.prefix


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection()
fs.readdir("./cmds/", (err, files) => {
  
  if(err) console.log(err);
  files.forEach(f => {
    
    let props = require(`./cmds/${f}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      
      client.aliases.set(alias, props.help.name);
      
    });
    
  });
  
});

client.on('message', async message => {
  
  if(message.content === "baris") {
    message.delete()
    message.channel.send("i'm on baris's side")
  }
  
  let kullanıcı = message.mentions.users.first() || message.author
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
  let sebep = afkkullanıcı
 
  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;
  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` is no longer AFK.`)
      db.delete(`afk_${message.author.id}`)
    }
    var embed = new Discord.RichEmbed()
    .setColor(client.color)
    .setDescription(`\`${kullanıcı.tag}\` is now AFK.`)
    .addField("Reason:", "```" + sebep + "```")
    if (afkkullanıcı) return message.channel.send(embed)
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      message.channel.send(`\`${message.author.tag}\` is no longer AFK.`)
      db.delete(`afk_${message.author.id}`)
    }
  }
});

client.on('message', async msg => { //hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('You need to be in a voice channel to play music.');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send("I can't connect this channel, I need `CONNECT` permission.");
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send("I can't speak in this channel, I need `SPEAK` premission.");
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id);
				await handleVideo(video2, msg, voiceChannel, true);
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`I set the volume to: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Resumed the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}


///////////////






function checkWords(msg) {
  request(
    "https://inappropriate-api.neotidev.com/words.json",
    (err, res, body) => {
      const json = JSON.parse(body);
      const contains =
        json.filter(word => {
          const wordExp = new RegExp(
            `\\b${word.replace(/(\W)/g, "\\$1")}\\b`,
            "gi"
          );
          return (wordExp.test(msg.content));
        }).length > 0 || false;
      if (contains) {
        var userID = msg.author.id;

            db.add(`swearCount_${userID}`, 1);
            db.add(`serverSwear_${userID}_${msg.guild.id}`, 1);

        msg.delete();
        request("https://insult.mattbas.org/api/insult", (err, res, body) => {
        msg.reply("||" + body + "||");
        });
        return
      } 
    }
  );
}
client.on("message", message => {
  if(message.author.bot) return;
  checkWords(message);
});



client.elevation = message => {
  if(!message.guild) return; 
  let permlvl = 0;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 4;
  if(message.author.id === client.settings.owner) permlvl = 5;
  return permlvl;
};




client.login(client.settings.token);