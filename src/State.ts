let update: Update;
let switchLength: number;
let regions: Region[];
let targets: Region[];
let currentIndex: number;
let detagged: Region[] = [];

export function setConfig(updateVal: Update, switchLengthVal: number) {
  update = updateVal;
  switchLength = switchLengthVal;

  let currentProgress = -switchLength;
  targets = regions.filter((region) => {
    if (region[update] >= currentProgress + switchLength) {
      currentProgress = region[update];
      return true;
    } else {
      return false;
    }
  });
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

export function getNext(logPrevious: boolean) {
  if (currentIndex == null) {
    currentIndex = -1;
  } else if (logPrevious) {
    detagged.push(targets[currentIndex]);
  }

  currentIndex++;

  return targets[currentIndex];
}

export function getDetagged() {
  return detagged;
}

export function getAt(progress: number) {
  // const updateName = Update[update] as keyof typeof Update;

  currentIndex = targets.findIndex((region) => region[update] >= progress);

  return targets[currentIndex];
}
