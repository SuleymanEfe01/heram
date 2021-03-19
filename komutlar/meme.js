const Discord = require('discord.js')
const randomPuppy = require('random-puppy')
exports.run = async(client, message, args) => {
        const subReddits = ["burdurland", "Turkey", "me_irl", "memes", "MemeEconomy", "Memes_Of_The_Dank", "dankchristianmemes", "MinecraftMemes", "okbuddyretard"]; //buraya istediğiniz reddit sayfasının ismini yazın
const random = subReddits[Math.floor(Math.random() * subReddits.length)];

const img = await randomPuppy(random);

const embed = new Discord.MessageEmbed()

.setTitle(`From /r/${random}`, client.user.avatarURL({ dynamic: true}))
.setColor("#fffa65")
.setImage(img)
.setURL("https://reddit.com/r/${random`}")
.setFooter(`Hera - Meme `, client.user.avatarURL({ dynamic: true}))

message.channel.send(embed);
//fiber abm her daim
}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["meme"],
permLevel: 0,
};
exports.help = {
name: 'miim',
description: 'sj'
};