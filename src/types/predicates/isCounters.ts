import { Counters } from "../Counters";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (counters: any): counters is Counters => {
  for (const key in counters) {
    if (Object.prototype.hasOwnProperty.call(counters, key)) {
      const counter = (counters as Counters)[key];
      if (!("name" in counter && "count" in counter)) return false;
    } else {
      return false;
    }
  }
  return true;
};
