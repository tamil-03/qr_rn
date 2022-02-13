import React, { useState } from "react";
import { StyleSheet, Dimensions, StatusBar } from "react-native";
import {
  Box,
  Button,
  Center,
  Heading,
  useDisclose,
  Actionsheet,
  Text,
  Image,
  ImageProp,
} from "native-base";
import Screen from "../components/Screen";
import CodeInput from "./CodeInput";
import { BarCodeScanner } from "expo-barcode-scanner";
import InfoDisplay from "../components/InfoDisplay";
import DisplayText from "../components/DisplayText";

const { width, height } = Dimensions.get("window");

function TestScreen(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(false);

  const { isOpen, onClose, onOpen } = useDisclose(true);

  const onCodeScanned = async (data) => {
    setLoading(true);
    const name = data.data;
    onOpen();
    setLoading(false);
  };

  return (
    <Center style={styles.container}>
      <StatusBar hidden />
      <Image
        source={require("../assets/images/test.png")}
        alt="Alternate Text"
        size="xl"
        style={{ borderRadius: 25 }}
      />
      <Heading>QR Reader</Heading>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  dataContainer: { marginTop: 20 },
  data: { marginVertical: 10 },
});

export default TestScreen;
