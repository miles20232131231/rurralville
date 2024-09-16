const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Deletes a specified number of messages')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Number of messages to delete')
                .setRequired(true)),
    
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        const botID = '1284194702211420251'; // The ID of the ruralville bot

        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'You need to input a number between 1 and 100.', ephemeral: true });
        }

        try {
            // Fetch the messages
            const messages = await interaction.channel.messages.fetch({ limit: amount });
            
            // Filter out messages from the bot
            const filteredMessages = messages.filter(message => message.author.id !== botID);
            
            // Bulk delete the filtered messages
            await interaction.channel.bulkDelete(filteredMessages, true);

            return interaction.reply({ content: `Successfully deleted ${filteredMessages.size} messages.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error trying to purge messages in this channel!', ephemeral: true });
        }
    },
};
