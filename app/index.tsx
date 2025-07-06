import "../public/css/global.css";

import { View } from "react-native";
import React, {useCallback, useEffect, useState} from "react";

import changeThemeStore from "@states/ColourTheme";
import MainDisplay from "@components/balance/MainDisplay";
import { useFonts } from "expo-font";
import SecondaryDisplay from "@components/balance/SecondaryDisplay";
import CardDisplay from "@components/balance/CardDisplay/CardDisplay";
import {Link, Redirect, useFocusEffect} from "expo-router";
import BudgetSection from "@components/budgets/BudgetSection";
import ScrollableFullScreen from "@containers/screen/ScrollableFullScreen";
import GoalSection from "@components/goals/GoalSection";
import CustomDoughnutChart from "@components/DoughnutChart";
import TransactionRepository from "@database/repository/TransactionRepository";

export default function home() {
  const { theme } = changeThemeStore();

  // AUTO REDIRECT FOR TESTS
  return <Redirect href="/transactions/expenses" />;

  const [financeData, setFinanceData] = useState<{
    totalExpenses: number,
    totalRevenues: number,
    lastMonthNetBalance: number,
    thisMonthNetBalance: number,
  }>({
      totalExpenses: 0,
      totalRevenues: 0,
      lastMonthNetBalance: 0,
    thisMonthNetBalance: 0
  })
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins Bold.ttf"),
    "Poppins-Semibold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  const getFinanceData = async () => {
    const result = await TransactionRepository.getAllRevenuesAndExpenses();
    setFinanceData(result.data[0]);
  }
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      getFinanceData();
      setRefreshKey(prev => prev + 1); // Increment to signal refresh
    }, [])
  );

  return (
    <ScrollableFullScreen>
      <View className="mt-8">
        <View className="flex flex-row justify-between content-end">
          <SecondaryDisplay
            text="Inicial"
            value={financeData.lastMonthNetBalance > 0 ? financeData.lastMonthNetBalance : 0}
            icon="enter-outline"
            iconSize={14}
            iconColour={theme.colours.primary.fade}
          />
          <MainDisplay
            text="Saldo"
            value={financeData.thisMonthNetBalance + financeData.lastMonthNetBalance > 0 ? financeData.thisMonthNetBalance : 0}
            icon="wallet-outline"
            iconSize={18}
            iconColour={theme.colours.primary.fade}
          />
          <SecondaryDisplay
            text="Previsto"
            value={(financeData.totalRevenues - financeData.totalExpenses) + financeData.lastMonthNetBalance}
            dynamicValueColour={true}
            icon="exit-outline"
            iconSize={14}
            iconColour={theme.colours.primary.fade}
          />
        </View>

        <View className="mt-8 flex flex-row gap-4">
          <View className="flex-1">
            <CardDisplay.WithLink
              text="Entrada"
              iconDirection="right"
              value={financeData.totalRevenues}
              icon={"arrow-up-circle"}
              iconColour={theme.colours.states.success}
              iconSize={30}
              href="transactions/revenues"
            />
          </View>
          <View className="flex-1">
            <CardDisplay.WithLink
              text="Saída"
              iconDirection="left"
              value={financeData.totalExpenses}
              icon={"arrow-down-circle"}
              iconColour={theme.colours.states.danger}
              iconSize={30}
              href="transactions/expenses"
            />
          </View>
        </View>

      </View>

      <View>
        <CustomDoughnutChart refreshKey={refreshKey} />
      </View>

      <Link href="/budgets/budgets" className="bg-secondary w-full px-4 py-4 mt-12 rounded-xl">
        <BudgetSection refreshKey={refreshKey} />
      </Link>

      <Link href="/goals/goals" className="bg-secondary w-full px-4 py-4 mb-4 mt-12 rounded-xl">
        <GoalSection refreshKey={refreshKey} />
      </Link>

    </ScrollableFullScreen>
  );
}
