// interactionCreate.js

const { EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

const dataFolderPath = path.join(__dirname, '../../data/vehicleData');
const ticketsDirPath = path.join(__dirname, '../../data/tickets');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;

        // Handle Registrations button click
        if (interaction.customId.startsWith('show_registrations_')) {
            const userId = interaction.customId.split('_')[2];
            const vehicleData = interaction.client.vehicleData?.[userId] || [];

            const vehicleList = vehicleData.length > 0
                ? vehicleData.map((v, index) =>
                    `**${index + 1}.** Year: ${v.year}, Make: ${v.make}, Model: ${v.model}, Color: ${v.color}, Number Plate: ${v.numberPlate}`).join('\n')
                : 'No Registrations found.';

            const vehicleEmbed = new EmbedBuilder()
                .setTitle(`Registrations`)
                .setDescription(vehicleList)
                .setColor('#9ef673');

            try {
                await interaction.reply({ embeds: [vehicleEmbed], ephemeral: true });
            } catch (error) {
                console.error('Error sending vehicle embed:', error);
                await interaction.reply({ content: 'An error occurred while fetching your registrations.', ephemeral: true });
            }
        }

        // Handle Tickets button click
        if (interaction.customId.startsWith('show_tickets_')) {
            const userId = interaction.customId.split('_')[2];
            const tickets = interaction.client.ticketsData?.[userId] || [];

            const ticketsList = tickets.length > 0
                ? tickets.map((t, index) =>
                    `**${index + 1}.** Offense: ${t.offense}, Price: ${t.price}, Count: ${t.count}, Date: ${new Date(t.date).toLocaleDateString()}`).join('\n')
                : 'No Tickets found.';

            const ticketsEmbed = new EmbedBuilder()
                .setTitle(`Tickets`)
                .setDescription(ticketsList)
                .setColor('#9ef673');

            try {
                await interaction.reply({ embeds: [ticketsEmbed], ephemeral: true });
            } catch (error) {
                console.error('Error sending tickets embed:', error);
                await interaction.reply({ content: 'An error occurred while fetching your tickets.', ephemeral: true });
            }
        }
    },
};
