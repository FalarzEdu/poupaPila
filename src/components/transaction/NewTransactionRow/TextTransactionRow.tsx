import {StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import changeThemeStore from "@states/ColourTheme";
import {Ionicons} from "@expo/vector-icons";
import {NewTransactionRowProps} from "@components/transaction/NewTransactionRow/NewTransactionRow";

interface TextTransactionRowProps extends NewTransactionRowProps {
  onChange: (text: string) => void
}

export default function TextTransactionRow({ ...props }: TextTransactionRowProps) {
  const { theme } = changeThemeStore();

  return (
      <View className="flex flex-column gap-6 mb-2">
        <View className="flex flex-row items-center gap-4 mt-4 px-8">
          <View>
            <Ionicons name={props.icon} size={26} color={theme.text.colours.alternative} />
          </View>
          <View>
            <TextInput
              placeholder={props.placeholder}
              placeholderTextColor={theme.text.colours.alternative}
              className="text-alternative text-lg"
              onChangeText={props.onChange}
            />
          </View>
        </View>

      <View className="h-[1px] w-full bg-neutral-one"></View>

    </View>
  );
}

const styles = StyleSheet.create({});
