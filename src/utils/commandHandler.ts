import { Collection } from "discord.js";

const { readdirSync } = require('node:fs');

import { Data as CommandData } from "../../Data";

export async function execute(client) {
	var data: CommandData = {
		commands: new Collection(),
		datas: [],
	}

	// - Handlers -
	const commandFolders = await readdirSync('./src/commands');

	commandFolders.forEach(async (category: string) => {
		const commandFiles = await readdirSync(`./src/commands/${category}`);


		commandFiles.forEach(async (file: string) => {

			const command = await import(`../commands/${category}/${file}`);

			if (command) {

				if (!command.data) return;
				data.datas.push(command.data.toJSON());
				data.commands.set(command.data.name, command);
			}
		});
	});
	return data;
};