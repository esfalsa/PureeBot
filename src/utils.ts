import {
  ActionRowBuilder,
  BaseMessageOptions,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
  TextBasedChannel,
} from "discord.js";
import { getNext, getTargetCount, toggleDetagged } from "./State";

export function createRegionResponse(
  region?: Region,
  allowSkip = true
): BaseMessageOptions {
  if (region == null) {
    return {
      content:
        "No more regions found! Use **/report** to list detagged regions.",
    };
  }

  const targetCount = getTargetCount();

  const embed = new EmbedBuilder()
    .setTitle(region.Region)
    .setURL(region.Link)
    .setColor(region.detagged ? "DarkGreen" : "Red")
    .setFields([
      {
        name: "Issues",
        value: region.Issues,
      },
      {
        name: "Major",
        value: region.MajorTimestamp,
        inline: true,
      },
      {
        name: "Minor",
        value: region.MinorTimestamp,
        inline: true,
      },
    ])
    .setFooter({
      text: `Target ${(region.index ?? 0) + 1} of ${targetCount}`,
    });

  const actions = new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setLabel("Open")
      .setStyle(ButtonStyle.Link)
      .setURL(region.Link),
    new ButtonBuilder()
      .setCustomId("mark-hit")
      .setLabel(region.detagged ? "Unmark as hit" : "Mark as hit")
      .setStyle(ButtonStyle.Success),
    ...(allowSkip
      ? [
          new ButtonBuilder()
            .setCustomId("mark-skip")
            .setLabel("Skip")
            .setStyle(ButtonStyle.Danger),
        ]
      : []),
  ]);

  return { embeds: [embed], components: [actions] };
}

export async function sendRegionMessage(
  region: Region | undefined,
  channel: TextBasedChannel
) {
  let nextRegionSent = false;

  const message = await channel.send(createRegionResponse(region));

  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 60000,
    filter: (interaction) => interaction.channel != null,
  });

  collector.on("collect", (interaction) => {
    if (!nextRegionSent) {
      sendRegionMessage(getNext(), interaction.channel!);
      nextRegionSent = true;
    }

    if (interaction.customId === "mark-hit") {
      region = toggleDetagged(region?.Region!);
    }

    interaction.update(createRegionResponse(region, !nextRegionSent));
  });
}
