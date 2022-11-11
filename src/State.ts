let update: Update;
let switchLength: number;
let regions: Region[];
let targets: Region[];
let currentIndex: number;

export function setConfig(updateVal: Update, switchLengthVal: number) {
  update = updateVal;
  switchLength = switchLengthVal;

  targets = regions.reduce<Region[]>(
    (filtered, region) => {
      if (region[update] >= filtered.at(-1)![update] + switchLength) {
        filtered.push({ ...region, detagged: false });
      }
      return filtered;
    },
    [regions[0]]
  );
}

export function hasConfig() {
  return update != null && switchLength != null;
}

export function getConfig() {
  return { update, switchLength, targets };
}

export function setRegions(regionsVal: Region[]) {
  regions = regionsVal;
}

export function getRegions() {
  return regions;
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
