import { ChannelType, PermissionsBitField, Events, Client, VoiceState } from 'discord.js';

export default (client: Client): void => {
	client.on(Events.VoiceStateUpdate, async (oldState: VoiceState, newState: VoiceState) => {
		await handleVoiceStateUpdate(client, oldState, newState);
	});
};

const handleVoiceStateUpdate = async (client: Client, oldState: VoiceState, newState: VoiceState): Promise<void> => {
	const newChannel = newState.channel;
	const oldChannel = oldState.channel;

	if (newChannel && newChannel.name.match(new RegExp(/New voice/))) {
		if (newState.member) {
			const username = newState.member.user.username;
			const upperCaseUsername = username.charAt(0).toUpperCase() + username.slice(1);

			newChannel.guild.channels.create({
				name: `${upperCaseUsername} voice room`,
				type: ChannelType.GuildVoice,
				parent: newChannel.parent,
				permissionOverwrites: [
					{
						id: newState.member.id,
						allow: [PermissionsBitField.Flags.ManageChannels],
					},
					{
						id: newState.guild.id,
						deny: [PermissionsBitField.Flags.ManageChannels],
					},
				],
			}).then(newVoiceChannel => {
				newState.setChannel(newVoiceChannel).catch(console.error);
			}).catch(console.error);
		}
	}

	if (newChannel === null || !newChannel.name.match(new RegExp(/New voice/))) {
		if (oldChannel && oldChannel.name.match(/voice room$/) && !oldChannel.members.size) {
			oldChannel.delete();
		}
	}
};