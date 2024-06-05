import { ActivityType, Events } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

export var name = Events.ClientReady
export var once = true

export async function execute(client, commandData) {
	const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN || "a");
	const activities = ['Developed by tonyxforce.', `${client.user.username}`];
	let nowActivity = 0;

	const botPresence = () => {
		client.user.presence.set({
			activities: [{ name: `${activities[nowActivity++ % activities.length]}`, type: ActivityType.Listening }],
		});
		setTimeout(botPresence, 5000);
	};

	botPresence();

	client.log(`${client.user.username} running!`);


	try {
		await rest.put(Routes.applicationCommands(client.user.id), {
			body: commandData.datas,
		});
	} catch (error) {
		console.error(error);
	}
};
