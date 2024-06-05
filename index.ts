import fs from "fs"
require("dotenv").config();

if (!fs.existsSync(".env")) {

	fs.writeFileSync(".env", "BOT_TOKEN=");
	throw new Error("Fill out the .env file!");
};

import { Client, GatewayIntentBits, Partials, IntentsBitField } from 'discord.js';

const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers);

const client = new Client({ intents: myIntents });

import { readdirSync } from 'node:fs';

import { Data } from "./Data"


import { execute } from "./src/utils/commandHandler"

execute(client).then((theData: Data) => {
	readdirSync('./src/utils').map(async file => {
		if (file.includes("commandHandler")) return;

		const util = await import(`./src/utils/${file}`);
		util.execute(client, theData);
	});
});


try {
	client.login(process.env.BOT_TOKEN);
} catch (e) {
	console.log(e)
	throw e;
}
