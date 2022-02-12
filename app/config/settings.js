import Constants from "expo-constants";
import { getUniqueId } from "react-native-device-info";

const settings = {
  dev: {
    apiUrl: "https://portal.binarywires.com/api",
    baseAssetUrl: "https://portal.binarywires.com/",
    client_id: "5a0e1a42bf",
    imageUploadQuality: 0.2,
  },
  staging: {
    apiUrl: "https://portal.binarywires.com/api",
    baseAssetUrl: "https://portal.binarywires.com/",
    client_id: "5a0e1a42bf",
    imageUploadQuality: 0.2,
  },
  prod: {
    apiUrl: "https://portal.binarywires.com/api",
    baseAssetUrl: "https://portal.binarywires.com/",
    client_id: "5a0e1a42bf",
    imageUploadQuality: 0.2,
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default api = {
  ...getCurrentSettings(),
  unique_id: getUniqueId(),
};
