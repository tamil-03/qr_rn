import React from "react";
import { StyleSheet } from "react-native";
import { Box, Button, Center, Heading } from "native-base";

import Screen from "../components/Screen";

function PermissionScreen({ requestPermission, permissionFor }) {
  return (
    <Screen>
      <Center style={styles.container}>
        <Box style={styles.heading}>
          <Center>
            <Heading>Provide us your</Heading>
            <Heading></Heading>
            <Heading>{permissionFor}</Heading>
            <Heading></Heading>
            <Heading>permission</Heading>
          </Center>
        </Box>
        <Button
          _text={{
            fontSize: "lg",
          }}
          size="lg"
          style={{ width: 200 }}
          onPress={requestPermission}
        >
          Give Permission
        </Button>
      </Center>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heading: { marginVertical: 50 },
});

export default PermissionScreen;
