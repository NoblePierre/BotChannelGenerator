import { CommandInteraction, Client, ApplicationCommandType, Collection, Snowflake, GuildMember } from "discord.js";
import { Command } from "./interfaces/command.interface";

export const LockVoiceRoom: Command = {
    name: "lock-voice-room",
    description: "Lock a voice room, other people cannot join.",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        if (!interaction.channel.name.match(/voice room$/)) {
            interaction.followUp({
                content: `Alors ${interaction.user.globalName}, on essaye de gruger les permissions ?\nCes salons ne peuvent pas être modifiés !\nJe t'invite à créer ton propre channel avec\n「➕」New voice\nsi tu souhaites gérer le tien !`
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

        return;
    }
};