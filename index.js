const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
	],
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		console.log(`Loaded event : "${event.name}"`);
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		console.log(`Loaded event : "${event.name}"`);
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.AUTH_TOKEN);