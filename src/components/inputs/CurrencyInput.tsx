import changeThemeStore from "@states/ColourTheme";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {MaskedTextInput} from "react-native-mask-text";
import {TextTransactionRowProps} from "@components/inputs/TextTransactionRow";

export default function CurrencyInput({ ...props }: TextTransactionRowProps ): React.JSX.Element {
  const { theme } = changeThemeStore();

  return (
    <View className="flex flex-column gap-6 mb-2">
      <View className="flex flex-row items-center gap-4 mt-4 px-8">
        <View>
          <Ionicons name={props.icon} size={26} color={theme.text.colours.alternative} />
        </View>
        <View className="flex-1">
          <MaskedTextInput
            placeholder={props.placeholder}
            placeholderTextColor={theme.text.colours.alternative}
            className="text-alternative text-lg"
            style={{ color: theme.text.colours.alternative, fontSize: 16 }}
            onChangeText={props.onChange}
            type="currency"
            options={{ prefix: "R$ ", decimalSeparator: ",", groupSeparator: ".", precision: 2 }}
          />
        </View>
      </View>

      <View className="h-[1px] w-full bg-neutral-one"></View>

    </View>
  );
}
