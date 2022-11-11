import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";
import { sendRegionMessage } from "../utils";
import { Command } from "../Command";
import { getAt } from "../State";

export const SkipTo: Command = {
  name: "skipto",
  description: "Go to the first target after the specified time during update",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.Integer,
      name: "progress",
      description: "The number of seconds into update to skip to.",
      required: true,
    },
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    interaction.deleteReply();

    const progress = interaction.options.get("progress")?.value as number;
    const region = getAt(progress);

    if (!region || !interaction.channel) {
      return;
    }

    sendRegionMessage(region, interaction.channel);
  },
};
