import { Collection, Events, InteractionType } from 'discord.js';
const cooldown = new Collection();

export var name = Events.InteractionCreate

export async function execute(interaction, commandData) {
	const { client } = interaction;
	if (interaction.type === InteractionType.ApplicationCommand) {
		if (interaction.user.bot) {
			return;
		}

		try {
			const command = commandData.commands.get(interaction.commandName);
			command.exec(client, interaction);

		} catch (e) {
			console.error(e);
			interaction.reply({ content: "An error happened while trying to execute command", ephemeral: false });
		}
	}
}
