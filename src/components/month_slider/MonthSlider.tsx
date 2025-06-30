import {Pressable, Text, View} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import changeThemeStore from "../../states/ColourTheme";
import Underline from "../underline/Underline";

interface MonthSliderProps {
  month: string;
  previousMonth: () => void;
  nextMonth: () => void;
}

export default function MonthSlider({ month, previousMonth, nextMonth }: MonthSliderProps) {
  const { theme } = changeThemeStore();

  return (
    <View className="flex flex-row justify-center items-center gap-8">
      <Pressable onPress={previousMonth}>
        <Ionicons
          name="chevron-back"
          size={22}
          color={theme.text.colours.normal}
        />
      </Pressable>

      <View>
        <Text className="h3 text-normal">{month} </Text>
        <Underline />
      </View>

      <Pressable onPress={nextMonth}>
        <Ionicons
          name="chevron-forward"
          size={22}
          color={theme.text.colours.normal}
        />
      </Pressable>
    </View>
  );
}
