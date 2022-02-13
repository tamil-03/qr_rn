import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Center, Image, Heading, Text } from "native-base";

import config from "../config";

const { title: t, image: i, message: m } = config.app.splash;

function SplashScreen({ title = t, image = i, message = m }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <Center style={styles.container}>
        <Image
          source={image}
          alt="Alternate Text"
          size="xl"
          style={{ borderRadius: 25 }}
        />
        <Heading>{title}</Heading>
        {message && <Text>{message}</Text>}
      </Center>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default SplashScreen;
