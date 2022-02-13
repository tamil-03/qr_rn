import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar, HStack, IconButton, Icon, Text, Box } from "native-base";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import cache from "../utilities/cache";
import notifier from "../utilities/notifier";

function AppBar(props) {
  return (
    <View style={styles.container}>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="#6200ee" />
      <HStack
        bg="grey"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center">
          {/* <IconButton
            icon={
              <Icon
                size="sm"
                as={MaterialCommunityIcons}
                name="menu"
                color="white"
              />
            }
          /> */}
          <Text color="white" fontSize="20" fontWeight="bold">
            Private QR Reader
          </Text>
        </HStack>
        <HStack>
          <IconButton
            icon={
              <Icon as={FontAwesome} name="qrcode" size="sm" color="white" />
            }
            onPress={() => {
              notifier.toastLong("Not available yet");
            }}
            onLongPress={() => {
              notifier.toastLong("QR list (not available yet)");
            }}
          />
          <IconButton
            icon={
              <Icon
                as={MaterialCommunityIcons}
                name="cached"
                size="sm"
                color="white"
              />
            }
            onPress={() => {
              cache.clearAllCache();
              notifier.toastLong("Cache Cleared");
            }}
            onLongPress={() => {
              notifier.toastLong("Clear Cache");
            }}
          />
        </HStack>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { zIndex: 50 },
});

export default AppBar;
