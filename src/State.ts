enum Update {
  Major = 0,
  Minor,
}

// type Update = "Major" | "Minor";

type Region = {
  Region: string;
  Issues: string;
  Minor: number;
  MinorTimestamp: string;
  Major: number;
  MajorTimestamp: string;
  NativeEmbassies: boolean;
  Link: string;
};

let update: Update;
let switchLength: number;
let regions: Region[];
let targets: Region[];
let currentIndex: number;
let detagged: Region[] = [];

export function setConfig(updateVal: Update, switchLengthVal: number) {
  update = updateVal;
  switchLength = switchLengthVal;

  const updateName = Update[update] as keyof typeof Update;

  let currentProgress = -switchLength;
  targets = regions.filter((region) => {
    if (region[updateName] >= currentProgress + switchLength) {
      currentProgress = region[updateName];
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
  const updateName = Update[update] as keyof typeof Update;

  currentIndex = targets.findIndex((region) => region[updateName] >= progress);

  return targets[currentIndex];
}
