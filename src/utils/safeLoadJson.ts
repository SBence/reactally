export default <T>(
  json: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  checkFunction: (object: any) => object is T,
) => {
  if (!json) return;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const maybeSavedState = JSON.parse(json);
  if (checkFunction(maybeSavedState)) return maybeSavedState;
};
