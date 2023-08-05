const { Events, ChannelType, PermissionsBitField } = require('discord.js');
const VOICE_ROOM_CREATOR_CHANNEL_ID = '1137355795642716320';

module.exports = {
	name: Events.VoiceStateUpdate,
	execute(oldState, newState) {
		const newChannel = newState.channel;
		const oldChannel = oldState.channel;

		// console.log(newChannel?.id);
		// console.log(oldChannel?.id);

		if (newChannel && newChannel.id === VOICE_ROOM_CREATOR_CHANNEL_ID) {
			// Create a new channel in the same category as the 'General' channel

			newChannel.guild.channels.create({
				name: 'Voice Room',
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
				// Move the user into the new channel
				newState.setChannel(newVoiceChannel)
					.catch(console.error);
			}).catch(console.error);
		}

		if (newChannel === null || newChannel.id !== VOICE_ROOM_CREATOR_CHANNEL_ID) {
			if (oldChannel.name.match(/^Voice Room/) && !oldChannel.members.size) {
				oldChannel.delete();
			}
		}
	},
};