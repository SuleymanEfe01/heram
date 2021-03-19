const Discord = require ("discord.js");

exports.run = (client, message) => {
const lembed = new Discord.MessageEmbed()

.then;   
const mhelp = new Discord.MessageEmbed()
.setColor("#140589")
.setAuthor(`${client.user.username} `, client.user.avatarURL)  
.setTitle(":hammer:   Hera  | Koruma Menüsü   :hammer:")
.setThumbnail("https://cdn.discordapp.com/emojis/727894683061321759.gif?v=1")
    .setDescription(`


╔════════════════════════════╗
║
║**»** **!kanal-koruma** : Kanalları Korur
║**»** **!küfürengel** : Küfre İzin Vermez
║**»** **!reklamengel** : Reklama izin Vermez
║**»** **!ever-here-engel** : Everi Engeller
║
║**»** \`\`\!davet\`\`\ **__Botun Davet Linkini Görürsünüz.__**
║
╚════════════════════════════╝
`) 
       .addField(`» Hera Bot Bağlantıları`, ` [Bot Davet Linki](https://discord.com/api/oauth2/authorize?client_id=803925896259043348&permissions=8&scope=bot) **|** [Destek Sunucusu](https://discord.gg/dKj85m3Pcv) **|** [WebSitesi](http://virtualbot.xyz/) `)
       .setImage("https://cdn.discordapp.com/attachments/789813402536509452/808819177862594560/standard_1.gif")
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
message.channel.send(mhelp)
.then; const sembed = new Discord.MessageEmbed()

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["koru"], 
    permLevel: 0 
  };
 
  exports.help = {
    name: 'koruma', 
    description: '',
    usage: ''
  };