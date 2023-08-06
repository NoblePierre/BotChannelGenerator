import { Client, GatewayIntentBits } from 'discord.js';
import ready from './events/ready';
import voiceStateUpdate from './events/voice-state-update';
import interactionCreate from './events/interaction-create';

console.log("Bot is starting...");

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
	],
});

ready(client);
interactionCreate(client);
voiceStateUpdate(client);

client.login(process.env.AUTH_TOKEN);