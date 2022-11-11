type Update = "Major" | "Minor";

type Region = {
  Region: string;
  Issues: string;
  Minor: number;
  MinorTimestamp: string;
  Major: number;
  MajorTimestamp: string;
  NativeEmbassies: boolean;
  Link: string;
  detagged?: boolean;
};
