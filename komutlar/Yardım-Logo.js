const Discord = require ("discord.js");

exports.run = (client, message) => {
const lembed = new Discord.MessageEmbed()

.then;   
const mhelp = new Discord.MessageEmbed()
.setColor("#140589")
.setAuthor(`${client.user.username} `, client.user.avatarURL)  
.setTitle(":pushpin:     Hera  | Logo Menüsü   :pushpin: ")
.setThumbnail("https://cdn.discordapp.com/emojis/727894683061321759.gif?v=1")
    .setDescription(`


╔════════════════════════════╗
║
║**»** **!arrow-logo** : Ok Şeklinde Logo Atar
║**»** **!blue-logo** : Mavi Bir Logo Atar
║**»** **!booking-logo** : Kırmızı Bir Logo Atar
║**»** **!bubble-logo** : Mavi 3D Logo Atar
║**»** **!bubble2-logo** : Turuncu 3D Logo Atar
║**»** **!bubble3-logo** : Mavi Beyaz 3D logo Atar
║**»** **!comic-logo** : Sohbet Balonunda Logo Atar
║**»** **!cool-logo** : Havalı Bir Logo Atar
║**»** **!discord-logo** : Discord Logo Atar
║**»** **!fire-logo** : Ateşli Logo Atar **(FAVORİ)**
║**»** **!gold-logo** : Altın Renginde 3D Logo Atar
║**»** **!gold2-logo** : Altın Renginde Logo Atar
║**»** **!green-logo** : Yeşil Logo Atar **(FAVORİ)**
║**»** **!müzik-logo** : Müzik Logo Atar **(FAVORİ)**
║**»** **!skull-logo** : Kafatası Logo Atar
║**»** **!kalp-logo** : Kalp Logo Atar
║
╚════════════════════════════╝
`) 
       .addField(`» Hera Bot Bağlantıları`, ` [Bot Davet Linki](https://discord.com/api/oauth2/authorize?client_id=803925896259043348&permissions=8&scope=bot) **|** [Destek Sunucusu](https://discord.gg/dKj85m3Pcv) **|** [WebSitesi](http://herabots.xyz/) `)
       .setImage("https://cdn.discordapp.com/attachments/789813402536509452/808819177862594560/standard_1.gif")
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
message.channel.send(mhelp)
.then; const sembed = new Discord.MessageEmbed()

}; 
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["logosistemi"], 
    permLevel: 0 
  };
 
  exports.help = {
    name: 'logo', 
    description: '',
    usage: ''
  };