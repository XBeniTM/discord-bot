const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const levels = {
    none: 0.0,
    low: 0.2,
    medium: 0.3,
    high: 0.35,
};
module.exports = {
    name: "bassboost",
    description: "Bass boosting effekt be kapcsolása.",
    usage: "<none|low|medium|high>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["bb", "bass"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {

        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Jelenleg semmi nem megy...**");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **A parancs használatához hangcsatornában kell lenni!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, "❌ | **Neked ugyanabban a hangcsatornában kell lennie, mint nekem, hogy használhassad ezt a parancsot!**");

        if (!args[0]) return client.sendTime(message.channel, "**Kérjük, adjon meg egy mélyhangszintet. \nA rendelkezésre álló szintek: ** 'nincs', 'alacsony', 'közepes', 'magas'"); //if the user do not provide args [arguments]

        let level = "none";
        if (args.length && args[0].toLowerCase() in levels) level = args[0].toLowerCase();

        player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));

        return client.sendTime(message.channel, `✅ | **A Bassboost szint beállítása** \`${level}\``);
    },
    SlashCommand: {
        options: [
            {
                name: "level",
                description: `Kérjük, adjon meg egy mélyhangszintet. Elérhető szintek: alacsony, közepes, magas vagy nincs`,
                value: "[level]",
                type: 3,
                required: true,
            },
        ],
        /**
         *
         * @param {import("../structures/DiscordMusicBot")} client
         * @param {import("discord.js").Message} message
         * @param {string[]} args
         * @param {*} param3
         */

        run: async (client, interaction, args, { GuildDB }) => {
            const levels = {
                none: 0.0,
                low: 0.2,
                medium: 0.3,
                high: 0.35,
            };

            let player = await client.Manager.get(interaction.guild_id);
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);
            const voiceChannel = member.voice.channel;
            if (!player) return client.sendTime(interaction, "❌ | **Jelenleg semmi nem megy...**");
            if (!member.voice.channel) return client.sendTime(interaction, "❌ | **A parancs használatához hangcsatornában kell lenni!**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(voiceChannel)) return client.sendTime(interaction, "❌ | **Neked ugyanabban a hangcsatornában kell lennie, mint nekem, hogy használhassad ezt a parancsot!**");
            if (!args) return client.sendTime(interaction, "**Kérjük, adjon meg egy mélyhangszintet. \nA rendelkezésre álló szintek: ** 'nincs', 'alacsony', 'közepes', 'magas'"); //if the user do not provide args [arguments]

            let level = "none";
            if (args.length && args[0].value in levels) level = args[0].value;

            player.setEQ(...new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] })));

            return client.sendTime(interaction, `✅ | **A Bassboost szint beállítása** \`${level}\``);
        },
    },
};
