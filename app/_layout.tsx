import React, {useEffect, useLayoutEffect} from "react";
import { Stack } from "expo-router";
import changeThemeStore from "../src/states/ColourTheme";
import { Ionicons } from "@expo/vector-icons";
import DatabaseSeed from "@database/seed/DatabaseSeed";

export default function _layout() {
  const { theme } = changeThemeStore();

  useEffect(() => {
    const initializeApp = async () => {
      console.log("Initializing database...");
      await DatabaseSeed.initializeDatabase(); // Wait for DB setup
    };
    initializeApp();
  }, []);

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

      <Stack.Screen
        name="transactions/newRevenue"
        options={{
          title: "Nova Receita",
        }}
      />

      <Stack.Screen
        name="budgets/budgets"
        options={{
          title: "Budgets",
        }}
      />

    </Stack>
  );
}
