const Discord = require('discord.js');

exports.run = (client, message, args) => {
 const embed = new Discord.MessageEmbed()
 .setAuthor(`${client.user.username} Yardım Menüsü`,client.user.avatarURL())
 .setThumbnail(message.author.avatarURL())
 .setColor('RANDOM')
 .setDescription(`
 > \`!mod -> Moderasyon Komutlarını Gösterir.\`

 > \`!eğlence -> Eğlence Komutlarını Gösterir.\`
 
 > \`!logosistemi -> Logo Oluşturma Komutlarını Gösterir.\`

 > \`!kullanıcı -> Kullanıcı Komutlarını Gösterir.\`
 
 > \`!botlist -> Botlist Komutlarını Gösterir.\`
 
 > \`!davet -> Botun Davetini ve Destek Sunucunu Gösterir.\``)
 .setFooter(`Hera Bot`)
    .setTimestamp()
    .setImage("https://cdn.discordapp.com/attachments/789813402536509452/808819177862594560/standard_1.gif")
message.channel.send(embed) 
//ahmetosmantr#1453
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["y", "help"],
  permLevel: 0
};

exports.help = {
  name: 'yardım',   //ahmetosmantr#1453
  description: '',
  usage: ''
};