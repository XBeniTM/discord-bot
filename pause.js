const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "pause",
    description: "Zene megállítása",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: [],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Nem megy semmi...**");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Nem vagy bent egyetlen egy darab csatornába.**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Bekell lépned egy csatornába hogy lejátszad.**");
        if (player.paused) return client.sendTime(message.channel, "❌ | **Music is already paused!**");
        player.pause(true);
        let embed = new MessageEmbed().setAuthor(`Leállítva`, client.botconfig.IconURL).setColor("RANDOM").setDescription(`írd be \`${GuildDB.prefix}resume\` hogy tovább menjen.`);
        await message.channel.send(embed);
        await message.react("✅");
    },

    SlashCommand: {
        /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
        run: async (client, interaction, args, { GuildDB }) => {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);

            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **Nem vagy bent egyetlen egy darab csatornába.**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Bekell lépned egy csatornába hogy lejátszad.**");

            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction, "❌ | **Nem megy semmi...**");
            if (player.paused) return client.sendTime(interaction, "Nem megy...");
            player.pause(true);
            client.sendTime(interaction, "**⏸ leállítva!**");
        },
    },
};
