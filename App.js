import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import ActivationScreen from "./app/screens/ActivationScreen";
import ScannerScreen from "./app/screens/ScannerScreen";

import authApi from "./app/api/auth";
import authStorage from "./app/auth/storage";

export default function App() {
  const [activated, setActivated] = useState(false);

  const initialize = async () => {
    const [data, error] = await authApi.initiate();

    if (error) {
      console.log(error);
      return;
    }

    if (data.message.status !== 1) {
      return;
    }

    await authStorage.storeAccessToken(data.message.access_token);
    await authStorage.storeRefreshToken(data.message.refresh_token);

    console.log(await authStorage.getAccessToken());
    console.log(await authStorage.getRefreshToken());

    setActivated(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  console.log(activated);

  if (!activated)
    return <ActivationScreen activator={[activated, setActivated]} />;
  return <ScannerScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
