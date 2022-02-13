import client from "../auth/client";
import authStorage from "../auth/storage";
import { resolve } from "../utilities/calls";

const refreshToken = async (refresh_token) => {
  const call = client.post({
    endpoint: "/method/frappe.integrations.oauth2.get_token",
    body: {
      grant_type: "refresh_token",
      refresh_token: await authStorage.getRefreshToken(),
    },
  });

  const [data, error] = await resolve(call);

  console.log(data);

  if (error) {
    console.log("token refresh failed :" + e);
    await authStorage.storeAccessToken("");
    await authStorage.storeRefreshToken("");
    return false;
  }

  await authStorage.storeAccessToken("");
  await authStorage.storeRefreshToken("");
  // console.log("refreshed access token : " + data.message.access_token);
  return true;
};

const activate = async (activation_code) => {
  const call = client.post({
    endpoint: "/method/qr_data.api.auth",
    body: { activation_code },
  });

  const [data, error] = await resolve(call);
  if (error) {
    console.log("unable to initiate app");
    return [null, error];
  }

  return [data, null];
};

const initiate = async () => {
  const call = client.post({ endpoint: "/method/qr_data.api.initiate" });
  const [data, error] = await resolve(call);
  if (error) {
    console.log("unable to initiate app", error);
    return [null, error];
  }
  return [data, null];
};

export default authApi = {
  activate,
  initiate,
  refreshToken,
};

/*
var myHeaders = new Headers();
myHeaders.append("Authorization", "token 70b27f33a448750:236e19575743d2c");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

var raw = JSON.stringify({
  "unique_id": "323",
  "client_id": "5a0e1a42bf"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://portal.binarywires.com/api/method/qr_data.api.initiate", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
*/

/*
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer b0d6a2781eabe26ade321809808606");
myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://portal.binarywires.com/api/resource/QR Code?filters={\"name\": \"CODE-00003\"}&fields=[\"name\", \"field_1\", \"field_2\"]", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
*/
