const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

const dataFolderPath = path.join(__dirname, '../../data/vehicleData');
const ticketsDirPath = path.join(__dirname, '../../data/tickets');
const licensesDirPath = path.join(__dirname, '../../data/licenses');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('View your profile or another user\'s profile.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user whose profile you want to view')
                .setRequired(false)),

    async execute(interaction) {
        try {
            await interaction.deferReply();

            const targetUser = interaction.options.getUser('user') || interaction.user;
            const userId = targetUser.id;

            // Load vehicle data
            const userFilePath = path.join(dataFolderPath, `${userId}.json`);
            let vehicleData = [];
            if (fs.existsSync(userFilePath)) {
                vehicleData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
            }
            const vehicleCount = vehicleData.length;

            // Load ticket data
            const ticketsFilePath = path.join(ticketsDirPath, `${userId}.json`);
            let tickets = [];
            if (fs.existsSync(ticketsFilePath)) {
                tickets = JSON.parse(fs.readFileSync(ticketsFilePath, 'utf8'));
            }

            // Load license status
            const licenseFilePath = path.join(licensesDirPath, `${userId}.json`);
            let licenseStatus = 'Active'; // Default license status
            if (fs.existsSync(licenseFilePath)) {
                try {
                    const licenseData = JSON.parse(fs.readFileSync(licenseFilePath, 'utf8'));
                    licenseStatus = licenseData.status || 'Active'; // Default to 'Active' if no status is set
                } catch (error) {
                    console.error('Error reading license file:', error);
                }
            }

            // Store data in the client object
            interaction.client.vehicleData = interaction.client.vehicleData || {};
            interaction.client.vehicleData[userId] = vehicleData;
            interaction.client.ticketsData = interaction.client.ticketsData || {};
            interaction.client.ticketsData[userId] = tickets;

            // Profile embed
            const profileEmbed = new EmbedBuilder()
                .setTitle(`User's Profile`)
                .setDescription(`**User**: <@${userId}>\n**Registered Vehicles**: **${vehicleCount} Vehicle(s)**\n**License Status**: **${licenseStatus}**`)
                .setColor(`#f3eeee`)
                .setThumbnail(targetUser.displayAvatarURL());

            // Add buttons for additional actions
            const buttons = [
                new ButtonBuilder()
                    .setCustomId(`show_registrations_${userId}`)
                    .setLabel('Show Registrations')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`show_tickets_${userId}`)
                    .setLabel('Show Tickets')
                    .setStyle(ButtonStyle.Secondary)
            ];

            const row = new ActionRowBuilder().addComponents(buttons);

            await interaction.editReply({ embeds: [profileEmbed], components: [row] });

        } catch (error) {
            console.error('Error executing profile command:', error);
            await interaction.editReply({ content: 'An error occurred while fetching the profile. Please try again later.' });
        }
    },
};
