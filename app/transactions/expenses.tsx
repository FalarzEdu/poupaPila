import { Text, View } from "react-native";
import React from "react";
import FixedScreen from "../../src/containers/screen/FixedScreen";
import MonthSlider from "../../src/components/month_slider/MonthSlider";
import Transaction from "../../src/components/transaction/Transaction";
import transactions from "../../src/mocks/transactions";

export default function expenses() {
  return (
    <View>
      <FixedScreen>
        <View className="my-4">
          <MonthSlider month="Dezembro" />
        </View>

        <View className="flex flex-row gap-4 justify-center items-center w-full">
          <Text className="text-states-danger h3">Despesas </Text>
          <View className="flex flex-row gap-1 items-center justify-center">
            <Text className="h4 text-alternative">R$ </Text>
            <Text className="h3 text-normal">6.442,14 </Text>
            <Text className="small text-alternative uppercase">Total </Text>
          </View>
        </View>

        <View className="mt-10 flex flex-col gap-6">
          {transactions.map((transaction, index) => (
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
      </FixedScreen>
    </View>
  );
}
