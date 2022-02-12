import * as SecureStore from "expo-secure-store";

import { resolve } from "../utilities/calls";

const access_key = "access_token";
const refresh_key = "refresh_token";

const storeAccessToken = async (token) => {
  const call = SecureStore.setItemAsync(access_key, token);
  const [data, error] = await resolve(call);
  if (error) console.log("Error stroing access token", error);
};

const getAccessToken = async () => {
  const call = SecureStore.getItemAsync(access_key);
  const [data, error] = await resolve(call);
  if (error) console.log("Error getting access token", error);
  return data;
};

const storeRefreshToken = async (token) => {
  const call = SecureStore.setItemAsync(refresh_key, token);
  const [data, error] = await resolve(call);
  if (error) console.log("Error stroing refresh token", error);
};

const getRefreshToken = async () => {
  const call = await SecureStore.getItemAsync(refresh_key);
  const [data, error] = await resolve(call);
  if (error) console.log("Error getting refresh token", error);
  return data;
};

const logout = async () => {
  const [data1, error1] = await resolve(
    SecureStore.deleteItemAsync(access_key)
  );
  if (error1) console.log("Error deleting access token", error1);

  const [data2, error2] = await resolve(
    SecureStore.deleteItemAsync(refresh_key)
  );
  if (error2) console.log("Error deleting access token", error2);
};

const authStorage = {
  storeAccessToken,
  getAccessToken,
  storeRefreshToken,
  getRefreshToken,
  logout,
};

export default authStorage;
