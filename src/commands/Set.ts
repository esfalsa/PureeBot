import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";
import { sendRegionMessage } from "../utils";
import { Command } from "../Command";
import { getNext, getTargetCount, setConfig } from "../State";

export const Set: Command = {
  name: "set",
  description: "Sets the update (major or minor) to find detags for",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "update",
      description: "The update (major or minor) to find detags for.",
      required: true,
      choices: [
        {
          name: "major",
          value: "Major",
        },
        {
          name: "minor",
          value: "Minor",
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "switchlength",
      description: "The minimum switch length between targets.",
      required: true,
    },
  ],
  run: async (_client: Client, interaction: CommandInteraction) => {
    const update = interaction.options.get("update")?.value as Update;
    const switchLength = interaction.options.get("switchlength")
      ?.value as number;

    setConfig(update, switchLength);

    const targetCount = getTargetCount() ?? 0;

    const content = `Starting run for **${update.toLowerCase()}** update with **${targetCount}** targets and **${switchLength}** seconds between each target.`;

    await interaction.followUp({ content });

    const region = getNext();

    if (!region || !interaction.channel) {
      return;
    }

    sendRegionMessage(region, interaction.channel);
  },
};
