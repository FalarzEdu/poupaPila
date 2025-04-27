import "../public/css/global.css";

import { View } from "react-native";
import React from "react";

import changeThemeStore from "../src/states/ColourTheme";
import FixedScreen from "../src/containers/screen/FixedScreen";
import MainDisplay from "../src/components/balance/MainDisplay";
import { useFonts } from "expo-font";
import SecondaryDisplay from "../src/components/balance/SecondaryDisplay";
import CardDisplay from "../src/components/balance/CardDisplay/CardDisplay";

export default function home() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins Bold.ttf"),
    "Poppins-Semibold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  const { theme } = changeThemeStore();

  return (
    <FixedScreen>
      <View className="mt-8">
        <View className="flex flex-row justify-between content-end">
          <SecondaryDisplay
            text="Inicial"
            value={23.55}
            icon="enter-outline"
            iconSize={14}
            iconColour={theme.colours.primary.fade}
          />
          <MainDisplay
            text="Saldo"
            value={500.86}
            icon="wallet-outline"
            iconSize={18}
            iconColour={theme.colours.primary.fade}
          />
          <SecondaryDisplay
            text="Previsto"
            value={731.41}
            dinamicValueColour={true}
            icon="exit-outline"
            iconSize={14}
            iconColour={theme.colours.primary.fade}
          />
        </View>

        <View className="mt-8 flex flex-row gap-4">
          <View className="flex-1">
            <CardDisplay.WithLink
              text="Entrada"
              iconDirection="right"
              value={6700}
              icon={"arrow-up-circle"}
              iconColour={theme.colours.states.success}
              iconSize={30}
              href="transactions/revenues"
            />
          </View>
          <View className="flex-1">
            <CardDisplay.WithLink
              text="Saída"
              iconDirection="left"
              value={6442.14}
              icon={"arrow-down-circle"}
              iconColour={theme.colours.states.danger}
              iconSize={30}
              href="transactions/expenses"
            />
          </View>
        </View>

        {/* <View className="mt-6">
          <Text className="h4 text-alternative text-center">
            Despesas por categoria
          </Text>
        </View> */}
      </View>
    </FixedScreen>
  );
}
