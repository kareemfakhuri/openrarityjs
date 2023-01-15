export type Trait = {
  type: string;
  value: string;
};

export type TokenMetadata = {
  tokenID: string;
  traits: Trait[];
};

export type TokenScore = {
  tokenID: string;
  score: number;
  rank: number;
};
