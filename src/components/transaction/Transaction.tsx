import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import changeThemeStore from "@states/ColourTheme";
import { convert } from "@helpers/CurrencyConversion";
import Label from "@components/label/Label";

interface TransactionProps {
  paid: boolean;
  value: number;
  expenseName: string;
  transactionId: number;
}

export default function Transaction({ ...props }: TransactionProps) {
  const { theme } = changeThemeStore();

  return (
    <View className="flex flex-row items-center gap-6">
      <View>
        {props.paid ? (
          <Ionicons
            name="checkmark-done-outline"
            color={theme.colours.states.success}
            size={28}
          />
        ) : (
          <Ionicons
            name="hourglass-outline"
            color={theme.text.colours.muted}
            size={28}
          />
        )}
      </View>

      <View className="flex flex-1 flex-row gap-1 flex-wrap">
        <Text className="h4 text-normal w-full">{props.expenseName} </Text>
        <View className="">
          <Label transactionId={props.transactionId} />
        </View>
      </View>

      <View>
        <Text className="small text-alternative">28/08/2025 </Text>
        <View className="flex flex-row items-end">
          <Text className="small text-alternative">R$ </Text>
          <Text className="paragraph text-normal">{convert(props.value)} </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
