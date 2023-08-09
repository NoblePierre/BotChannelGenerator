import { CommandInteraction, Client, ApplicationCommandType, Collection, Snowflake, GuildMember, ComponentType, VoiceChannel, PermissionsBitField } from "discord.js";
import { Command } from "./interfaces/command.interface";

export const LockVoiceRoom: Command = {
    name: "voice-lock",
    description: "Lock a voice room, other people cannot join.",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        if (!interaction.channel.name.match(/voice room$/)) {
            interaction.followUp({
                content: `Alors ${interaction.user.globalName}, on essaye de gruger les permissions ?\nCes salons ne peuvent pas être modifiés !\nJe t'invite à créer ton propre salon avec\n「➕」New voice\nsi tu souhaites gérer le tien !`
            })

            return;
        }
        const channelMembers = interaction.channel.members as Collection<Snowflake, GuildMember>;
        const channelMember = channelMembers.find(member => member.id === interaction.user.id);

        if (!channelMember) {
            interaction.followUp({
                content: `Hop hop hop ${interaction.user.globalName}, tu ne fais pas partie de ce salon. N'essaye pas d'y modifier quoique ce soit ! 😥`
            })

            return;
        }

        const firstMember = channelMembers.at(0);

        if (firstMember.id === interaction.user.id) {
            const channel = await client.channels.fetch(interaction.channelId) as VoiceChannel;

            channel.permissionOverwrites.set([
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.SendMessages],
                }, {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                }, {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.ReadMessageHistory]
                }, {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.CreatePublicThreads]
                }, {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.CreatePrivateThreads]
                }
            ]);

            interaction.followUp({
                content: 'Ce salon est désormais verrouillé'
            })

            return;
        }

        interaction.followUp({
            content: `Seul ${firstMember.user.globalName} est autorisé à exécuter des actions dans ce salon`
        })

        return;
    }
};