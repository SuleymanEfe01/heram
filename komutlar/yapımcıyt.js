const Discord = require('discord.js');

exports.run = (client, message) => {
  
  const davet = new Discord.MessageEmbed()
  .setColor('RED')
  .setThumbnail('https://cdn.discordapp.com/attachments/794143536923672576/819313302370385990/youtube.png')
  .setDescription(`**Beni Kodlayan Güzel Kalpli İnsanın Kanalına Abone Olabilirsin**
  
[Abone Ol](https://www.youtube.com/channel/UCbpMm1h3yRthCxHHHoR3Evg) 

[Discord Sunucusuna Katıl](https://discord.gg/BWaGrQFGyF) 
`)
  message.channel.send(davet)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "youtube"
}