import config from "../config";
import authStorage from "./storage";

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

  console.log(options.headers.get("Authorization"));

  const result = await call(url, options);
  return await result.json();
};

const post = async ({ endpoint, body }) => {
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
  return await result.json();
};

export default client = {
  get,
  post,
};
