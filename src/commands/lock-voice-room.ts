import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "./interfaces/command.interface";

export const LockVoiceRoom: Command = {
    name: "lock-voice-room",
    description: "Lock a voice room, other people cannot join.",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        
    }
};