import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

import authApi from "../api/auth";
import authStorage from "../auth/storage";
import notifier from "../utilities/notifier";

function ActivationScreen({ activator }) {
  const [activated, setActivated] = activator;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activationCode, setActivationCode] = useState("");

  const activate = async () => {
    setLoading(true);
    setError(false);

    const [data, error] = await authApi.activate(activationCode);

    if (error) {
    } else {
      if (data.message.status === 1) {
        authStorage.storeAccessToken(data.message.access_token);
        authStorage.storeRefreshToken(data.message.refresh_token);
        setLoading(false);
        return setActivated(true);
      } else {
        setError(data.message.message);
        notifier.toastLong(data.message.message);
      }
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text>Activation Code</Text>
      <TextInput
        style={styles.input}
        editable
        maxLength={40}
        value={activationCode}
        onChangeText={setActivationCode}
      />
      {error && <Text>{error}</Text>}
      <Button title="Activate" onPress={activate} />
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
