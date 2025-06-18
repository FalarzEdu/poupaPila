import React from "react";
import { Stack } from "expo-router";
import changeThemeStore from "../src/states/ColourTheme";
import { Ionicons } from "@expo/vector-icons";

export default function _layout() {
  const { theme } = changeThemeStore();

  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: theme.background.primary },
      headerTintColor: theme.text.colours.normal,
      headerRight: () => (
        <Ionicons
          name="ellipsis-horizontal-outline"
          size={28}
          color={theme.text.colours.normal}
        />
      ),
    }}>

      <Stack.Screen name="index" options={{title: ""}} />

      <Stack.Screen name={"transactions/expenses"} options={{title: ""}} />

      <Stack.Screen name={"transactions/revenues"} options={{title: ""}} />

      <Stack.Screen
        name="transactions/newExpense"
        options={{
          title: "Nova Despesa",
        }}
      />
    </Stack>
  );
}
