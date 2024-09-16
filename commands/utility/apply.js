const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apply')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('Server Applications'),
    async execute(interaction) {

        const embed2 = new EmbedBuilder()
            .setTitle('Server Applications')
            .setDescription(`Welcome, this is where you can get all the applications that are in the server. If you need extra help please DM staff.
                Click one of the options below for your application.`)
            .setThumbnail("https://cdn.discordapp.com/icons/1283390779959541760/034a31c84f87ed83e15da923d2a52f18.png?size=512")
            .setColor('#f3eeee');
            
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('information_select')
            .setPlaceholder('Select an option')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Staff Application')
                    .setDescription('To apply for server staff.')
                    .setValue('sa'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Wisconsin State Patrol')
                    .setDescription('To apply for Wisconsin State Patrol.')
                    .setValue('wsp'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Outagamie County Sheriff\'s Office')
                    .setDescription('To apply for Outagamie County Sheriff\'s Office.')
                    .setValue('ocso'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Department of Transportation')
                    .setDescription('To apply for the Department of Transportation.')
                    .setValue('dot'),
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        // Send the embed messages with the dropdown as ephemeral
        await interaction.reply({  
            embeds: [embed2], 
            components: [row],
            ephemeral: true // Ensure this is ephemeral
        });
    },
};
