import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Underline from "../underline/Underline";
import { convert } from "../../helpers/CurrencyConversion";
import { Ionicons } from "@expo/vector-icons";

interface secondaryDisplayProps {
  text: string;
  value: number;
  dinamicValueColour?: boolean;
  icon?: any;
  iconColour?: string;
  iconSize?: number;
}

export default function SecondaryDisplay({
  text,
  value,
  dinamicValueColour,
  icon,
  iconColour,
  iconSize,
}: secondaryDisplayProps) {
  const valueColourChange = () => {
    if (value < 0) {
      return "text-states-danger";
    }
    if (value > 0) {
      return "text-states-success";
    }
    return "text-normal";
  };

  return (
    <View className="flex self-end">
      <View className="mb-2 flex flex-row justify-center gap-2">
        {icon && (
          <Ionicons
            name={icon ?? "ellipse-outline"}
            size={iconSize ?? 28}
            color={iconColour ?? "#FFFFFF"}
          />
        )}
        <Text className="m-0 font small text-alternative">{text}</Text>
      </View>

      <View className="flex flex-row justify-center items-center mb-1 pb-0">
        <Text className="m-0 p-0 paragraph text-alternative">R$ </Text>
        <Text
          className={`m-0 p-0 h3 h-full ${
            dinamicValueColour ? valueColourChange() : "text-normal"
          }`}
        >
          {convert(value)}
        </Text>
      </View>

      <Underline smaller={true} />
    </View>
  );
}

const styles = StyleSheet.create({});
