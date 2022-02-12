import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Button } from "react-native";

import Screen from "../components/Screen";

import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import useQR from "../hooks/useQR";

const { width } = Dimensions.get("window");

function ScannerScreen({}) {
  const [cameraPermission, setCameraPermission] = useState("");

  const { getData, codeData, code, error, loading } = useQR();

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === "granted");
  };

  const onCodeScanned = async (data) => {
    const name = data.data;
    getData(name);
  };

  useEffect(() => {
    requestCameraPermission();
    return () => {};
  }, []);

  if (!cameraPermission)
    return (
      <>
        <Text>Requesting camera permission...</Text>
        <Button title="Give Permissions" onPress={requestCameraPermission} />
      </>
    );

  return (
    <Screen>
      <View style={styles.container}>
        <Text>QR Name</Text>
        <BarCodeScanner
          onBarCodeScanned={onCodeScanned}
          style={{ width: width, height: width + (1 / 3) * width }}
        />
        <Text>CODE: {code}</Text>
        <Text>Field 1: {codeData.field_1 || ""}</Text>
        <Text>Field 1: {codeData.field_2 || ""}</Text>
        <Text>Field 1: {codeData.field_3 || ""}</Text>
        <Text>Field 1: {codeData.field_4 || ""}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ScannerScreen;
