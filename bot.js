const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require('fs');
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader.js")(client);
const request = require("request");
const queue = new Map();
const app = express();
const { GiveawaysManager } = require("discord-giveaways");


//------------------Loga Mesaj Atma------------------\\

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Tamamdır.");
  response.sendStatus(200);
});

//------------------Loga Mesaj Atma------------------\\



var prefix = ayarlar.prefix;
const log = message => {
  console.log(`${message}`);
};

//----------------Komut Algılayıcısı----------------\\

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  
  //----------------Komut Algılayıcısı----------------\\
  
  
  //---------------Perms Yerleştirmeleri--------------\\
  
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if ((message.author.id === ayarlar.sahip)) permlvl = 4;
  return permlvl;
};

//---------------Perms Yerleştirmeleri--------------\\

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

require("moment-duration-format");
client.on('ready', () => {
  setInterval(function() {
let pink = client.channels.cache.get("820307829768060938")
  const çalışmasüresi = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  
     if(pink){
        const sürelistat = new Discord.MessageEmbed()
  .setColor("#66ff00")
  .setFooter('Hera Bot ', client.user.avatarURL())
  .addField("**İstatistik Kodu**", "Güncel İstatistikler")
  .addField("**Bellek kullanımı**", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)  
  .addField("**Çalışma süresi**", çalışmasüresi)
  .addField("**Kullanıcılar**" , client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
  .addField("**Sunucular**", client.guilds.cache.size.toLocaleString(), true)
  .addField("**Kanallar**", client.channels.cache.size.toLocaleString(), true)
  .addField("**Discord.JS sürüm**", "v"+Discord.version, true)
  .addField("**Ping**", client.ws.ping+" ms", true)
return pink.send(sürelistat)
     }
    }, 300000)
})


////DATABASE
const qdb = require('quick.db');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const sunucuadapter = new FileSync('./database/systems.json')

const sdb = low(sunucuadapter)

  sdb.defaults({mute: [], ban: [], kufurEngel: [], autorole: [], reklamEngel: [], security: [], counter: []})
  .write()

  sdb.read()
  
////////DATABASE-UPDATER
/*
client.on("message", async msg => {
  if(!msg.guild) return;
  
  db.add(`mesajsayi_${msg.author.id}`, 1);
});
*/
setInterval(function(){  
  sdb.read()
 },1000);


 client.on('ready', async () => {
  client.guilds.cache.forEach(async guild => {
  guild.members.cache.forEach(async member => {
  
    sdb.read()
    var muteverisi = sdb.get('mute').find({guild: guild.id, user: member.id}).value()
  
    if(muteverisi) {
      var mutebitiszamani = muteverisi.finishtime
      var mutekanali = muteverisi.channel
    } else {
      var mutebitiszamani = null;
      var mutekanali = null;
    }
  const ainterval = setInterval(async function(){
    sdb.read()
  if(mutebitiszamani && mutebitiszamani !== null && mutebitiszamani !== "INFINITY") {
    if(mutebitiszamani <= Date.now()) {
      clearInterval(ainterval)
      var muterole1 = qdb.fetch(`muteroluid_${guild.id}`);
      var muterole2 = guild.roles.cache.find(r => r.id === muterole1);
      if(member.roles.cache.has(muterole2.id)) await member.roles.remove(muterole2.id);
      var mutekanali2 = guild.channels.cache.find(c => c.id === mutekanali);
      if(mutekanali2) mutekanali2.send(`${member} Susturulması Açıldı!`)
      sdb.get('mute').remove(sdb.get('mute').find({guild: guild.id, user: member.id}).value()).write()   
    }
  }
  }, 6000)
      })
    })
  });

//Main Dosyasına Atın!
client.on("messageDelete", async message => {
  let mslog = await db.fetch(`mslog_${message.guild.id}`);
  if (!mslog) return;
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first());
  let embed = new Discord.MessageEmbed()
  .setThumbnail(message.author.avatarURL()) //dcs
  .setTitle("Mesaj Silme")
  .addField("**Mesajın Sahibi**", `<@${message.author.id}> **|** \`${message.author.id}\``)
  .addField("**Mesaj**", `${message.content}`)
  .setTimestamp()
  .setColor("RED")
  client.channels.cache.get(mslog).send(embed)
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let mslog = await db.fetch(`mslog_${oldMessage.guild.id}`);
  if (!mslog) return;
  let embed = new Discord.MessageEmbed()
  .setThumbnail(oldMessage.author.avatarURL()) //dcs
  .setTitle("Mesaj Düzenleme")
  .addField("**Mesajın Sahibi**", `<@${oldMessage.author.id}> | **${oldMessage.author.id}**`)
  .addField("**Eski Mesajı**", `${oldMessage.content}`)
  .addField("**Yeni Mesajı**", `${newMessage.content}`)
  .setTimestamp()
  .setColor("RED")
  client.channels.cache.get(mslog).send(embed)
});
//Dcs Official

//sa as
client.on("message", async message => {
  let a = await db.fetch(`saas_${message.guild.id}`)
  if (a) {
      if (message.content.toLowerCase() === "sa") {
        message.channel.send(
new Discord.MessageEmbed()
          .setDescription(`**Aleyküm Selam Hoşgeldin**`)
)
      }
  }
  
  
})

client.on('guildMemberAdd', async (member) => {
  if(db.has(`${member.guild.id}_otorol`)) {
    var rolID = db.fetch(`${member.guild.id}_otorol`)
    member.roles.add(rolID)
  } else {
    return;
  }
  if(db.has(`${member.guild.id}_otokanal`)) {
    var kanal = client.channels.cache.get(db.fetch(`${member.guild.id}_otokanal`))
    const embed = new Discord.MessageEmbed()
    .setDescription(`Yeni katılan ${member} kullanıcısına <@&${rolID}> rolü verildi`)
    .setTimestamp()
    kanal.send(embed)
  } else {
    return;
  }
})

client.on("ready", async function() {
  const voiceChannel = "805140853533573131"
  client.channels.cache.get(voiceChannel).join()
  .catch(err => {
  throw err;
  })
  })

client.on("ready", async function() {
  const voiceChannel = "810051775314788352"
  client.channels.cache.get(voiceChannel).join()
  .catch(err => {
  throw err;
  })
  })

client.on('message', msg => {

if(client.ws.ping > 2500) {

            let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong',
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.cache.find(c => c.name === "ddos-system")

           sChannel.send(`Sunucu'ya Vuruyorlar \nSunucu Bölgesini Değiştirdim \n __**${yenibölge}**__ :tik: __**Sunucu Pingimiz**__ :`+ client.ws.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log(" bölge:" + g.region))
           .then(g => msg.channel.send("bölge **"+ g.region  + " olarak değişti"))
           .catch(console.error);
}});



client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});
client.login(ayarlar.token);


client.on('message', message => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.mentions.users.first()) { if (message.mentions.users.first().id === client.user.id){ 
  const sametigötten = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(`**Merhaba Ben** ${client.user.username} **Galiba Hakkımda Birşey Bilmiyorsun**`)
  .setDescription(`\`@${client.user.username}\` **Adlı Rolümü Üstte Tutmayı Unutma**
  
  :white_small_square:**  | Şuanki Pingim** \`${client.ws.ping}ms\`
 :white_small_square: **  | Yardım Menüme Erişmek İçin** \`!yardım\`
 :white_small_square:  | **Prefixim**\`!\`
  :white_small_square: | **Dilim** \`Türkçe\`
  :white_small_square: | ** Beni Davet Et** \`!davet\`
 :white_small_square:** |  Sitemiz** \`!site\``)
  .setImage("https://cdn.discordapp.com/attachments/789813402536509452/808819177862594560/standard_1.gif")
  message.channel.send(sametigötten)
  }}});



//////çekiliş/////////
if (!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  async getAllGiveaways() {
    return db.get("giveaways");
  }

  async saveGiveaway(messageID, giveawayData) {
    db.push("giveaways", giveawayData);
    return true;
  }

  async editGiveaway(messageID, giveawayData) {
    const giveaways = db.get("giveaways");
    const newGiveawaysArray = giveaways.filter(
      giveaway => giveaway.messageID !== messageID
    );
    newGiveawaysArray.push(giveawayData);
    db.set("giveaways", newGiveawaysArray);
    return true;
  }

  async deleteGiveaway(messageID) {
    const newGiveawaysArray = db
      .get("giveaways")
      .filter(giveaway => giveaway.messageID !== messageID);
    db.set("giveaways", newGiveawaysArray);
    return true;
  }
};
const manager = new GiveawayManagerWithOwnDatabase(client, {
  storage: false,
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#0a99ff",
    reaction: "🎉"
  }
});
client.giveawaysManager = manager;

client.login(process.env.token);

///ÇEKİLİŞ/// 





//-------------------- Küfür Engel --------------------//
//-------------------- Küfür Engel --------------------//
//-------------------- Küfür Engel --------------------//

client.on("message", async msg => {
  const i = await db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          const kinda = new Discord.MessageEmbed()

            .setDescription("<a:Uyar:794135977202548737>  | **Bu Sunucuda Küfür Etmene İzin Vermiyorum**")
            .setColor("BLACK");

          return msg.reply(kinda);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("messageUpdate", msg => {
  const i = db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "amk",
      "ananı sikiyim",
      "ananıskm",
      "piç",
      "amk",
      "amsk",
      "sikim",
      "sikiyim",
      "orospu çocuğu",
      "piç kurusu",
      "kahpe",
      "orospu",
      "mal",
      "sik",
      "yarrak",
      "am",
      "amcık",
      "amık",
      "yarram",
      "sikimi ye",
      "mk",
      "mq",
      "aq",
      "ak",
      "amq"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();

          const kinda = new Discord.MessageEmbed()

            .setDescription(" <a:Uyar:794135977202548737>  | **Bu Sunucuda Küfür Etmene İzin Vermiyorum**")
            .setColor("BLACK");

          return msg.reply(kinda);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//-------------------- Küfür Engel --------------------//
//-------------------- Küfür Engel --------------------//
//-------------------- Küfür Engel --------------------//

//-------------------- Reklam Engel Sistemi --------------------//
//-------------------- Reklam Engel Sistemi --------------------//
//-------------------- Reklam Engel Sistemi --------------------//

client.on("message", async message => {
  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Virtual Reklam Engel")
            .setDescription(
              ` <a:Uyar:794135977202548737>  | <@${message.author.id}> **Reklam Yapmayı Sonlandır Bu İlk Uyarındır** (1/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 1) {
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Virtual Reklam Engel")
            .setDescription(
              `<a:Uyar:794135977202548737>  | <@${message.author.id}> **Reklam Yapmayı Sonlandır Bir Daha Yaparsan Sunucudan Atılacaksın**(2/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam-Engel Sistemi!`
          });
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Virtual Reklam Engel")
            .setDescription(
              `<:Onay:798597771166875669>  | <@${message.author.id}> Reklam Yaptığı İçin Sunucudan Atıldı (3/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `Kinsta Reklam-Engel Sistemi!`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let uyari = new Discord.RichEmbed()
            .setColor("BLACK")
            .setTitle("Virtual Reklam Engel")
            .setDescription(
              `<:Onay:798597771166875669>  | <@${message.author.id}> Atıldıktan Sonra Tekrar Reklam Yaptığı İçin Sunucudan Banlandı`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
          message.channel.send(uyari);
        }
      }
    }
  }
});

//-------------------- Reklam Engel Sistemi --------------------//
//-------------------- Reklam Engel Sistemi --------------------//
//-------------------- Reklam Engel Sistemi --------------------//



//-------------------- Ever Here Engel --------------------//
//-------------------- Ever Here Engel --------------------//
//-------------------- Ever Here Engel --------------------//

client.on("message", async msg => {
  let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`);
  if (hereengelle == "acik") {
    const here = ["@here", "@everyone"];
    if (here.some(word => msg.content.toLowerCase().includes(word))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete();
        msg.channel
          .send(`<@${msg.author.id}>`)
          .then(message => message.delete());
        var e = new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(`<a:Uyar:794135977202548737>  | **Bu Sunucuda Everyone ve Here Kullanımı Yasaktır**`);
        msg.channel.send(e);
      }
    }
  } else if (hereengelle == "kapali") {
  }
});

//-------------------- Ever Here Engel --------------------//
//-------------------- Ever Here Engel --------------------//
//-------------------- Ever Here Engel --------------------//



//-------------------- Mod Log Sistemi --------------------//
//-------------------- Mod Log Sistemi --------------------//
//-------------------- Mod Log Sistemi --------------------//

client.on('channelCreate', async channel => {
  const c = channel.guild.channels.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .addField(`Kanal oluşturuldu`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .addField(`Kanal silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .addField(`Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\nID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\nID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji silindi`, ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\nID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.get(db.fetch(`codeminglog_${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Emoji güncellendi`, ` Eski ismi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\nID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(embed)
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcı banlandı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Sebep: **${entry.reason || 'Belirtmedi'}**\n Banlayan: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});

client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Kullanıcının banı açıldı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.get(db.fetch(`codeminglog_${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .setTitle("Mesaj silindi")                
                    .addField(`Silinen mesaj : ${message.content}`,`Kanal: ${message.channel.name}`)
                  //  .addField(`Kanal:`,`${message.channel.name}`)
                    .setTimestamp()
                    .setColor("Black")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(embed)
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.get(db.fetch(`codeminglog_${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.RichEmbed()
    .setTitle("Mesaj güncellendi!")
    .addField("Eski mesaj : ",`${oldMessage.content}`)
    .addField("Yeni mesaj : ",`${newMessage.content}`)
    .addField("Kanal : ",`${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("Black")
    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,`${oldMessage.client.user.avatarURL}`)

    channel.send(embed)
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol oluşturuldu`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("Black")
.addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Rol silindi`, ` ismi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("Black")
    .addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {
  
 // if (!logA[oldMember.guild.id]) return;
  
  if (db.has(`codeminglog_${oldMember.guild.id}`) === false) return;
  
  var kanal = oldMember.guild.channels.get(db.fetch(`codeminglog_${oldMember.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.RichEmbed()
    .setColor("Black")
    .setDescription(`${newMember.user.tag} adlı kullanıcı \`${newUserChannel.name}\` isimli sesli kanala giriş yaptı!`)
    kanal.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.RichEmbed()
    .setColor("Black")
    .setDescription(`${newMember.user.tag} adlı kullanıcı sesli kanaldan çıkış yaptı!`)
    kanal.send(embed);
    
  }
});

//-------------------- Mod Log Sistemi --------------------//
//-------------------- Mod Log Sistemi --------------------//
//-------------------- Mod Log Sistemi --------------------//




client.on("channelDelete", async function(channel) {
    let rol = await db.fetch(`kanalk_${channel.guild.id}`);
  
  if (rol) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  channel.clone().then(z => {
    let kanal = z.guild.channels.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  }
})

