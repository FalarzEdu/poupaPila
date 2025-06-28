import { StyleSheet, Text, View } from "react-native";
import React from "react";
import transactions from "../../src/mocks/transactions";
import Transaction from "../../src/components/transaction/Transaction";
import MonthSlider from "../../src/components/month_slider/MonthSlider";
import FixedScreen from "../../src/containers/screen/FixedScreen";
import { convert } from "../../src/helpers/CurrencyConversion";
import {Link} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import changeThemeStore from "@states/ColourTheme";

export default function revenues() {

  const { theme } = changeThemeStore();

  return (
    <FixedScreen>
      <View className="my-4">
        <MonthSlider month="Dezembro" />
      </View>

      <View className="flex flex-row gap-4 justify-center items-center w-full">
        <Text className="text-states-success h3">Receitas </Text>
        <View className="flex flex-row gap-1 items-center justify-center">
          <Text className="h4 text-alternative">R$ </Text>
          <Text className="h3 text-normal">{convert(6700)} </Text>
          <Text className="small text-alternative uppercase">Total </Text>
        </View>
      </View>

      <View className="mt-10 flex flex-col gap-6">
        {transactions
          .filter((transactions) => transactions.type != "expense")
          .map((transaction, index) => (
            <React.Fragment key={index}>
              <Transaction
                key={index}
                paid={transaction.paid}
                value={transaction.value}
                expenseName={transaction.description}
                transactionId={transaction.id}
              />
              {index < transactions.length && (
                <View className="h-[1px] w-full bg-neutral-one"></View>
              )}
            </React.Fragment>
          ))}
      </View>

      <Link className="fixed top-0 w-[64px]" href={"/transactions/newRevenue"}>
        <Ionicons
          name="add-circle-outline"
          color={theme.colours.states.success}
          size={64}
          className="w-fit"
        />
      </Link>
    </FixedScreen>
  );
}
