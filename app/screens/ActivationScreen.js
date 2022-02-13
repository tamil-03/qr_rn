import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Center, Heading } from "native-base";

import authApi from "../api/auth";
import authStorage from "../auth/storage";
import Screen from "../components/Screen";
import notifier from "../utilities/notifier";
import CodeInput from "./CodeInput";

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
    <Screen>
      <Center style={styles.container}>
        <Heading>Activate Your Device</Heading>
        <CodeInput
          error={error}
          placeholder="Activation Code"
          value={activationCode}
          onChangeText={setActivationCode}
        />
        <Button
          _text={{
            fontSize: "lg",
          }}
          size="lg"
          isLoading={loading}
          isLoadingText="Activating..."
          variant="outline"
          style={{ width: 200 }}
          onPress={activate}
        >
          Activate
        </Button>
      </Center>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ActivationScreen;
