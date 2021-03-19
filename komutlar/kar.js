const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  
  let user = message.mentions.users.first() || message.author;
  
  let ek = new Discord.MessageAttachment(`https://api.no-api-key.com/api/v2/snow?image=${user.avatarURL({size: 1024, format: 'png'})}`, `snow.png`)
  
  let embed = new Discord.MessageEmbed()
  .setTitle(`İşte kar efekti uygulanmış avatar!`)
  .setColor("RANDOM")
  .attachFiles(ek)
  .setImage(`attachment://snow.png`)
  .setFooter(`${message.author.tag} tarafından istendi`, message.author.avatarURL({dynamic:true}))
  .setTimestamp();
  
  message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "kar",
  description: "",
  usage: ""
};