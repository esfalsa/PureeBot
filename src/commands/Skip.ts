import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import { createRegionResponse } from "../utils";
import { Command } from "../Command";
import { getConfig, getNext } from "../State";

export const Skip: Command = {
  name: "skip",
  description:
    "Gets the next target without marking the previous one as detagged",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: Client, interaction: CommandInteraction) => {
    const { update, switchLength } = getConfig();

    if (update == null || switchLength == null) {
      await interaction.followUp({ content: "No settings set." });
      return;
    }

    const region = getNext(false);

    await interaction.followUp(createRegionResponse(region));
  },
};
