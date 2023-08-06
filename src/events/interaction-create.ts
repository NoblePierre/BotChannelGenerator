import { CommandInteraction, Client, Interaction, Events } from "discord.js";
import { Commands } from '../commands/commands';

export default (client: Client): void => {
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(command => command.name === interaction.commandName);

    if (!slashCommand) {
        interaction.followUp({ content: 'La commande désirée n\'existe pas' });
        return;
    }

    await interaction.deferReply();

    slashCommand.run(client, interaction);
};