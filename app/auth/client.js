import config from "../config";
import authStorage from "./storage";
import cache from "../utilities/cache";

const getHeaders = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "Authorization",
    `Bearer ${await authStorage.getAccessToken()}`
  );
  return headers;
};

const call = async (url, options) => {
  return await fetch(url, options);
};

const get = async ({ endpoint }) => {
  const url = `${config.api.apiUrl}${endpoint}`;

  const options = {
    method: "GET",
    headers: await getHeaders(),
    redirect: "follow",
  };

  const result = await call(url, options);
  return await result.json();
};

const post = async ({ endpoint, body }) => {
  // Cache layer
  const cached = await cache.get(endpoint);
  if (cached) {
    console.log("returning from cache");
    return cached;
  }

  const url = `${config.api.apiUrl}${endpoint}`;
  const options = {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify({
      ...body,
      client_id: config.api.client_id,
      unique_id: config.api.unique_id,
    }),
    redirect: "follow",
  };

  const result = await call(url, options);
  const data = await result.json();

  // Cache Layer
  console.log("storing in cache");
  await cache.store(endpoint, data);

  return data;
};

export default client = {
  get,
  post,
};
