const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

if (!existsSync(join(process.cwd(), 'node_modules'))) {
    console.log('Installing dependencies, please wait...');
    execSync('npm init -y', { stdio: 'inherit' });
    execSync('npm install express axios dotenv discord.js', { stdio: 'inherit' });
}

const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const {
    ActivityType,
    Client,
    GatewayIntentBits,
} = require('discord.js');

const app = express();
app.use(express.json());
dotenv.config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once('ready', () => {
    console.log('Quark is connected to Discord and is ready!');

    client.user.setPresence({
        activities: [{ name: '/help | atomlabs.ie', type: ActivityType.Playing }],
        status: 'online',
    });
});

const token = process.env.TOKEN;
const port = process.env.PORT || 80;

async function getBase64FromUrl(userId) {
    try {
        const thumbnailResponse = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png`);
        
        if (!thumbnailResponse.data.data || thumbnailResponse.data.data.length === 0) {
            throw new Error('No thumbnail data received');
        }

        const imageUrl = thumbnailResponse.data.data[0].imageUrl;
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        if (!response.data || response.data.length === 0) {
            throw new Error('Received empty image data');
        }

        return Buffer.from(response.data).toString('base64');
    } catch (error) {
        console.error('Error fetching avatar:', error);
        return null;
    }
}

app.post('/createWebhook', async (req, res) => {
    const { username, userID, channelID } = req.body;

    if (!username || !channelID || !userID) {
        return res.status(400).json({ error: 'Missing variables!' });
    }

    try {
        const base64Avatar = await getBase64FromUrl(userID);
        let avatarData;

        if (base64Avatar) {
            avatarData = `data:image/png;base64,${base64Avatar}`;
        }

        const channel = await client.channels.fetch(channelID);
        const webhook = await channel.createWebhook({
            name: username,
            avatar: avatarData,
            reason: `Webhook created for a Roblox user by the name of '${username}'.`
        });

        res.status(200).json({ url: webhook.url });
    } catch (error) {
        console.error('Error creating webhook:', error);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

app.listen(port, () => console.log(`QuarkAPI is running on port ${port}!`));
client.login(token);