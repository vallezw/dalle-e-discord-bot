const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  MessageAttachment,
} = require("discord.js");
const axios = require("axios");
const jsonUtils = require("../utils/jsonUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generate_image")
    .setDescription("Generate an image via description")
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Description of the image")
        .setRequired(true)
    ),
  async execute(interaction) {
    jsonUtils.readJson((data) => {
      const serverUrl = data[interaction.guildId];
      if (serverUrl == undefined)
        return interaction.reply(
          "Set colab server URL first with /set_colab_server"
        );
      interaction.reply("Sending request (this could take a while)...");

      axios
        .post(serverUrl + "/dalle", { text: "test", num_images: 1 })
        .then((res) => {
          const str = res.data;
          const sfbuff = new Buffer.from(str, "base64");
          console.log(sfbuff);
          const sfattach = new MessageAttachment(sfbuff, "output.png");
          interaction.channel.send(sfattach);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
};
