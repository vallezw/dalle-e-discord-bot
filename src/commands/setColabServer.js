const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

const { readJson, writeJson } = require("../utils/jsonUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set_colab_server")
    .setDescription("Set your colab server.")
    .addStringOption((option) =>
      option
        .setName('colab_server_url')
        .setDescription("Your Colab server URL")
        .setRequired(true)
    ),
  async execute(interaction) {
    readJson((data) => {
      	data[interaction.guildId] = interaction.options.getString("colab_server_url");
		writeJson(data)
		interaction.reply("Colab server URL successfully set.");
    });
  },
};
