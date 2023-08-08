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
			const username = newState.member.user.globalName;

			newChannel.guild.channels.create({
				name: `${username} voice room`,
				type: ChannelType.GuildVoice,
				parent: newChannel.parent,
				permissionOverwrites: [
					{
						id: newState.member.id,
						allow: [
							PermissionsBitField.Flags.ManageChannels,
						],
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

	if (oldChannel?.name.match(/voice room$/)) {
		if (oldChannel && !oldChannel.members.size) {
			oldChannel.delete();
		}
	}
};