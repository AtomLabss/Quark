const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

if (!existsSync(join(process.cwd(), 'node_modules'))) {
    console.log('Installing dependencies...');
    execSync('npm init -y', { stdio: 'inherit' });
    execSync('npm install express axios dotenv', { stdio: 'inherit' });
}

const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

const app = express();
app.use(express.json());
dotenv.config();

const token = process.env.TOKEN;
const discordAPIBase = process.env.DISCORD_API_BASE;
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
        const webhookData = { name: username };
        const base64Avatar = await getBase64FromUrl(userID);
        
        if (base64Avatar) {
            webhookData.avatar = `data:image/png;base64,${base64Avatar}`;
        }

        const response = await axios.post(
            `${discordAPIBase}/channels/${channelID}/webhooks`,
            webhookData,
            {
                headers: {
                    Authorization: `Bot ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json({ url: `${discordAPIBase}/webhooks/${response.data.id}/${response.data.token}` });
    } catch (error) {
        console.error('Error creating webhook:', error);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

app.listen(port, () => console.log(`Quark is running on port ${port}!`));
