import { readdirSync } from "fs";

export async function execute(client, commandData) {
	const eventFiles = readdirSync('./src/events');

	Promise.all(eventFiles.map(async file => {
		const event = await import(`../events/${file}`);
		if(!event || !event.execute){
			console.log(event)
			throw new Error("Cannot execute event " + file);
		}

		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, commandData));
		} else {
			client.on(event.name, (...args) => event.execute(...args, commandData));
		}
	}));

	// Process Listeners
	process.on('unhandledRejection', e => {
		console.log(e);
	});
	process.on('uncaughtException', e => {
		console.log(e);
	});
	process.on('uncaughtExceptionMonitor', e => {
		console.log(e);
	});
};