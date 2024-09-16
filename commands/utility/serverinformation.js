const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-information')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
        .setDescription('Gives Server Information'),
    async execute(interaction) {

        const image = "https://cdn.discordapp.com/attachments/1282347649055592540/1284416549091934249/Screenshot_2024-09-14_014413.png?ex=66e68da0&is=66e53c20&hm=e6152d448d9965a2868743cd3e82ff6a2028d6547f5b762b48082e94fbc8eafd&";
        
        // Embeds for the command
        const embed1 = new EmbedBuilder()
            .setTitle('Server Information')
            .setDescription(`> Welcome to Ruralville, here you can get information about the server.`)
            .setColor(`#f3eeee`);

        const embed2 = new EmbedBuilder()
            .setTitle('Server Regulations')
            .setDescription(`
1. No Homophobia or Transphobia: Any form of disrespect towards communities, races, or disabilities is strictly prohibited.
2. Respect Everyone: Treat all members of Star Ruralville with respect. If you need to address someone privately, use direct messages.
3. No DM Advertising: Sharing links to other servers or any general links via direct messages is forbidden and may result in a ban.
4. No Drama: Avoid engaging in or spreading drama. False accusations that could lead to drama are also not allowed.
5. No Spamming: Spamming in any channel will result in a one-hour mute.
6. No Mini-Modding: Acting as a moderator without permission will lead to an infraction.
7. No Doxxing or IP Grabbing: Such actions will result in an unappealable ban.
8. No Ear Raping or Loud Audios: Playing loud audios or yelling in voice calls is prohibited and will result in a five-minute server mute.
9. Follow Chain of Command: All members must adhere to the chain of command. Failure to do so will result in an infraction.
10. External Moderation: We do not moderate actions outside of this server unless they involve a staff member or include homophobia, transphobia, or racism.
11. No Jokes About Death or Disability: Such jokes will lead to a ban from Ruralville.
12. No Nudity: Sharing nudity content will result in an unappealable ban.
13. Follow Discord Terms of Service: All members must comply with Discord's Terms of Service at all times. For more information, visit [Discord Terms of Service.](https://discord.com/terms)`)
            .setColor(`#f3eeee`);

        const embed3 = new EmbedBuilder()
            .setTitle('Roleplay Rules')
            .setDescription(`
1. Exercise Common Sense: Always use good judgment during sessions.
2. Yield to Public Services: This includes all staff members.
3. Obey Traffic Signals: Running red lights or stop signs is considered reckless driving and will result in an infraction.
4. Respawn Permissions: Request permission from a staff member before spawning a new vehicle. You can respawn at Spawn or any gas station.
5. Restricted Vehicles: Driving banned vehicles will result in an infraction. A list of banned vehicles will be provided soon.
6. No Combat Logging: Logging out during combat will lead to an unappealable ban.
7. No Drifting or Burnouts: These actions are prohibited and will result in a warning.
8. Realistic Avatars: Wear a realistic avatar during sessions. Non-compliance will result in a warning. (Korblox & Headless are allowed)
9. Respawn Requests: Use "!staff + location" in chat when requesting respawn permissions. Refer to rule 4.
10. Move Over Law: Follow this law when approaching traffic stops or crashes.
11. Accident Protocol: Pull over, exit your vehicle, and type "exchanges" if you get into an accident.
12. Roleplay Crashes: Roleplay all crashes if you're driving over 30 mph and law enforcement or EMS is online.
13. No Horn or High-Beam Abuse: Misuse of horns or high-beams will result in a warning.
14. Public Services Department: You may not be part of any Public Services Department during sessions. Violations will result in a double warning.
15. Safe Merging: Maintain a 5+ car distance when merging lanes. Failure to do so will result in a warning.
16. Realistic Vehicle Colors: Avoid unrealistic vehicle colors, including neon, shiny, or lime. This also applies to your vehicle's rims.
17. No Off-Roading or Reckless Driving: Off-roading, cutting up, or turning at high speeds are prohibited. Using the P-Brake to stop your vehicle is also not allowed.`)
            .setColor(`#f3eeee`);

        // Send the embeds as a response to the command
        await interaction.reply({ 
            content: 'Command Sent Below.', 
            ephemeral: true 
        });

        try {
            await interaction.channel.send({ embeds: [embed1, embed2, embed3], files: [image] });
        } catch (error) {
            console.error('Error sending embed messages:', error);
        }
    },
};
