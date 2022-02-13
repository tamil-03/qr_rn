import React from "react";
import { StyleSheet, View } from "react-native";
import { Actionsheet, Heading, Text } from "native-base";

function InfoDisplay({ isOpen, onClose, children }) {
  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={onClose}
      disableOverlay
      style={styles.container}
    >
      <Actionsheet.Content style={styles.content}>
        {children}
      </Actionsheet.Content>
    </Actionsheet>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: { paddingBottom: 50 },
});

export default InfoDisplay;
