const Discord = require ("discord.js");

exports.run = (client, message) => {
const lembed = new Discord.MessageEmbed()

.then;   
const mhelp = new Discord.MessageEmbed()
.setColor("#140589")
.setAuthor(`${client.user.username} `, client.user.avatarURL)  
.setTitle(":hammer:   Hera  | Kullanıcı Menüsü  :hammer: ")
.setThumbnail("https://cdn.discordapp.com/emojis/727894683061321759.gif?v=1")
    .setDescription(`


╔════════════════════════════╗
║
║**»** **!avatar** : Profil Fotoğrafını Gösterir
║**»** **!v11-v12** : v11 to v12 komutlarını gösterir
║**»** **!steamfiyat** : Belirttiğiniz oyunun fiyatını gösterir
║**»** **!emojiyazı** : Emoji Yazı Yazar
║**»** **!banneryazı** : Banner Yazı Yazar
║**»** **!saat** : Saati Gösterir
║**»** **!emojiyazı** : Emoji Yazı Yazar
║**»** **!google-ara** : Google de arama yapar
║**»** **!youtube-ara** : YouTube da arama yapar
║**»** **!rastgeleşifre** : Bot size rastgele şifre oluşturur
║**»** **!havadurumu** : Belirttiğiniz Lokasyonun Havadurumunu Gösterir
║**»** **!davet** : Botun Davet Linkini Görürsünüz
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
    aliases: ["user"], 
    permLevel: 0 
  };
 
  exports.help = {
    name: 'kullanıcı', 
    description: '',
    usage: ''
  };