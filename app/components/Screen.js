import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import AppBar from "./AppBar";

function Screen({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default Screen;
