import { Text, View } from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import Transaction from "@components/transaction/Transaction";
import MonthSlider from "@components/month_slider/MonthSlider";
import { convert } from "@helpers/CurrencyConversion";
import {Link, useFocusEffect} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import changeThemeStore from "@states/ColourTheme";
import TransactionRepository, {Transaction as TransactionType} from "@database/repository/TransactionRepository";
import { getFullMonth } from "@helpers/DateHelper";
import ScrollableFullScreen from "@containers/screen/ScrollableFullScreen";

export default function revenues() {

  const { theme } = changeThemeStore();

  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [transactionsPricesSum, setTransactionsPricesSum] = useState<number>(0);

  const getAllTransactions = async () => {
    setTransactions(await TransactionRepository.getAll(
      selectedMonth.toString().padStart(2, '0'), selectedYear.toString()));

    const repositoryResponse = await TransactionRepository.sumAllPrices(
      "revenue", selectedMonth.toString().padStart(2, '0'), selectedYear.toString())
    setTransactionsPricesSum(repositoryResponse.data.totalPrice);
  }

  const changeSelectedPeriod = (change: 'previous' | 'next') => {
    if (change === 'next') {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
        return
      }
      setSelectedMonth(selectedMonth + 1);
      return;
    }

    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
      return
    }
    setSelectedMonth(selectedMonth - 1);
  }

  useFocusEffect(
    useCallback(() => {
      getAllTransactions();
    }, [selectedMonth])
  );

  return (
    <ScrollableFullScreen>
      <View className="my-4">
        <MonthSlider
          month={ getFullMonth(selectedMonth) }
          previousMonth={() => changeSelectedPeriod("previous")}
          nextMonth={() => changeSelectedPeriod("next")}
        />
      </View>

      <View className="flex flex-row gap-4 justify-center items-center w-full">
        <Text className="text-states-success h3">Receitas </Text>
        <View className="flex flex-row gap-1 items-center justify-center">
          <Text className="h4 text-alternative">R$ </Text>
          <Text className="h3 text-normal">{convert(transactionsPricesSum)} </Text>
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
                value={transaction.price}
                expenseName={transaction.description}
                transactionId={transaction.id}
                date={transaction.date}
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
    </ScrollableFullScreen>
  );
}
