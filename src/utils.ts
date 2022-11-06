import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";

export function createRegionResponse(region: Region) {
  if (region == null) {
    return {
      content:
        "No more regions found! Use **/report** to list detagged regions.",
    };
  }

  const embed = new EmbedBuilder()
    .setTitle(region.Region)
    .setURL(region.Link)
    .setFields([
      {
        name: "Issues",
        value: region.Issues,
      },
      {
        name: "Link",
        value: region.Link,
      },
    ]);

  const actions = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel("Open")
      .setStyle(ButtonStyle.Link)
      .setURL(region.Link)
  );

  return { embeds: [embed], components: [actions] };
}
