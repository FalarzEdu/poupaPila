import { Text, View } from "react-native";
import React from "react";
import { CardDisplayProps } from "./CardDisplay";
import { convert } from "../../../helpers/CurrencyConversion";
import { Ionicons } from "@expo/vector-icons";

export default function Regular({ ...props }: CardDisplayProps) {
  return (
    <View className="bg-secondary p-4 rounded-xl flex flex-row justify-between w-full">
      {props.icon && props.iconDirection == "right" && (
        <View className="w-fit flex items-center justify-center">
          <Ionicons
            name={props.icon}
            color={props.iconColour}
            size={props.iconSize}
          />
        </View>
      )}

      <View className="w-fit flex flex-col gap-2">
        <View className="">
          <Text
            className={`paragraph text-muted ${
              props.iconDirection === "right" ? "text-right" : "text-left"
            }`}
          >
            {props.text}
          </Text>
        </View>
        <View>
          <Text className="h4 text-normal">R$ {convert(props.value)}</Text>
        </View>
      </View>

      {props.icon && props.iconDirection == "left" && (
        <View className="w-fit flex items-center justify-center">
          <Ionicons
            name={props.icon}
            color={props.iconColour}
            size={props.iconSize}
          />
        </View>
      )}
    </View>
  );
}
