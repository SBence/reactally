export interface Counter {
  name: string;
  count: number;
}

export interface Counters {
  [id: string]: Counter;
}
