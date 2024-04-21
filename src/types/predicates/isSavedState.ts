import { SavedState } from "../SavedState";
import isCounters from "./isCounters";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (savedState: any): savedState is SavedState => {
  if (!("accentColor" in savedState && "counters" in savedState)) return false;
  return isCounters((savedState as SavedState).counters);
};
