const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const dataDirPath = path.join(__dirname, '../../data/vehicleData');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register your vehicle.')
        .addIntegerOption(option =>
            option.setName('year')
                .setDescription('Vehicle Year')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('make')
                .setDescription('Vehicle Make')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('model')
                .setDescription('Vehicle Model')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('trim')
                .setDescription('Vehicle Trim')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('color')
                .setDescription('Vehicle Color')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('number-plate')
                .setDescription('Vehicle Number Plate')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        try {
            const year = interaction.options.getInteger('year');
            const make = interaction.options.getString('make');
            const model = interaction.options.getString('model');
            const trim = interaction.options.getString('trim');
            const color = interaction.options.getString('color');
            const numberPlate = interaction.options.getString('number-plate');
            const userId = interaction.user.id;

            // Ensure the data directory exists
            if (!fs.existsSync(dataDirPath)) {
                fs.mkdirSync(dataDirPath, { recursive: true });
            }

            const userFilePath = path.join(dataDirPath, `${userId}.json`);

            // Load existing vehicle data for the user
            let vehicleData = [];
            if (fs.existsSync(userFilePath)) {
                vehicleData = JSON.parse(fs.readFileSync(userFilePath, 'utf8'));
            }

            // Add the new vehicle data
            vehicleData.push({ year, make, model, trim, color, numberPlate });

            // Save the updated vehicle data back to the file
            fs.writeFileSync(userFilePath, JSON.stringify(vehicleData, null, 2), 'utf8');

            console.log(`Vehicle data saved: ${JSON.stringify(vehicleData, null, 2)}`); // Debugging line

            // Create an ephemeral embed to confirm the registration to the user
            const successEmbed = new EmbedBuilder()
                .setTitle('Vehicle Registered')
                .setDescription(`Your vehicle has been successfully registered. Execute the command /profile to view your vehicles.`)
                .setColor(`#f3eeee`);

            // Send confirmation to the user
            await interaction.editReply({ embeds: [successEmbed] });

            // Create an embed to send to the registration log channel and mention the user
            const registrationLogEmbed = new EmbedBuilder()
                .setTitle('New Vehicle Registered')
                .setDescription(`A new vehicle has been registered by <@${interaction.user.id}>.`) // Mention the user
                .addFields(
                    { name: 'Year', value: year.toString(), inline: true },
                    { name: 'Make', value: make, inline: true },
                    { name: 'Model', value: model, inline: true },
                    { name: 'Trim', value: trim, inline: true },
                    { name: 'Color', value: color, inline: true },
                    { name: 'Number Plate', value: numberPlate, inline: true }
                )
                .setColor(`#f3eeee`)
                .setTimestamp();

            // Send the embed to the specified log channel
            const logChannel = interaction.guild.channels.cache.get('1284908423015825490');
            if (logChannel) {
                await logChannel.send({ embeds: [registrationLogEmbed] });
            } else {
                console.error('Log channel not found.');
            }

        } catch (error) {
            console.error('Error processing vehicle registration:', error);
            await interaction.editReply({ content: 'There was an error while processing your request.', ephemeral: true });
        }
    },
};
