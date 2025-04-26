import React from "react";
import { Stack } from "expo-router";
import changeThemeStore from "../src/states/ColourTheme";
import { Ionicons } from "@expo/vector-icons";

export default function _layout() {
  const { theme } = changeThemeStore();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.background.primary },
        title: "",
        headerTintColor: theme.text.colours.normal,
        headerRight: () => (
          <Ionicons
            name="ellipsis-horizontal-outline"
            size={28}
            color={theme.text.colours.normal}
          />
        ),
      }}
    ></Stack>
  );
}
