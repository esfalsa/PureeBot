import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../Command";
import { getConfig, getDetagged } from "../State";

export const Report: Command = {
  name: "report",
  description: "Lists the regions detagged this session",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    const { update, switchLength } = getConfig();

    if (update == null || switchLength == null) {
      await interaction.followUp({ content: "No settings set." });
      return;
    }

    const detagged = getDetagged();
    const content = `Detags: ${detagged.length}\n${detagged
      .map((region) => region.Link)
      .join("\n")}`;

    await interaction.followUp({ content });
  },
};
