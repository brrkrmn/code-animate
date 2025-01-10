export type Diff = {
  count: number;
  added: boolean;
  removed: boolean;
  value: string;
};

export type Transaction = {
  from: number;
  to?: number;
  insert: string;
};
