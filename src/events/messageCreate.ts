const { ChannelType, Collection, Events } = require('discord.js');

export let name = Events.MessageCreate

export async function execute(message) {

	if (message.author.bot) {
		return;
	}

	if (message.channel.type === ChannelType.DM) {
		console.log(`DM received: ${message.content}`)
	}
};
