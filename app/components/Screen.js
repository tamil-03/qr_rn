import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

function Screen({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Screen;
