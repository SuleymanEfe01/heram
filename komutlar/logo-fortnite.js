	const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let isim = args.slice(0).join("+")
  if(!isim)return message.channel.send("**Lütfen Bişey Yaz**")
let link = "https://fortnitefontgenerator.com/img.php?textcolor=FFFFFF&text="+isim+"&fontsize=125px"
  const embed = new Discord.MessageEmbed()
  .setColor(0xF001FA)
  .setImage(link)
  message.channel.send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["fortnite"],
  permLevel: 0
};
exports.help = {
  name: 'fortnite-logo',
  description: 'Logo Yaparsınız',
  usage: 'm-logo <yazı>'
};