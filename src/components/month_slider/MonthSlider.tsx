import { Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import changeThemeStore from "../../states/ColourTheme";
import Underline from "../underline/Underline";

interface MonthSliderProps {
  month: string;
}

export default function MonthSlider({ month }: MonthSliderProps) {
  const { theme } = changeThemeStore();

  return (
    <View className="flex flex-row justify-center items-center gap-8">
      <View>
        <Ionicons
          name="chevron-back"
          size={22}
          color={theme.text.colours.normal}
        />
      </View>

      <View>
        <Text className="h3 text-normal">{month} </Text>
        <Underline />
      </View>

      <View>
        <Ionicons
          name="chevron-forward"
          size={22}
          color={theme.text.colours.normal}
        />
      </View>
    </View>
  );
}
