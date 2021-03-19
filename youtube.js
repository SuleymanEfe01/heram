var parseXml = require('xml2js').parseString;
var pubSubHubbub = require("pubsubhubbub");
var request = require("request").defaults({
    'headers': {
        'User-Agent': process.env.UA || 'ytdsc'
    }
});

if (!process.env.CALLBACK) {
    console.error("https://hera-bot-by-suleyman.glitch.me/"); 
    process.exit(1);
}

var channelId = process.env.CHID || 'UCbpMm1h3yRthCxHHHoR3Evg';
var topic = 'https://www.youtube.com/xml/feeds/videos.xml?channel_id=' + channelId;
var hub = 'https://pubsubhubbub.appspot.com/';

var lastId = '';
var isExiting = false;  

var pubSubSubscriber = pubSubHubbub.createServer({
    callbackUrl: process.env.CALLBACK
});

pubSubSubscriber.on('denied', function () {
    console.error('DENIED', JSON.stringify(arguments));
    process.exit(2);
});

pubSubSubscriber.on('error', function () {
    console.error('ERROR', JSON.stringify(arguments));
    process.exit(3);
});
  
setInterval(function () {
    pubSubSubscriber.subscribe(topic, hub, function (err) { if (err) console.error(err); });
}, 86400000); 

pubSubSubscriber.on('listen', function () {
    console.log('Kanalınız Gözetleniyor...');
    pubSubSubscriber.on('subscribe', function (data) {
        console.log(data.topic + ' subscribed until ' + (new Date(data.lease * 1000)).toLocaleString());
    });
    pubSubSubscriber.on('unsubscribe', function (data) {
        console.log(data.topic + ' unsubscribed');
        if (!isExiting) {
            pubSubSubscriber.subscribe(topic, hub, function (err) { if (err) console.error(err); });
        }
    });
    pubSubSubscriber.subscribe(topic, hub, function (err) {
        if (err) console.error(err);
    });
    pubSubSubscriber.on('feed', function (data) {
        var feedstr = data.feed.toString('utf8');
        parseXml(feedstr, function (err, feed) {
            if (err) {
                console.error("ERROR", err);
            }
            console.log("JSON:", JSON.stringify(feed.feed));
            if (feed.feed.entry) {
                feed.feed.entry.forEach(postToHook);
            } else console.log("Yeni Video");
        });
    });
});

pubSubSubscriber.listen(process.env.PORT || 8000);

function postToHook(entry) {
    console.log('Son', lastId, 'Şuanki', entry['yt:videoId'][0]);
   if (entry["published"]
		&& entry["yt:channelId"] == 798536321546453012
		&& lastId != entry['yt:videoId'][0]
		&& ((new Date(entry['updated'])).getTime() - (new Date(entry['published'])).getTime()) < 60 * 60 * 1000 // 5 min
	) {
        lastId = entry['yt:videoId'][0];
        console.log('newlast', lastId);
        request.post({
            url: process.env.HOOKURL,
            form: {
                content: "@everyone Yeni Video Yüklendi: " + entry["title"] + " - https://youtu.be/" + entry['yt:videoId'][0],
                embeds: [{
                    video: "https://youtu.be/" + entry['yt:videoId'][0]
                }]
            }
        }, function (err, response, body) {
            if (err) { console.log('error:', err); }
            if (response) { console.log('status:', response.statusCode); }
            if (body) { console.log('body:', body); }
        });
    }
}


process.on('SIGINT', function () {
    isExiting = true;
    pubSubSubscriber.unsubscribe(topic, hub, function (err) { if (err) console.log(err); process.exit(0); });
});