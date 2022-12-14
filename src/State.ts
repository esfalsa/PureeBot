let update: Update;
let switchLength: number;
let targets: Region[];
let currentIndex: number;

export async function setConfig(updateVal: Update, switchLengthVal: number) {
  const regions: Region[] = await fetch(
    "https://esfalsa.github.io/puree/data/detags.json"
  ).then((response) => response.json());

  update = updateVal;
  switchLength = switchLengthVal;

  targets = regions.reduce<Region[]>(
    (filtered, region) => {
      if (region[update] >= filtered.at(-1)![update] + switchLength) {
        filtered.push({
          ...region,
          detagged: false,
          index: filtered.length,
        });
      }
      return filtered;
    },
    [{ ...regions[0], detagged: false, index: 0 }]
  );

  return targets.length;
}

export function hasConfig() {
  return update != null && switchLength != null;
}

export function getConfig() {
  return { update, switchLength, targets };
}

export function getNext() {
  if (!hasConfig()) {
    return undefined;
  }

  if (currentIndex == null) {
    currentIndex = -1;
  }

  currentIndex++;

  return targets[currentIndex];
}

export function getCurrentIndex() {
  if (!hasConfig()) {
    return undefined;
  }

  return currentIndex;
}

export function getTargetCount() {
  if (!hasConfig()) {
    return undefined;
  }

  return targets.length;
}

export function getDetagged() {
  return targets.filter(({ detagged }) => detagged);
}

export function getAt(progress: number) {
  if (!hasConfig()) {
    return undefined;
  }

  currentIndex = targets.findIndex((region) => region[update] >= progress);

  return targets[currentIndex];
}

export function toggleDetagged(regionName: string) {
  let region = targets.find((region) => region.Region === regionName);

  if (region) {
    region.detagged = !region?.detagged;
  }

  return region;
}
