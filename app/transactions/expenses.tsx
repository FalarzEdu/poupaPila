import { Text, View } from "react-native";
import React from "react";
import FixedScreen from "@containers/screen/FixedScreen";
import MonthSlider from "@components/month_slider/MonthSlider";
import Transaction from "@components/transaction/Transaction";
import transactions from "@mocks/transactions";
import changeThemeStore from "@states/ColourTheme";
import { convert } from "@helpers/CurrencyConversion";
import {Ionicons} from "@expo/vector-icons";
import {Link} from "expo-router";

export default function expenses() {

  const { theme } = changeThemeStore();

  return (
    <FixedScreen>
      <View className="my-4">
        <MonthSlider month="Dezembro" />
      </View>

      <View className="flex flex-row gap-4 justify-center items-center w-full">
        <Text className="text-states-danger h3">Despesas </Text>
        <View className="flex flex-row gap-1 items-center justify-center">
          <Text className="h4 text-alternative">R$ </Text>
          <Text className="h3 text-normal">{convert(6442.14)} </Text>
          <Text className="small text-alternative uppercase">Total </Text>
        </View>
      </View>

      <View className="mt-10 flex flex-col gap-6">
        {transactions
          .filter((transactions) => transactions.type != "revenue")
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

      <Link className="fixed top-0 w-[64px]" href={"/transactions/newExpense"}>
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
