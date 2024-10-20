interface Counter {
  name: string;
  count: number;
}

export type Counters = Record<string, Counter>;
