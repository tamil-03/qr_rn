import { resolve } from "../utilities/calls";
import client from "../auth/client";

const getQrData = async (name) => {
  const call = client.get({
    endpoint: `/resource/QR Code?filters={"name": "${name}"}&fields=["name", "field_1", "field_2", "field_3", "field_4"]`,
  });

  const [data, error] = await resolve(call);
  if (error) {
    console.log("unable to initiate app");
    return [null, error];
  }

  return [data, null];
};

export default qrApi = {
  getQrData,
};
