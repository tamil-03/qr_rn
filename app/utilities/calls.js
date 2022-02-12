export const resolve = async (promise) => {
  // for sucessful response, return [data, null]
  // for error response, return [null, error]

  try {
    const data = await promise;
    return [data, null];
  } catch (e) {
    return [null, e];
  }
};

export const asyncCall = async (func) => {
  return await resolve(func());
};
