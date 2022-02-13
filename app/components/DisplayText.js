import React from "react";
import { StyleSheet, View } from "react-native";
import { Heading, Text } from "native-base";

function DisplayText({ title, value }) {
  return (
    <>
      <Text fontSize="lg" style={styles.container}>
        <Text bold>{title} : </Text>
        {value}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
});

export default DisplayText;
