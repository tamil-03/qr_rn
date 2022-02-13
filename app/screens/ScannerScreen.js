import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Box, Center, Heading, Text, useDisclose } from "native-base";
import LottieView from "lottie-react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";

import Screen from "../components/Screen";

import useQR from "../hooks/useQR";
import PermissionScreen from "./PermissionScreen";
import InfoDisplay from "../components/InfoDisplay";
import DisplayText from "../components/DisplayText";
import config from "../config";
import SplashScreen from "./SplashScreen";

const { width, height } = Dimensions.get("window");

function ScannerScreen({}) {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [scanning, setScanning] = useState(true);

  const { getData, codeData, code, error, loading } = useQR();
  const { isOpen, onClose, onOpen } = useDisclose();

  const onTabClosed = () => {
    setScanning(true);
    onClose();
  };

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(status === "granted" ? true : status);
  };

  const onCodeScanned = async (data) => {
    setScanning(false);
    const name = data.data;
    getData(name);
  };

  useEffect(() => {
    requestCameraPermission();
    return () => {};
  }, []);

  if (cameraPermission === false)
    return <SplashScreen message="Checking Permissions..." />;

  if (cameraPermission !== true)
    return (
      <PermissionScreen
        requestPermission={requestCameraPermission}
        permissionFor="CAMERA"
      />
    );

  return (
    <Screen>
      <BarCodeScanner
        // type={BarCodeScanner.Constants.Type.back}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={scanning ? onCodeScanned : undefined}
        style={styles.camera}
      />
      <>
        <View
          style={{
            ...styles.animation,
            opacity: scanning ? 0.4 : 1,
          }}
        >
          <LottieView
            autoPlay
            loop={scanning}
            onAnimationFinish={scanning ? () => {} : onOpen}
            source={
              scanning ? config.animations.scanning : config.animations.scanned
            }
          />
        </View>
        <Center style={styles.container}>
          <InfoDisplay isOpen={isOpen} onClose={onTabClosed}>
            <Heading size="xl">QR : {code}</Heading>
            <Box style={styles.dataContainer}>
              <DisplayText title="Field 1" value={codeData.field_1 || ""} />
              <DisplayText title="Field 2" value={codeData.field_2 || ""} />
              <DisplayText title="Field 3" value={codeData.field_3 || ""} />
              <DisplayText title="Field 4" value={codeData.field_4 || ""} />
            </Box>
          </InfoDisplay>
        </Center>
      </>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "absolute" },
  dataContainer: { marginTop: 20 },
  // camera: { flex: 1 },
  camera: {
    backgroundColor: "grey",
    flex: 1,
    height: height,
    width: width,
    // position: "absolute",
    // zIndex: -1,
  },
  animation: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 10,
    opacity: 0.4,
  },
});

export default ScannerScreen;
