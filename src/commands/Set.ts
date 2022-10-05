import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";
import { Command } from "../Command";
import { setConfig } from "../State";

export const Set: Command = {
  name: "set",
  description: "Sets the update (major or minor) to find detags for",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.Integer,
      name: "update",
      description: "The update (major or minor) to find detags for.",
      required: true,
      choices: [
        {
          name: "major",
          value: 0,
        },
        {
          name: "minor",
          value: 1,
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
    setConfig(
      interaction.options.get("update")?.value as number,
      interaction.options.get("switchlength")?.value as number
    );

    const content = `Updated settings.`;

    await interaction.followUp({ content });
  },
};
