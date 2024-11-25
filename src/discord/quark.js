import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
dotenv.config();

const token = process.env.TOKEN;
const discordAPIBase = process.env.DISCORD_API_BASE;
const port = process.env.PORT || 80;

app.post('/createWebhook', async (req, res) => {
    const { username, userID, channelID } = req.body;

    if (!username || !channelID || !userID) {
        return res.status(400).json({ error: 'Missing variables!' });
    }

    try {
        const avatarResponse = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userID}&size=420x420&format=Png&isCircular=false`);
        const avatarData = avatarResponse.data;
        const finalAvatarUrl = avatarData.data[0]?.imageUrl;

        const response = await axios.post(
            `${discordAPIBase}/channels/${channelID}/webhooks`,
            { name: username, avatar: finalAvatarUrl },
            {
                headers: {
                    Authorization: `Bot ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json({ url: `${discordAPIBase}/webhooks/${response.data.id}/${response.data.token}` });
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
        console.log("Error using webhook: ", error)
    }
});

app.listen(port, () => console.log(`Quark is running on port ${port}!`));