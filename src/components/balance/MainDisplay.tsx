import { Text, View } from "react-native";
import React from "react";
import Underline from "../underline/Underline";
import { convert } from "../../helpers/CurrencyConversion";
import { Ionicons } from "@expo/vector-icons";

interface mainDisplayProps {
  text: string;
  value: number;
  icon?: any;
  iconColour?: string;
  iconSize?: number;
}

export default function MainDisplay({
  text,
  value,
  icon,
  iconColour,
  iconSize,
}: mainDisplayProps) {
  return (
    <View className="flex self-center">
      <View className="mb-2 flex flex-row justify-center gap-2">
        {icon && (
          <Ionicons
            name={icon ?? "ellipse-outline"}
            size={iconSize ?? 28}
            color={iconColour ?? "#FFFFFF"}
          />
        )}
        <Text className="m-0 text-center font paragraph text-alternative">
          {text}
        </Text>
      </View>

      <View className="flex flex-row justify-center items-center mb-1 pb-0">
        <Text className="m-0 p-0 h4 text-alternative">R$ </Text>
        <Text className="m-0 p-0 h2 h-full text-normal">{convert(value)}</Text>
      </View>

      <Underline />
    </View>
  );
}
