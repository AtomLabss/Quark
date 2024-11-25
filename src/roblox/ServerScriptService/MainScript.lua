local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

local proxyURL = "<your-quark-proxy-url>";
local discordchannelID = "<your-channel-id>";
local quarkWebhooks = {}; -- to-do: load from a data store, e.g DataStoreService!

local function createWebhook(player)
	local payload = {
		username = player.Name,
		userID = player.UserId,
		channelID = discordchannelID
	};

	local success, response = pcall(function()
		local jsonData = HttpService:JSONEncode(payload);
		return HttpService:PostAsync(proxyURL .. "/createWebhook", jsonData, Enum.HttpContentType.ApplicationJson);
	end)

	if success then
		local webhookData = HttpService:JSONDecode(response);
		quarkWebhooks[player.UserId] = webhookData.url;
		print("Webhook created for player:", player.Name);
	else
		warn("Failed to create webhook for player:", player.Name, tostring(response));
	end
end

local function sendMessage(webhookURL, message)
	local payload = {
		content = message
	}

	local success, response = pcall(function()
		local jsonData = HttpService:JSONEncode(payload);
		return HttpService:PostAsync(webhookURL, jsonData, Enum.HttpContentType.ApplicationJson);
	end)

	if success then
		print("Message sent successfully via webhook."); -- just here for testing purposes atm
	else
		warn("Failed to send message via webhook:", tostring(response));
	end
end

local function onPlayerChat(player, message)
	if not quarkWebhooks[player.UserId] then
		createWebhook(player);
	end

	local webhookURL = quarkWebhooks[player.UserId];
	if webhookURL then
		sendMessage(webhookURL, message);
	end
end

Players.PlayerAdded:Connect(function(player) player.Chatted:Connect(function(message) onPlayerChat(player, message); end) end)