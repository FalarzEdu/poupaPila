import {StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import changeThemeStore from "@states/ColourTheme";
import {Ionicons} from "@expo/vector-icons";
import {NewTransactionRowProps} from "@components/transaction/NewTransactionRow/NewTransactionRow";

interface SelectTransactionRowProps extends NewTransactionRowProps{
  placeholder: string
  icon: any
}

export default function SelectTransactionRow({ ...props }: SelectTransactionRowProps) {
  const { theme } = changeThemeStore();

  return (
    <View className="flex flex-col gap-6 mb-2">
      <View className="flex flex-row gap-4 mt-7 mb-3 items-center justify-between px-8">
        <View className="flex flex-row gap-4">
          <View>
            <Ionicons name={props.icon} size={26} color={theme.text.colours.alternative} />
          </View>
          <View>
            <Text className="text-alternative text-lg">{props.placeholder}</Text>
          </View>
        </View>

        <View className="flex">
          <Ionicons name={"chevron-down-outline"} size={26} color={theme.text.colours.alternative} />
        </View>
      </View>

      <View className="h-[1px] w-full bg-neutral-one"></View>

    </View>
  );
}

const styles = StyleSheet.create({});
