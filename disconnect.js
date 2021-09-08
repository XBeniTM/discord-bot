const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "disconnect",
  description: "Leállítja a zenét és kilép.",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["leave", "exit", "quit", "dc", "stop"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel) return client.sendTime(message.channel, "❌ | **Ezt a parancsot hangcsatornában kell használnod**");
    if (!player) return client.sendTime(message.channel,"❌ | **Jelenleg semmit nem játszik ...**");
    await client.sendTime(message.channel,":notes: | **Lecsatlakoztam**");
    await message.react("✅");
    player.destroy();
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

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **A parancs használatához hangcsatornában kell lennie.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          `❌ | **A parancs használatához ${guild.me.voice.channel} bekell lépned egy csatornába.**`
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Semmit nem játszik...**"
        );
      player.destroy();
      client.sendTime(
        interaction,
        ":notes: | **Lecatlakozva...**"
      );
    },
  },
};
