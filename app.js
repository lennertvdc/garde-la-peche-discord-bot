const Discord = require("discord.js");
const bot = new Discord.Client();
const axios = require("axios");
const config = require("./config")

bot.on("ready", () => {
    console.log("Ready!");
    const servers = bot.guilds.cache;
    servers.forEach(async (server) => {
        if (! await channelExists(server.channels.cache)) {
            const channel = await server.channels.create(config.channel_name, { "nsfw": true });
            const webhook = await channel.createWebhook(config.webhook.name, { "avatar": config.webhook.avatar_url });
            await sendWebhook(webhook.url);
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

async function sendWebhook(url) {
    try {
        const webhook = {
            "url": url
        };
        await axios.post(config.post_url, webhook);
        console.log("Succesfully sended webhook to the server.");
    } catch (error) {
        console.log("Could not send webhook to the server!");
        console.log(error);
    }
}