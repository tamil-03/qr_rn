import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const prefix = "cache";
const expiryInMinutes = 5;

const store = async (key, value) => {
  try {
    const item = { value, timestamp: Date.now() };
    await AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (ex) {}
};

const get = async (key, isVolatile) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) return null;

    if (isVolatile) return clearCache(key, item);

    return item.value;
  } catch (ex) {}
};

const clearCache = async (key, item) => {
  const now = dayjs();
  const storedTime = dayjs(item.timestamp);
  const isExpired = now.diff(storedTime, "minute") > expiryInMinutes;

  if (isExpired) {
    await AsyncStorage.removeItem(prefix + key);
    return null;
  }
  return null;
};

const clearAllCache = async () => {
  try {
    await AsyncStorage.clear();
  } catch (ex) {}
};
export default { store, get, clearAllCache };
