import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Box, Input } from "native-base";

function CodeInput({ placeholder, value, onChangeText, error }) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  return (
    <>
      <Box style={styles.container}>
        <Input
          type={show ? "text" : "password"}
          w="75%"
          h="100%"
          maxW="300px"
          py="0"
          size="2xl"
          value={value}
          onChangeText={onChangeText}
          InputRightElement={
            <Button
              size="2xl"
              rounded="none"
              w="1/6"
              h="full"
              onPress={toggleShow}
            >
              {show ? "Hide" : "Show"}
            </Button>
          }
          placeholder={placeholder}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  container: { height: 50, marginVertical: 50 },
  error: { color: "red" },
});

export default CodeInput;
