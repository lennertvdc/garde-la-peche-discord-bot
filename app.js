const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config")

bot.on("ready", async () => {
    console.log("Ready!");
    const servers = bot.guilds.cache;
    servers.forEach(async (server) => {
        if (! await channelExists(server.channels.cache)) {
            const channel = await server.channels.create(config.channel_name, { "nsfw": true });
            const webhook = await channel.createWebhook(config.webhook.name, { "avatar": config.webhook.avatar_url });
            console.log(webhook);
        }
    });
});

bot.login(config.token);


async function channelExists(channels) {
    channelExist = false;
    channels.forEach(channel => {
        if (channel.type === "text" && channel.name === config.channel_name) {
            channelExist = true;
        }
    });

    return channelExist;
}

async function sendWebhook(webhookUrl) {
//todo
}