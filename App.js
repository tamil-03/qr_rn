import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NativeBaseProvider } from "native-base";

import ActivationScreen from "./app/screens/ActivationScreen";
import ScannerScreen from "./app/screens/ScannerScreen";

import authApi from "./app/api/auth";
import authStorage from "./app/auth/storage";
import TestScreen from "./app/screens/TestScreen";
import SplashScreen from "./app/screens/SplashScreen";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activated, setActivated] = useState(false);

  const initialize = async () => {
    setLoading(true);
    // const access_token = await authStorage.getAccessToken();
    // const refresh_token = await authStorage.getRefreshToken();

    // if (access_token && refresh_token) {
    //   const status = authApi.refreshToken();
    //   setActivated(true);
    //   return setLoading(false);
    // }

    const [data, error] = await authApi.initiate();

    if (error) {
      console.log(error);
      return setLoading(false);
    }

    if (data.message.status !== 1) {
      return setLoading(false);
    }

    await authStorage.storeAccessToken(data.message.access_token);
    await authStorage.storeRefreshToken(data.message.refresh_token);

    setActivated(true);
    setLoading(false);
  };

  useEffect(() => {
    setTimeout(function () {
      initialize();
    }, 1500);
  }, []);

  const testing = false;
  if (testing)
    return (
      <NativeBaseProvider>
        <TestScreen />
      </NativeBaseProvider>
    );

  return (
    <NativeBaseProvider>
      {loading ? (
        <SplashScreen />
      ) : activated ? (
        <ScannerScreen />
      ) : (
        <ActivationScreen activator={[activated, setActivated]} />
      )}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
