import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

import qrApi from "../api/qr_data";
import authStorage from "../auth/storage";
import notifier from "../utilities/notifier";

function ActivationScreen({}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [code, setCode] = useState("");

  const getData = async () => {
    setLoading(true);
    setError(false);

    const [data, e] = await qrApi.getQrData(code);

    if (e) {
    } else {
      notifier.debug(data);
      notifier.toastLong(JSON.stringify(data.data[0]));
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text>QR Name</Text>
      <TextInput
        style={styles.input}
        editable
        maxLength={40}
        value={code}
        onChangeText={setCode}
      />
      <Button title="Get Data" onPress={getData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ActivationScreen;
