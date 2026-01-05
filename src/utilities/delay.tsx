
export async function delay<T>(promise: Promise<T>, time = 100): Promise<T> {
  const [result] = await Promise.all([
    promise,
    new Promise(resolve => setTimeout(resolve, time))
  ]);
  return result;
}
